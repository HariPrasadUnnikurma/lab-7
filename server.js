// server.js
const express = require('express');
const logger = require('morgan');
const path = require('path');

const app = express();

// parse form and JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));

// serve static files
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// small helper: trim + escape basic tags
const clean = (s) => {
  const t = (s || '').toString().trim();
  return t.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

// test route
app.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// POST handler for the form at /ITC505/lab-7/
app.post('/ITC505/lab-7/', (req, res) => {
  const { pluralNoun, adjective, verb, noun, conjunction } = req.body || {};

  const p = clean(pluralNoun);
  const a = clean(adjective);
  const v = clean(verb);
  const n = clean(noun);
  const c = clean(conjunction);

  if (!p || !a || !v || !n || !c) {
    res.status(400).send(`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8"/>
          <title>Submission Failed</title>
          <meta name="viewport" content="width=device-width,initial-scale=1">
          <link rel="stylesheet" href="/ITC505/lab-7/styles.css">
        </head>
        <body>
          <main>
            <h1>Submission Failed</h1>
            <p>Please fill out ALL fields.</p>
            <a href="/ITC505/lab-7/">Go Back to Form</a>
          </main>
          <footer>
            <p>Last updated: <span id="lastModified"></span></p>
          </footer>
          <script>document.getElementById('lastModified').textContent = document.lastModified;</script>
        </body>
      </html>
    `);
    return;
  }

  const madLibOne = `Once upon a time, there were many ${p} that were very ${a}.`;
  const madLibTwo = `They loved to ${v} every day. One day, they found a ${n} ${c} decided to keep it as their treasure.`;
  const madLib = `${madLibOne} ${madLibTwo}`;

  res.send(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8"/>
        <title>Mad Lib Result</title>
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <link rel="stylesheet" href="/ITC505/lab-7/styles.css">
      </head>
      <body>
        <main>
          <h1>Submission Successful</h1>
          <p>${madLib}</p>
          <a href="/ITC505/lab-7/">Go Back to Form</a>
        </main>
        <footer>
          <p>Last updated: <span id="lastModified"></span></p>
        </footer>
        <script>document.getElementById('lastModified').textContent = document.lastModified;</script>
      </body>
    </html>
  `);
});

// listen on render's port (or 8080 locally)
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
