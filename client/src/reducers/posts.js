import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (posts = [], action) =>{
    switch (action.type) {
        case DELETE:
            return posts.filter((post) => post._id !== action.payload)
        case LIKE:
            for(let post of posts){
                if(post._id === action.payload._id) {
                post.likes = action.payload.likes
                }    
            }
            return [ ...posts]
        case UPDATE:
            return posts.map((post)=>post._id === action.payload._id ? action.payload : post)
        case FETCH_ALL:
            return action.payload
        case CREATE:
            return [ ...posts, action.payload]
        default:
            return posts;
        }
}

//the state must have a value. In this case the state will be the posts and at first it is equal to an empty array 