import PostService from '../services/postService.js';

class PostController {
  async index(req, res) {
    try {
      const posts = await PostService.index();
      return res.json(posts)
    } catch (e) {
      console.log(e);
      res.status(500).json(e)
    }
  };

  async show(req, res) {
    try {
      const post = await PostService.show(req.params.id);
      return res.json(post)
    } catch (e) {
      console.log(e);
      res.status(500).json(e)
    }
  };

  async create(req, res) {
    try {
      const post = await PostService.create(req.body)
      res.json(post)
    } catch (e) {
      console.log(e);
      res.status(500).json(e)
    }
  };

  async update(req, res) {
    try {
      const updatedPost = await PostService.update(req.body);
      return res.json(updatedPost)
    } catch (e) {
      console.log(e);
      res.status(500).json(e)
    }
  };

  async destroy(req, res) {
    try {
      const post = await PostService.destroy(req.params.id);
      return res.json(post)
    } catch (e) {
      console.log(e);
      res.status(500).json(e)
    }
  }
};

export default new PostController();