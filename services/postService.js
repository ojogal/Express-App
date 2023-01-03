import Post from '../models/Post.js';
import FileService from './fileService.js';

class PostService {
  async index() {
    const posts = await Post.find();
    return posts
  };

  async show(id) {
    if (!id) {
      throw new Error('No id')
    };

    const post = await Post.findById(id);
    return post
  };

  async create(post, picture) {
    const fileName = FileService.saveFile(picture);
    const createdPost = await Post.create({ ...post, picture: fileName });
    return createdPost
  };

  async update(post) {
    if (!post._id) {
      throw new Error('No id')
    };

    const updatedPost = await Post.findByIdAndUpdate(post._id, post, { new: true });
    return updatedPost
  };

  async destroy(id) {
    if (!id) {
      throw new Error('No id')
    };

    const post = await Post.findByIdAndDelete(id);
    return post
  }
};

export default new PostService()