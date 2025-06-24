import {Router} from 'express'
import { addProperty, getProperty, getpropertyList } from '../Controllers/listing.controller.js'
import { isAuthenticated } from '../Middlewares/auth.middleware.js'
import { upload } from '../Middlewares/multer.js'

const router=Router()

router.get('/',isAuthenticated , getpropertyList)
router.post('/add',isAuthenticated,upload.array("images",6), addProperty)
router.get('/:id',isAuthenticated , getProperty)



export default router