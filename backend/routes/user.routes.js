import express from 'express'
import { addBalance, getMe, Login, Logout, SignUp } from '../controlers/auth.controler.js'
import { protectRoute } from '../middleware/protectRoute.js'

const router = express.Router()

router.post('/signup', SignUp)
router.post('/login', Login)
router.post('/logout', Logout)
router.post('/add-balance', protectRoute, addBalance)
router.get('/profile',protectRoute, getMe)


export default router