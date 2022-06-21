const router = require('express').Router();
const { userController } = require('../controller');

router.get('/get', userController.getUsers);
router.get('/get/:id', userController.getUserById);
router.post('/post', userController.createUser);
router.put('/put/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;
