import {Router} from 'express'
import { addRating, getReviews, pendingRatings } from '../Controllers/rating.controller.js'
import { isAuthenticated } from '../Middlewares/auth.middleware.js'

const router=Router()


router.get('/isPending',isAuthenticated, pendingRatings)  // Route to check if the logged-in user has any pending ratings to submit
router.post('/add',isAuthenticated, addRating)      // Route to add a new rating for a property (requires authentication)
router.get('/reviews/:id',isAuthenticated, getReviews)  // Route to get all reviews for a specific property by its ID (requires authentication)




export default router