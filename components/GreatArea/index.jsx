import React,{useState} from 'react';
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import { useRouter } from 'next/router';
import { Card,CardContent } from '@mui/material';

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  chatSection: {
    width: '100%',
    height: '90vh'
  },
  headBG: {
      backgroundColor: '#e69292'
  },
  borderRight500: {
      borderRight: '1px solid #eb9696'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  }
});

const Chat = ({val}) => {
  const classes = useStyles();
  const router=useRouter();
 const dept=router.query.departments;
   const [msg, setmsg] = useState({
    "channel": dept,
    "message":""
  })
 let  message_list=[]

 const send= ()=>{
    console.log(msg.message);
    message_list.push(msg.message)
//    let response= await fetch('/api/send',{
//       method:"POST",
//       body:JSON.stringify(login),
//     })
//       let res=await response.json();
 }

  return (
      <div>
        <Grid container>
            <Grid item xs={12} >
                <Typography variant="h3" gutterBottom={true} className="header-message" align='center'>Welcome to {dept} department</Typography>
            </Grid>
        </Grid>
        <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={3} className={classes.borderRight500}>
                <List>
                    <ListItem button key="RemySharp">
                        <ListItemIcon>
                        <Avatar/>
                        </ListItemIcon>
                        <ListItemText primary="Captain"></ListItemText>
                    </ListItem>
                </List>
                <List>
                    <ListItem button key="RemySharp">
                        <ListItemIcon>
                            <Avatar />
                        </ListItemIcon>
                        <ListItemText primary="Inspector">Remy Sharp</ListItemText>
                    </ListItem>
                    <ListItem button key="Alice">
                        <ListItemIcon>
                            <Avatar />
                        </ListItemIcon>
                        <ListItemText primary="Investigators Engineer">Alice</ListItemText>
                    </ListItem>
                    <ListItem button key="CindyBaker">
                        <ListItemIcon>
                            <Avatar/>
                        </ListItemIcon>
                        <ListItemText primary="Chief">Cindy Baker</ListItemText>
                    </ListItem>
                </List>
            </Grid>
            <Grid item xs={9}>
                <List className={classes.messageArea}>
                    {val.map((message)=>{
                        return(
                             <div key={message._id}>
<Card sx={{ minWidth:700,maxWidth:750,maxHeight:350,minHeight:150 }} style={{backgroundColor:"#f0d2ee", float:"right"}}>
      <CardContent>
        <Typography sx={{ fontSize: 8 }} color="text.secondary" gutterBottom>
          Department: {message.Department}
        </Typography>
        <Typography variant="h5" component="div">
          {message.tweet}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Time of Tweet: {message.Time_of_tweet}
        </Typography>
        <Typography variant="body2">
          This tweet belongs to the {message.tweet_associated_place?message.tweet_associated_place:(message.tweeter_location?message.tweeter_location:"location not provided")} station
          <br />
          Tweeted by: {message["User name"]}
        </Typography>
      </CardContent>
    </Card>
              </div>
                        )
                    })}
                </List>
                <Divider />

                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11}>
                        <TextField id="outlined-basic-email" onChange={(e)=>{
                            setmsg({...msg,message: e.target.value})
                        }} label="Type Something" fullWidth />
                    </Grid>
                    <Grid xs={1} align="right">
                        <Fab color="primary" aria-label="add" onClick={send}><SendIcon /></Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
      </div>
  );
}

export default Chat;