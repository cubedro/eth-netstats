var router = require('express.io')();

/* GET stats listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

module.exports = router;
