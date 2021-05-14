import React, { useEffect } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post.js';
import useStyles from './styles';


const Posts = ({setCurrentId, genreMenu}) => {
    const classes = useStyles();
    const posts = useSelector((state) => state.posts); //have acces to the global store (redux) - useSelector
    // {genreMenu ? posts.filter((post) => (post.genre === genreMenu) 
    const filterPostsByGenre = () => {
        if(genreMenu) {
            posts.filter((post) => post.genre === genreMenu);
        }
        return posts
    }
    return (
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={6}>
                        <Post post={post} setCurrentId={setCurrentId}/>
                    </Grid>))}
            </Grid>
        )
    )
}

export default Posts


