import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) =>{
    try {
        const searchQuery = {};
        if(req.query.genre && req.query.genre !== 'none'){
            searchQuery.genre = req.query.genre;
        }
        const postMessages = await PostMessage.find(searchQuery); 

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}


export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()})
    try {
        await newPost.save();

        res.status(201).json(newPost); // ok created
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}


export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, genre, message, creator, selectedFile, tags } = req.body; // recieve the post from the front 

    if(!id) return res.status(400).json({ error: 'idPost is required' });

    //if that object id from the Data Base is not valid:
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: `${id} is not a valid idPost` });
    
    const editedPost = { creator, title, genre, message, tags, selectedFile, _id: id };

    // look for the post in the Data Base and update the info (except for the likes):
    const updatedPost = await PostMessage.findByIdAndUpdate(id, editedPost, {new: true}); 

    res.json(updatedPost);
}


export const deletePost = async (req, res) => {
    const { id } = req.params;

    //if that object id from the Data Base is not valid:
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    // if the object id is valid: 
    await PostMessage.findByIdAndRemove(id);
    res.json({ message: "Post deleted successfully." });
}


export const likePost = async (req, res) => {

    const { idPost } = req.params;
    const idUser = req.userId;

    if(!idPost) return res.status(400).json({ error: 'idPost is required' });

    if(!mongoose.Types.ObjectId.isValid(idPost)) return res.status(400).json({ error: `${idPost} is not a valid idPost` });
    
    //find the id we are looking for in the Data Base and return that post if found
    const post = await PostMessage.findById(idPost); 

    if(!post) return res.status(404).send(`No post found with id: ${idPost}`);

    // CHECK IF THE USERID IS ON THE LIKE SECTION OR NOT:
    const isLikeFound = post.likes.includes(idUser);

    if(!isLikeFound){
        // if the id it's not in the array means that wants to LIKE THE POST: push the id into the likes array
        post.likes.push(idUser); // if the id is here means the user already liked the post --> so if clicks the like button will be a dislike action.
    } else {
        // filter out the id who clicked. - return the array of likes, minus the id of the person who just dilikes the post
        post.likes = post.likes.filter(idUserLikes => idUserLikes !== idUser);
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(idPost, post, { new: true });

    res.status(200).json(updatedPost);
} 