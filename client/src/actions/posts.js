import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
import * as api from '../api';

//Action Creators

export const getPosts = (genre) => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts(genre);
        
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error)
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch ({type: UPDATE, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        
        dispatch ({type: DELETE, payload: id}) 
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (idPost, idUser) => async (dispatch) => {
    try {
        const { data } = await api.likePost(idPost, idUser);

        dispatch ({type: LIKE, payload: data})
    } catch (error) {
        console.log(error)
    }
}