const express = require('express');
const app = express();
const fs = require('fs');

const { Translate } = require('@google-cloud/translate').v2;
const client = new Translate();

const Knex = require('knex');
const { resolve } = require('path');
const { rejects } = require('assert');
const connect = () => {
  const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    socketPath: process.env.DB_SOCKET,
  };

  return Knex({
    client: 'mysql',
    version: '5.7',
    connection: config,
  });
};
const knex = connect();

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`API listening on port ${port}.`);
});

async function getFileText(path) {
  return await new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}

app.get('/', async (req, res) => {
  const text = await getFileText('index.html');
  res.send(text);
});

app.get('/hello', async (req, res) => {
  const name = req.query.name;
  const result = `こんにちは、 ${name} さん！ ようこそ！ \n\n`;
  res.send(result);
});

app.get('/translate/:lang', async (req, res) => {
  const result = await client.translate('Hello, world!', req.params.lang);
  res.send(`${result[0]}\n\n`);
});

app.get('/todos/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todo = await getTodo(id);
  res.json({ status: 'ok', data: { todo } });
});

async function getTodo(id) {
  return await knex.select('*').from('todos').where('todos_id', id);
}
