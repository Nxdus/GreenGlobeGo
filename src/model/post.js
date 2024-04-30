import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
    {
        title: {
            type: String,
            require: true
        },
        desc: {
            type: String,
            require: true
        },
        img: {
            type: String,
            require: true
        },
        location: {
            type: String,
            require: true
        },
        lat: {
            type: Number,
            require: true
        },
        long: {
            type: Number,
            require: true
        }
    }, 
    { timestamps: true }
)

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;