const express = require('express');
const router = express.Router();

const configs = require('../util/config')
const { get } = require('../redis')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

/* GET usage statistics. */
router.get('/statistics', async (_, res) => {
  const added = Number(await get('added_todos')) || 0

  res.send({
    added_todos: added
  });
});

module.exports = router;
