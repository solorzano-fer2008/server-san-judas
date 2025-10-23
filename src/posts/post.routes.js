import { Router } from 'express'
import { createPost, getAllPosts, getPostById } from './post.controller.js'
import { createpostValidator } from '../../middlewares/post-validator.js'

const router = Router()

router.post('/', createpostValidator, createPost)

router.get('/', getAllPosts)

router.get('/:id', getPostById)

export default router