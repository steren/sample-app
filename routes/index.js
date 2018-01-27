const express = require('express');
const router = express.Router();
const Datastore = require('@google-cloud/datastore');
const datastore = new Datastore();

/* GET home page. */
router.get('/', (req, res, next) => {
  const query = datastore
    .createQuery('Message')
    .order('date', {
      descending: true,
    });
  datastore.runQuery(query).then(results => {
    res.render('index', { title: 'Demo', messages: results[0] });
  });
});

module.exports = router;
