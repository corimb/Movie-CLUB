import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppBar, Toolbar, Typography, Avatar, Button, MenuItem, Menu } from '@material-ui/core';
import TuneIcon from '@material-ui/icons/Tune';
import decode from 'jwt-decode';
import useStyles from './styles';
import logo from '../../images/movie_club_logo.png';
import { LOGOUT } from '../../constants/actionTypes';
import { updateFilter } from '../../actions/filter';

const Navbar = () => {

    const classes = useStyles();
    
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const [openedMenu, setOpenedMenu] = useState(false);
    const [anchorMenu, setAnchorMenu] = useState(null); 

    const setMenuAnchor = (event) => {
        setAnchorMenu(event.currentTarget);
        setOpenedMenu(true)
    };

    const handleChange = (genre) => {
        dispatch(updateFilter(genre));
        setOpenedMenu(false)
    }

    const handleClose = () => {
        setOpenedMenu(false)
    }

    const logout = () => {
        dispatch({ type: LOGOUT });

        history.push('/auth');

        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;

        if(token) {
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) logout()
        }
        // JWT for the manual sign up
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
                <div className={classes.menuHamburger}> 
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={setMenuAnchor}>
                        <TuneIcon />
                    </Button>
                        <Menu 
                            id="simple-menu"
                            keepMounted
                            anchorEl={anchorMenu}
                            open={Boolean(openedMenu)}
                            onChange={handleChange}
                            onClose={handleClose}
                        > 
                            <MenuItem onClick={() => {handleChange('none')}}>All</MenuItem>
                            <MenuItem onClick={() => {handleChange('action')}}>Action</MenuItem>
                            <MenuItem onClick={() => {handleChange('horror')}}>Horror</MenuItem>
                            <MenuItem onClick={() => {handleChange('drama')}}>Drama</MenuItem>
                            <MenuItem onClick={() => {handleChange('science-fiction')}}>Science-fiction</MenuItem>
                            <MenuItem onClick={() => {handleChange('animation')}}>Animation</MenuItem>
                            <MenuItem onClick={() => {handleChange('romantic comedy')}}>Romantic comedy</MenuItem>
                            <MenuItem onClick={() => {handleChange('documentary')}}>Documentary</MenuItem>
                            <MenuItem onClick={() => {handleChange('comedy')}}>Comedy</MenuItem>
                            <MenuItem onClick={() => {handleChange('romance')}}>Romance</MenuItem>
                            <MenuItem onClick={() => {handleChange('adventure')}}>Adventure</MenuItem>
                            <MenuItem onClick={() => {handleChange('martial arts')}}>Martial arts</MenuItem>
                            <MenuItem onClick={() => {handleChange('thriller')}}>Thriller</MenuItem>
                            <MenuItem onClick={() => {handleChange('history')}}>History</MenuItem>
                        </Menu>
                </div>
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading}>Movie CLUB</Typography>
                <img className={classes.image} src={logo} alt="logo"></img>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.name} src={user.imageUrl}>{user.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName}>{user.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;
