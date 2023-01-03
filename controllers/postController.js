import { body } from 'express-validator';
import Post from '../models/Post.js';

class PostController {
  async index(req, res) {
    try {
      const posts = await Post.find();
      return res.json(posts)
    } catch (e) {
      console.log(e);
      res.status(500).json(e)
    }
  };

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ message: 'No data' })
      };

      const post = await Post.findById(id);
      return res.json(post)
    } catch (e) {
      console.log(e);
      res.status(500).json(e)
    }
  };

  async create(req, res) {
    try {
      const { author, title, content, picture } = req.body;
      const post = await Post.create({ author, title, content, picture });
      res.json(post)
    } catch (e) {
      console.log(e);
      res.status(500).json(e)
    }
  };

  async update(req, res) {
    try {
      const post = req.body;

      if (!body._id) {
        res.status(400).json({ message: 'No data' })
      };

      const updatedPost = await Post.findByIdAndUpdate(post._id, post, { new: true });
      return res.json(updatedPost)
    } catch (e) {
      console.log(e);
      res.status(500).json(e)
    }
  };

  async destroy(req, res) {
    try {
      const { id } = req.body;

      if (!id) {
        res.status(400).json({ message: 'No data' })
      };

      const post = await Post.findByIdAndDelete(id);
      return res.json(post)
    } catch (e) {
      console.log(e);
      res.status(500).json(e)
    }
  }
};

export default new PostController();