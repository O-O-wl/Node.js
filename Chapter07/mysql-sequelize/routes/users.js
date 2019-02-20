var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  res.send(`id = ${id} `);

});
/* GET users listing. */
router.get('/:id/:num', function(req, res, next) {
  const id = req.params.id;
  const num = req.params.num;
  res.send(`id = ${id} num = ${num}`);
});

module.exports = router;
