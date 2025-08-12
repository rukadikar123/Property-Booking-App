import {Router} from 'express'
import { addRating, getReviews, pendingRatings } from '../Controllers/rating.controller.js'
import { isAuthenticated } from '../Middlewares/auth.middleware.js'

const router=Router()


router.get('/isPending',isAuthenticated, pendingRatings)
router.post('/add',isAuthenticated, addRating)
router.get('/reviews/:id',isAuthenticated, getReviews)




export default router