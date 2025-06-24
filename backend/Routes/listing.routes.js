import {Router} from 'express'
import { getProperty, getpropertyList } from '../Controllers/listing.controller.js'
import { isAuthenticated } from '../Middlewares/auth.middleware.js'

const router=Router()

router.get('/listing',isAuthenticated , getpropertyList)
router.get('/listing/:id',isAuthenticated , getProperty)



export default router