import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Button} from '@material-ui/core';
import {useHistory} from 'react-router-dom'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import WorkIcon from '@mui/icons-material/Work';
import DraftsIcon from '@mui/icons-material/Drafts';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';


function CompanyHome({user,setJob, setInterview}){
    const [jobs, setJobs] = useState([])
    const [recentInterviews, setRecentInterviews] = useState([])
    let history = useHistory()
    console.log(jobs)
    function titleCase(str) {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
}


    useEffect(() => {
        if(user.is_company){
          fetch("/api/jobs").then(res => res.json()).then(data => setJobs(data))
        }

        fetch(`/api/recentinterviews/${user.id}`).then(r => r.json()).then(data => setRecentInterviews(data))
      }, [user]);
    return (
        <>
        <h2 style={{marginLeft: '5%'}}> Welcome {user.name}</h2>
        <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
        
            <div >
                {jobs.filter(job => {
                    return job.user_id === user.id
                })[0] && <h3>View Posted Jobs:</h3>}

                    {jobs.filter(job => {
                    return job.user_id === user.id
                }) && 
                    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', color: 'white', opacity: '0.8'}}>
                <List >{jobs.filter(job => {
                    return job.user_id === user.id
                }).map(job => {
                   return  <ListItem diablePadding onClick={()=> {
                       setJob(job)
                       history.push(`/${job.id}`)
                   }}>
                   <ListItemButton> 
                        <ListItemIcon> 
                            <WorkIcon/>
                        </ListItemIcon>
                        <ListItemText primary={titleCase(job.title)} secondary={job.users.length + ' Applicants'}/>
                   </ListItemButton>
                   </ListItem>
                    })}</List>
                      </Box>
                    }




                
            </div>
            {/* <div style={{color: 'white', }} className='centerVertically' > */}

            <div style={{display: 'flex', height: '80vh', flexDirection: 'column'}}>
             <Button  style={{ marginTop: '25vh', height: '10%', textAlign: 'center', color: 'white', borderColor: '#CF9FFF'}} variant='outlined' onClick={()=> history.push(`/create`)}>Create a Job</Button>
            <Button  style={{ marginTop: '5vh', height: '10%',textAlign: 'center', color: 'white', borderColor: '#CF9FFF'}} variant='outlined' onClick={()=> history.push(`/mock`)}>Take a Mock Interview</Button>

            </div>


                
            {/* </div> */}
            <div style={{marginRight: '1vw'}}>
                {recentInterviews[0] && <h3>View Most Recent Interviews:</h3>}

                

                    {recentInterviews[0] && 
                    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', color: 'white'}}>
                <List >{recentInterviews.map(interview => {
                   return  <ListItem diablePadding onClick={()=> {
                       setInterview(interview)
                       history.push(`/interview/${interview.id}`)
                   }}>
                   <ListItemButton> 
                        <ListItemIcon> 
                            <AssignmentIndIcon/>
                        </ListItemIcon>
                        <ListItemText primary={titleCase(interview.user.name)} secondary={"Interview for " + titleCase(interview.job.title)}/>
                   </ListItemButton>
                   </ListItem>
                    })}</List>
                      </Box>
                    }
            </div>
            
        </div>
        </>
    )
}
export default CompanyHome