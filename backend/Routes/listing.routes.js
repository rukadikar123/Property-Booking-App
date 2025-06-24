import {Router} from 'express'
import { addProperty, getProperty, getpropertyList } from '../Controllers/listing.controller.js'
import { isAuthenticated } from '../Middlewares/auth.middleware.js'
import { upload } from '../Middlewares/multer.js'

const router=Router()

router.get('/listing',isAuthenticated , getpropertyList)
router.post('/listing/add',isAuthenticated,upload.array("images",6), addProperty)
router.get('/listing/:id',isAuthenticated , getProperty)



export default router