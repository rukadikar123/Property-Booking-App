import {Router} from 'express'
import { addRating, pendingRatings } from '../Controllers/rating.controller.js'
import { isAuthenticated } from '../Middlewares/auth.middleware.js'

const router=Router()


router.get('/isPending',isAuthenticated, pendingRatings)
router.post('/add',isAuthenticated, addRating)




export default router