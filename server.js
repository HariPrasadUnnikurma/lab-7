// server.js
const express = require('express');
const logger = require('morgan');
const path = require('path');

const app = express();

// parse JSON bodies (for fetch requests sending JSON)
app.use(express.json());
// parse urlencoded bodies (in case you later use a plain form POST)
app.use(express.urlencoded({ extended: true }));

app.use(logger('dev'));

// Example random route (optional)
app.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// POST handler that matches your client-side fetch URL '/madlib'
app.post('/madlib', (req, res) => {
  // destructure fields exactly as your client sends them
  const { pluralNoun, adjective, verb, noun, conjunction } = req.body || {};

  // Basic validation
  if (!pluralNoun || !adjective || !verb || !noun || !conjunction) {
    res.status(400).send('Error: please fill out all fields.');
    return;
  }

  // Build the mad lib — plain text (your client expects text)
  const story = `Once upon a time, there were many ${pluralNoun} that were very ${adjective}. They loved to ${verb} every day. One day, they found a ${noun} ${conjunction} decided to keep it as their treasure.`;

  // Return text (not HTML) so your front-end can put it in #result
  res.type('text').send(story);
});

// Serve static files from public/
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// port selection: run `node server.js local` to use 8080 for local dev
let port = 80;
if (process.argv[2] === 'local') port = 8080;

app.listen(port, () => console.log(`Ready on http://localhost:${port}`));


server.post('/submit', (req, res) => {
    const { noun, verb } = req.body;
    if (!noun || !verb ) {
        res.send(`
          <h1>Submission Failed</h1>
          <p>Please fill out ALL fields</p>
          <a href="/">Go Back to Form</a>
        `);
        return;
    }
    const madLibOne = `Hello, ${noun} ... ;
    const madLibTwo = `My favorite activity is to ${verb} ... ;
    const madLib = `${madLibOne}\n${madLibTwo}`;
    res.send(`
      <h1>Submission Successful</h1>
      <p>${madLib}</p>
      <a href="/">Go Back to Form</a>
    `);
});