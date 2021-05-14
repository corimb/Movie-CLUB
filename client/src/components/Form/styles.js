import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1.5),
    },
  },
  paper: {
    padding: theme.spacing(3),
    borderRadius: '10px'
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0'
  },
  buttonSubmit: {
    marginBottom: 10,
    backgroundColor: '#c4238c',
    '&:hover': {
      backgroundColor: 'primary',
      color: 'white',
  },
  },
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
    backgroundColor: '#c4238c',
    '&:hover': {
      backgroundColor: '#secondary'
    }
  },
  formControl: {
    margin: theme.spacing(1),
    width: '97%',
  },
}));