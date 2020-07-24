const express = require('express');
const app = express();

const { Translate } = require('@google-cloud/translate').v2;
const client = new Translate();

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`API listening on port ${port}.`);
});

app.get('/hello', async (req, res) => {
  const name = req.query.name;
  const result = `Hello ${name}!\n\n`;
  res.send(result);
});

app.get('/translate/:lang', async (req, res) => {
  const result = await client.translate('Hello, world!', req.params.lang);
  res.send(`${result[0]}\n\n`);
});
