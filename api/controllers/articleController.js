import { Client } from 'pg';
import dotenv from 'dotenv';
dotenv.config();
import Responder from '../helpers/responder';
import { async } from '../../../../../Users/jeff/AppData/Local/Microsoft/TypeScript/3.6/node_modules/rxjs/internal/scheduler/async';
const responder = new Responder();


const client = new Client({ connectionString: process.env.DATABASE_URL });
client.connect();


class articleController {
    static async create(req, res) {
        try {
            const { id, first_name, last_name } = req.user.rows[0];
            const userName = first_name + ' ' + last_name;
            const { title, article } = req.body;
            const date = new Date().toISOString();
            await client.query('INSERT INTO articles(created_on, title,author_id, author_name,article)VALUES($1,$2,$3,$4,$5)', [date, title, id, userName, article])
                .then(article => responder.responseSuccess(res, 'article successfully created', article.rows))
                .catch(err => responder.responseNotFound(res, err))
        } catch (err) {
            responder.responseServerError(res, err)
        }
    }

    static async getArticles(req, res) {
        try {
            await client.query('SELECT * FROM articles ORDER BY article_id DESC')
                .then(articles => responder.responseSuccess(res, `${articles.rows.length} articles on the feed`, articles.rows))
                .catch(err => responder.responseServerError(res, err))
        } catch (err) {
            responder.responseServerError(err)
        }
    }

    static async editArticle(req, res) {
        try {
            const userId = req.user.rows[0].id;
            const articleId = parseInt(req.params.id);
            const { title, article } = req.body;
            const articles = await singleArticle(articleId);
            if (articles.rows.length < 1) responder.responseNotFound(res, 'Article not found');
            const { author_id } = articles.rows[0];
            if (author_id !== userId) responder.responseUnauthorized(res);
            const update = await client.query('UPDATE articles SET title=$1, article=$2 WHERE article_id=$3', [title, article, articleId])
            if (update) {
                await singleArticle(articleId)
                    .then(article => responder.responseSuccess(res, 'Article succesfully updated', article.rows[0]))
            }
        } catch (err) {
            responder.responseServerError(res, { err })
        }
    }

    static async getSingle(req, res) {
        try {
            const articleId = parseInt(req.params.id);
            const article = await singleArticle(articleId)
            if (article.rows.length < 1) responder.responseNotFound(res, 'Sorry, Article not found');
            const data = article.rows[0];
            delete data.author_id;
            const comments = await client.query('SELECT * FROM comments WHERE article_id=$1', [articleId]);
            // const newcomments = comments.map(cmnt => {
            //     comment_id = cmnt.comment_id,
            //         author_id = cmnt.author_id,
            //         comment = cmnt.comment
            // })
            data.comments = comments.rows;
            responder.responseSuccess(res, 'Article found', data);
        } catch (err) {
            err => responder.responseServerError(res, err)
        }
    }

    static async deleteArtlce(req, res) {

        try {
            const userId = req.user.rows[0].id;
            const articleId = parseInt(req.params.id);
            const article = await singleArticle(articleId);
            if (article.rows.length < 1) responder.responseNotFound(res, 'Sorry, Article not found');
            const { author_id } = article.rows[0];
            if (userId !== author_id) responder.responseUnauthorized(res);
            await client.query('DELETE from articles where article_id=$1', [articleId])
                .then(del => {
                    if (del) responder.responseDeleted(res);
                })
                .catch(err => responder.responseNotFound(res, 'Something went wrong'))
            return res.json({ userId, articleId, author_id });
        } catch (err) {
            responder.responseServerError(res, err)
        }

    }
}


const singleArticle = (articleId) => {
    const articles = client.query('SELECT * FROM articles WHERE article_id=$1', [articleId]);
    return articles;
}

export default articleController;