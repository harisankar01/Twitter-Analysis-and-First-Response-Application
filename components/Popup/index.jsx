import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
 import { makeStyles } from '@mui/styles';
import Slide from '@mui/material/Slide';
import { Box, colors, ListSubheader,  Paper } from '@mui/material';
import emailjs from '@emailjs/browser';
import { useRouter } from 'next/router';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const styles = makeStyles(theme => ({
  text: {
    paddingTop: theme.spacing * 4,
    paddingLeft: theme.spacing * 4,
    paddingRight: theme.spacing * 4,
    width: 150
  },
  paper: {
    paddingBottom: 50
  },
  list: {
    marginBottom: theme.spacing * 2,
    height: 150
  },
  subHeader: {
   backgroundColor: '#d7d9d7',
    color: '#251e12',
    width: 180,
    cursor: "pointer"
  },
  appBar: {
    top: 'auto',
    bottom: 0
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto'
  }
}));
const FullScreenDialog=({user_tweets,open,setOpen})=> {
        const classes = styles();
  const handleClose = () => {
    setOpen(false);
  };
let template_params;
  const router=useRouter();

  const sendEmail=async(e)=>{
    e.preventDefault(); 

    template_params= {
        'message': `${user_tweets}`,
        'state': 'Tamil Nadu'
      }
      emailjs.send("service_pp2x3gl","template_bly1khx",template_params).then(()=>console.log("sucess"))
      console.log(data);
}

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              <h2>The tweets associated with your region are</h2>
            </Typography>
            
          <Button variant='contained' color="secondary" sx={{backgroundColor:"#adc428"}} onClick={(e)=>sendEmail(e)}>Press here</Button>
          </Toolbar>
        </AppBar>
        <List>
          {
            user_tweets.map((value)=>{
                return(
                <>
                <ListItem className={classes.list}>
                    <ListSubheader className={classes.subHeader} onClick={()=>{router.push(`/${router.query.user}/${value.Department
                    }/${value._id}`)}}>
                        Department: {value.Department}
                    </ListSubheader>
               <ListItemText primary={value.tweet} secondary={value.tweet_associated_place} style={{marginLeft:10}} />
                <Paper variant="outlined" square elevation={6} >
                    <Typography sx={{ ml: 2, flex: 1 }} className={classes.text}>
                        Time of tweet: {value.Time_of_tweet}
                    </Typography>
                  </Paper>
                </ListItem>
                <Box sx={{ m: 2 }} />
                <Divider />
                </>
                )
            })
          }
        </List>
      </Dialog>
    </div>
  );
}
export default FullScreenDialog;