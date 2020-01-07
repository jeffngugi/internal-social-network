import { Client } from 'pg';
const dotenv = require('dotenv');
dotenv.config();
import Responder from '../helpers/responder';
import authController from './authController';
const cloudinary = require('cloudinary').v2;
const responder = new Responder();

const client = new Client({ connectionString: process.env.DATABASE_URL });
client.connect();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})


class gifController {
    static async postGif(req, res) {
        const { id } = req.user.rows[0];
        const { title } = req.body;
        // return res.json(title);
        const uniqueFilename = new Date().toISOString();
        if (!req.files) { responder.responseNotFound(res, 'No selected image') }
        const file = req.files.image;
        await cloudinary.uploader.upload(file.tempFilePath)
            .then(image => {
                client.query('INSERT INTO gifs(created_on, gif_url, author_id, public_id, title)VALUES($1,$2,$3,$4, $5)', [uniqueFilename, image.url, id, image.public_id, title])
                    .then(responder.responseCreated(res, 'Gif succesfully uploaded'));
            })
            .catch(err => responder.responseServerError(res, err))
    }

    static async getAll(req, res) {
        await client.query('SELECT * FROM gifs')
            .then(gifs => {
                if (gifs.rows.length > 0) responder.responseSuccess(res, `${gifs.rows.length} gifs found`, gifs.rows)
                else responder.responseSuccess(res, 'No gifs was found', gifs.rows)
            })
    }

    static async getSingle(req, res) {
        return res.json({ single: 'Select single by id' });
    }

    static async getByUsers(req, res) {
        return res.json({ msg: 'Get all gifs from certain user' })
    }

    static async deleteGif(req, res) {
        const { id } = req.user.rows[0];
        try {
            const gif = await client.query('SELECT * FROM gifs WHERE gif_id=$1', [parseInt(req.params.id)]);
            if (gif.rows.length < 1) { responder.responseNotFound(res, 'No gif with that id') }
            const { author_id, public_id } = gif.rows[0];
            if (author_id !== id) responder.responseUnauthorized(res);
            await cloudinary.uploader.destroy(public_id)
                .then(result => {
                    if (result.result === 'not found') return res.json('Not found in database')
                    else {
                        client.query('DELETE FROM gifs WHERE gif_id=$1', [parseInt(req.params.id)])
                            .then(del => responder.responseDeleted(res))
                            .catch(err => responder.responseServerError(res, err))
                    }

                })
                .catch(err => console.log({ err }))
        } catch (error) {
            responder.responseServerError(res, error)
        }
    }
}

export default gifController