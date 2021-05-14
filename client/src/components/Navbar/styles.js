import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  [theme.breakpoints.down('sm')]: {
    appBar: {
      padding: '10px 5px',
      borderRadius: 5,
      margin: '30px 0',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white'
    },
    heading: {
      fontSize: '12px',
      color: 'rgb(214 33 43)',
      textDecoration: 'none'
    },
    image: {
      height: '30px',
      marginLeft: '3px',
    },
    toolbar: {
      width: '200px',
      display: 'flex',
      justifyContent: 'flex-end',
    },
    userName: {
      display: 'none'
    },
    purple: {
      width: '25px',
      height: '25px',
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
    profile: {
      width:'150px',
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between',
    },
    brandContainer: {
      display: 'flex',
      alignItems: 'center',
      width:'300px'
    },
    dropdown: {
      position: 'absolute',
      top: 28,
      right: 0,
      left: 0,
      zIndex: 1,
      border: '1px solid',
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
    },
  },
  [theme.breakpoints.between('sm', 'md')]: {
    appBar: {
      padding: '10px 15px',
      borderRadius: 5,
      margin: '30px 0',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white'
    },
    heading: {
      color: 'rgb(214 33 43)',
      textDecoration: 'none',
      fontSize: '30px',
    },
    image: {
      height: '65px',
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '300px',
    },
    userName: {
      display: 'flex',
      alignItems: 'center',
    },
    profile: {
      alignItems: 'center',
      width: '600px'
    },
    purple: {
      width: '25px',
      height: '25px',
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    }
  },
  [theme.breakpoints.up('md')]: {
    appBar: {
      borderRadius: 5,
      margin: '30px 0',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 50px',
      backgroundColor: 'white'
    },
    heading: {
      color: 'rgb(214 33 43)',
      textDecoration: 'none',
      fontSize: '50px',
    },
    image: {
      marginLeft: '1px',
      height: '60px'
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '300px',
    },
    profile: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '400px',
    },
    userName: {
      display: 'flex',
      alignItems: 'center',
    },
    brandContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
    [theme.breakpoints.up('lg')]: {
      menuHamburger: {
        display: 'none'
      }
    }
  }
}));