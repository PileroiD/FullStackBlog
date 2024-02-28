import PostModel from "../models/Post.js";

export const create = async (req, res) => {
    try {
        const doc = PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

        const post = await doc.save();

        res.json(post);
    } catch (error) {
        console.log("error :>>", error);
        res.status(500).json({
            message: "Failed to create the post",
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate("user").exec();
        res.json(posts);
    } catch (error) {
        console.log("error :>>", error);
        res.status(404).json({
            message: "Failed to get all posts",
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        PostModel.findOneAndUpdate(
            {
                _id: postId,
            },
            {
                $inc: {
                    viewsCount: 1,
                },
            },
            {
                returnDocument: "after",
            }
        )
            .exec()
            .then((doc) => {
                if (!doc) {
                    return res.status(404).json({
                        message: "Post not found",
                    });
                }

                res.json(doc);
            })
            .catch((error) => {
                console.log("error :>>", error);
                return res.status(404).json({
                    message: "Failed to get post",
                });
            });
    } catch (error) {
        console.log("error :>>", error);
        res.status(404).json({
            message: "Failed to get post",
        });
    }
};

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        PostModel.findOneAndDelete({
            _id: postId,
        })
            .exec()
            .then((doc) => {
                if (!doc) {
                    return res.status(404).json({
                        message: "Post not found",
                    });
                }

                res.json({
                    success: true,
                });
            })
            .catch((error) => {
                console.log("error :>>", error);
                return res.status(404).json({
                    message: "Failed to get post",
                });
            });
    } catch (error) {
        console.log("error :>>", error);
        res.status(404).json({
            message: "Failed to delete post",
        });
    }
};

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.updateOne(
            { _id: postId },
            {
                title: req.body.title,
                text: req.body.text,
                tags: req.body.tags,
                imageUrl: req.body.imageUrl,
                user: req.userId,
            }
        );

        res.json({
            success: true,
        });
    } catch (error) {
        console.log("error :>>", error);
        res.status(404).json({
            message: "Failed to update post",
        });
    }
};
