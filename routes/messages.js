const express = require('express');
const router = express.Router();
const Datastore = require('@google-cloud/datastore');
const datastore = new Datastore();

/* create a new message */
router.post('/', (req, res) => {
  if(!req.body.text) {
    return res.status(400).send('Please provide a message.');
  }

  const taskKey = datastore.key('Message');
  const message = {
    key: taskKey,
    data: {
      date: new Date(),
      text: req.body.text,
    },
  };

  // Saves the entity
  datastore
    .save(message)
    .then(() => {
      console.log(`Saved ${message.key.name}: ${message.data.text}`);
      return res.redirect('/');
    })
    .catch(err => {
      console.error('ERROR:', err);
      return res.status(500).send(err);
    });
});

module.exports = router;
