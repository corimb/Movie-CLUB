import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux'

import useStyles from './styles';
import { createPost, updatePost} from '../../actions/posts';

const Form = ({currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({
        title:'',
        genre:'',
        message:'',
        tags:'',
        likes:[],
        selectedFile:''
    })
    const user = JSON.parse(localStorage.getItem('profile'));
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null)

    const classes = useStyles();

    const dispatch = useDispatch();

     useEffect(() => {
        if(post) setPostData(post)
    }, [currentId])

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(currentId === null) {
            dispatch(createPost({ ...postData, name: user?.name }));
        }else {
            dispatch(updatePost(currentId, { ...postData, name: user?.name}));
        }
        clear()
    }

    const clear = () =>{
        setCurrentId(null);
        setPostData({ title:'', genre:'', message:'', tags:'', selectedFile:'' })
    }

    if(!user?.name) {
        return(
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">Please Sign In to create your own posts and like other's posts.</Typography>
            </Paper>
        )
    }
    
    return (
        <Paper className={classes.paper}>
           <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Post</Typography>
            <TextField 
                name="title" 
                label="Title" 
                fullWidth
                value={postData.title}
                onChange={(e) => setPostData({ ...postData, title: e.target.value})}
            />
            <TextField 
                name="message" 
                label="Message" 
                fullWidth
                value={postData.message}
                onChange={(e) => setPostData({ ...postData, message: e.target.value})}
            />
            <TextField 
                name="tags" 
                label="Tags"
                placeholder="Ex: scarymovie,bestscarymovie" 
                fullWidth
                value={postData.tags}
                onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
            />
            <FormControl className={classes.formControl}>
                <InputLabel>Genre</InputLabel>
                <Select
                fullWidth
                value={postData.genre}
                onChange={(e) => setPostData({ ...postData, genre: e.target.value})}
                >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={'action'}>Action</MenuItem>
                <MenuItem value={'horror'}>Horror</MenuItem>
                <MenuItem value={'drama'}>Drama</MenuItem>
                <MenuItem value={'science-fiction'}>Science-fiction</MenuItem>
                <MenuItem value={'animation'}>Animation</MenuItem>
                <MenuItem value={'romantic comedy'}>Romantic comedy</MenuItem>
                <MenuItem value={'documentary'}>Documentary</MenuItem>
                <MenuItem value={'comedy'}>Comedy</MenuItem>
                <MenuItem value={'romance'}>Romance</MenuItem>
                <MenuItem value={'adventure'}>Adventure</MenuItem>
                <MenuItem value={'martial arts'}>Martial arts</MenuItem>
                <MenuItem value={'thriller'}>Thriller</MenuItem>
                <MenuItem value={'history'}>History</MenuItem>
                </Select>
            </FormControl>
            <div className={classes.fileInput}>
                <FileBase
                    type="file"
                    multiple={false}
                    onDone={({base64}) => setPostData({ ...postData, selectedFile:base64})}
               />
            </div>
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
           </form>
        </Paper>
    )
}

export default Form
