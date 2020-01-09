import Responder from '../helpers/responder';
import { Client } from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const responder = new Responder();

const client = new Client({ connectionString: process.env.DATABASE_URL });
client.connect();

class commentController {
    static async comment(req, res) {
        try {
            const articleId = parseInt(req.params.id);
            const { id } = req.user.rows[0];
            const { comment } = req.body;
            const article = await client.query('SELECT * FROM articles WHERE article_id=$1', [articleId]);
            if (article.rows.length < 1) responder.responseNotFound(res, 'Article not found');
            const comments = await client.query('INSERT INTO comments(article_id, author_id, comment) VALUES($1,$2,$3) returning *', [articleId, id, comment])
            if (comments) {
                const data = {};
                data.articleTitle = article.rows[0].title;
                data.article = article.rows[0].article;
                data.comment = comments.rows[0].comment;

                responder.responseCreated(res, 'Successfully comment', data)
            }
            // return res.json({ articleId, id, comment });
        } catch (err) {
            err => responder.responseServerError(res, err)
        }

    }
}

export default commentController;
