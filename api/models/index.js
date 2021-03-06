const dotenv = require('dotenv');
const { Client } = require('../config/index');
const { tables } = require('./tableQueries');
// const app = require('../index');
// const Client = app.Client;
dotenv.config()
Client.connect()
    .then(() => {
        console.log('Database connected');
    });

export const createTables = () => {
    Client.query(tables)
        .then((res) => {
            Client.end();
        }).catch((err) => {
            console.log(err);
        });
}

//Delete created tables
export const tearDown = () => {
    const deleteQuery = 'DROP TABLE IF EXISTS users, articles, comments, flags,gifs CASCADE';
    Client.query(deleteQuery)
        .then(() => {
            Client.end();
        })
}

require('make-runnable');