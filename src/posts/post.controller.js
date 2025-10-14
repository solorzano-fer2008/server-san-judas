import Post from './post.model.js'
import User from '../users/user.model.js'
import Comment from '../comments/comment.model.js'
import { populate } from 'dotenv'

export const createPost = async (req, res) => {
    try{
        const { title, content } = req.body
        const authorId = req.uid

        const post = new Post.create({
            title,
            content,
            autor: authorId
        })

        await User.findByIdAndUpdate(authorId, {
            $push: { posts: post._id}
        })

        const populatedPost = await Post.findById(post._id)
            .populate('author', 'name surname username profilePicture')
            .populate('comments')

        return res.status(201).json({
            message: 'Publicación exitosa',
            post: populatedPost
        })
    }catch (error){
        return res.status(500).json({
            message: 'Error al guardar la publicación',
            error: error.message
        })
    }
}
export const getAllPosts = async (req, res) => {
    try{
        const { page =1, limit = 8} = req.query
        const skip = (page - 1) * limit

        const posts = await Post.find()
            .populate('author', 'name surname username profilePicture')
            .populate({
                path: 'comments',
                populate:{
                    path: 'author',
                    select: 'name surname username profilePicture'
                }
            })
            .sort({ createdAd: -1 })
            .skip(skip)
            .limit(parseInt(limit))

        const totalPost = await Post.countDocuments()
        
        return res.status(200).json({
            message: 'Publicaciones obtenidas exitosamente',
            posts,
            pagination:{
                page: parseInt(page),
                limit: parseInt(limit),
                totalPost,
                pages: Math.ceil(totalPost / limit)
            }
        })
    }catch (error){
        return res.status(500).json({
            message: 'Error al obtener las publicaciones',
            error: error.message
        })
    }
}

export const getPostById = async (req, res) => {
    try{
        const { id } = req.params
        const post = await Post.findById(id)
            .populate('author', 'name surname username profilePicture')
            .populate({
            path: 'comments',
            populate:{
                path:'author',
                select:'name surname username profilePicture'
            }
        })
        return res.status(200).json({
            message: 'Publicación obtenida extisamente',
            post
        })
    }catch(error){
        return res.status(500).json({
            message: 'Error al obtener la publicación',
            error: error.message
        })
    }
}