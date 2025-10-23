import User from '../src/users/user.model.js'
import Post from '../src/posts/post.models.js';

export const emailExists = async (email = '') => {
  const existe = await User.findOne({ email })

  if (existe) {
    throw new Error('El email ya está registrado')
  }
}

export const postExists = async (id = '') => {
  const existe = await Post.findOne({ id })
  if (existe) {
    throw new Error('No existe un post con el id')
  }
}