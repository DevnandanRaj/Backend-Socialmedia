const express = require("express");
const postRouter = express.Router();
const PostModel = require("../model/Post");


postRouter.post("/create", async (req, res) => {
    try {
        const { title, body, device } = req.body;
        const userId = req.user;

        const post = new PostModel({ title, body, device, userId });
        await post.save();
        res.status(200).json({ msg: "post created", post });

    } catch (error) {
         res.status(400).json({ msg: "Error"});
    }
});
postRouter.get("/", async (req, res) => {
    try {
        const userId = req.user;
        const posts = await PostModel.find({ userId });
        res.status(200).json({ msg: "post", posts });

    } catch (error) {
         res.status(400).json({ msg: "Error"});
    }
});


postRouter.delete("/update/:id", async (req, res) => {
    try {
        const postId = req.params.id;
         const userId = req.user;
        const post = await PostModel.findOne({ _id: postId, userId });
        if (!post) {
          return res.status(400).json({ msg: "post does not exists"});
        }
        await post.deleteOne();
        res.status(200).json({ msg: "post Updated" });

    } catch (error) {
         res.status(400).json({ msg: "Error"});
    }
});


postRouter.patch("/delete/:id", async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user;
        const { title, body, device } = req.body;
        const post = await PostModel.findOne({ _id: postId, userId });
        if (!post) {
          return res.status(400).json({ msg: "post does not exists"});
        }
        post.title = title;
        post.body = body;
        await post.save();
        res.status(200).json({ msg: "post deleted" });

    } catch (error) {
         res.status(400).json({ msg: "Error"});
    }
});



module.exports = postRouter;