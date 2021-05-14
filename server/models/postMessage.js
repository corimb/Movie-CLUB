import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: { type: String, required:true },
    message: { type: String, required:true },
    name: { type: String, required:true },
    creator: { type: String, required:true },
    genre: { type: String, required:true },
    tags: { type: [String], required:true},
    selectedFile: { type: String, required:true },
    likes:{
        type: [String],
        default: [],
        required:true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
        required:true,
    },
})

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;