import {Router} from 'express'
import { pendingRatings } from '../Controllers/rating.controller.js'
import { isAuthenticated } from '../Middlewares/auth.middleware.js'

const router=Router()


router.get('/isPending',isAuthenticated, pendingRatings)




export default router