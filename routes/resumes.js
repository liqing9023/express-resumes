var express = require('express');
var controller = require('../controllers/resume');

//https://github.com/strongloop/express/issues/2281
var router = express.Router({strict: true});

router.get('/', controller.index);
router.get('/:department/', controller.findByDepartment);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
