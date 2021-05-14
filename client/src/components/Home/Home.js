import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Grow, Grid, CircularProgress, Paper, Typography} from '@material-ui/core';
import useStyles from './styles';
import Form from '../Form/Form';
import Post from '../Posts/Post/Post';
import { getPosts } from '../../actions/posts';
import { useSelector } from 'react-redux';
import './styles.css'
import { updateFilter } from '../../actions/filter'

const Home = () => {
    const [currentId, setCurrentId] = useState(null) 
    const [isLoading, setIsLoading] = useState(true)
    const classes = useStyles();
    const dispatch = useDispatch();
    
    //have acces to the global store (redux) - useSelector:
    const posts = useSelector((state) => state.posts); 
    const filter = useSelector((state) => state.filter);
    
    const handleChange = (genre) => {
        setIsLoading(true);
        dispatch(updateFilter(genre));
        dispatch(getPosts(genre));
        setTimeout(()=>{
            setIsLoading(false);
        }, 2000);
    }

    useEffect(() => {
        setIsLoading(true);
        dispatch(getPosts(filter));
        setTimeout(()=>{
            setIsLoading(false);
        }, 2000);
    }, []);


    return (
        <Grow in>
            <Container>
                <Grid className={classes.mainContainer} container  justify="space-between"  spacing={3}>
                <ul className="menu-horizontal"onChange={handleChange}>
                    <li onClick={() => {handleChange('none')}}>All</li>
                    <li onClick={() => {handleChange('action')}}>Action</li>
                    <li onClick={() => {handleChange('horror')}}>Horror</li>
                    <li onClick={() => {handleChange('drama')}}>Drama</li>
                    <li onClick={() => {handleChange('science-fiction')}}>Science-fiction</li>
                    <li onClick={() => {handleChange('animation')}}>Animation</li>
                    <li onClick={() => {handleChange('romantic comedy')}}>Romantic comedy</li>
                    <li onClick={() => {handleChange('documentary')}}>Documentary</li>
                    <li onClick={() => {handleChange('comedy')}}>Comedy</li>
                    <li onClick={() => {handleChange('romance')}}>Romance</li>
                    <li onClick={() => {handleChange('adventure')}}>Adventure</li>
                    <li onClick={() => {handleChange('martial arts')}}>Martial arts</li>
                    <li onClick={() => {handleChange('thriller')}}>Thriller</li>
                    <li onClick={() => {handleChange('history')}}>History</li>
                </ul>
                    <Grid item xs={12} lg={7}>
                        {isLoading ? <CircularProgress /> : (
                            <>
                            { posts.length > 0 ? (
                                <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                                {posts.map((post) => 
                                    (<Grid key={post._id} item xs={12} sm={6}>
                                        <Post post={post} setCurrentId={setCurrentId}/>
                                        </Grid>))}
                                </Grid>
                            ) : (
                                    <Paper className={classes.paper}>
                                        <Typography variant="h6" align="center">No posts with the genre selected. Choose a different one or create your own post.</Typography>
                                    </Paper> 
                                )
                            }
                            </>
                            )
                        }
                    </Grid>
                    <Grid item xs={12} sm={12} md={7} lg={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId}/>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}



export default Home

