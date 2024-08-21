import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js'
import upload from '../config/multer.config.js'
import { addFavorite, buyItem, getAllItems, getFavorites, removeFavorite, Sell } from '../controlers/item.controler.js'

const router = express.Router()

router.post('/addItem',upload.single('image'), protectRoute, Sell)
router.post('/buy', protectRoute, buyItem)
router.get('/store',protectRoute, getAllItems )
router.post('/fav/add', protectRoute, addFavorite)
router.post('/fav/remove', protectRoute, removeFavorite)
router.get('/fav' , protectRoute, getFavorites)

export default router