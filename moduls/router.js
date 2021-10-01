const Router = require('express');
const router = new Router();
const routerController = require('./routerController')

router.get('/users', routerController.getUsers); //
router.get('/user/:id/avatar', routerController.getAvatar);
router.get('/user/:id', routerController.reviewProfile); //
router.post('/register', routerController.registration); //
router.post('/login', routerController.authorization);
router.post('/user/:id/avatar', routerController.postAvatar);
router.put('/user/:id', routerController.changeProfile); //
router.delete('/user/:id', routerController.deleteProfile); //
router.all('*', routerController.page404);

module.exports = router;