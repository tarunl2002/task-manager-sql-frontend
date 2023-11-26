import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState, useEffect } from 'react'
import {FormLabel, TextField, Button} from '@mui/material'
import { TableContainer,Paper, Table, TableHead,TableRow, TableBody, TableCell } from '@mui/material'
import { styled } from '@mui/material/styles';
import {tableCellClasses} from '@mui/material';
import axios from 'axios'


const NewTask = () => {

    const [taskName, setTaskName] = useState();
    const [description, setDescription] = useState();
    const [editMode, setEditMode] = useState(false);
    const [userId, setUserId] = useState()

    const addTask = async (e) => {
        e.preventDefault()
        try {
            const add = await axios.post('/api/create/list', {
              taskname : taskName,
              desc : description});
            if(add.status === 200){
                setTaskName('');
                setDescription('');
                showTasks();
            }
        }
        catch (error){
            console.log(error)
        
        }
}
const [list, setList] = useState();

const showTasks = async () => {
    try {
        const {data} = await axios.get('/api/show/tasks');
        setList(data);
    }
    catch (error){
        console.log(error)
    
    }
}

useEffect(() => {
showTasks();
}, []);

const deleteTask = async (id) => {
try {
  const taskdelete = await axios.delete(`/api/delete/task/${id}`);
  if (taskdelete.status===201) {
    showTasks();
  }
}
catch (error){
  console.log(error)

}
}
const showSingleTask = async (id) => {
  setEditMode(true);
try {
  const {data} = await axios.get(`/api/task/${id}`);
  setTaskName(data.taskname);
  setDescription(data.desc);
  setUserId(data.id);
}
catch (error){
  console.log(error)

}
}
const editTask = async (e) => {
  e.preventDefault()
try {
  const edit = await axios.put(`/api/update/task/${userId}`,
  {taskname : taskName,
  desc : description}
  );
  // console.log(edit)  
    
  if(edit.status === 200) {
    setEditMode(false);
    setTaskName('');
    setDescription('');
    showTasks();
  }
}
catch (error){
  console.log(error)

}
}


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  


  return (
    <Box>
    <Box mt="6em">
         <form onSubmit={editMode ? editTask :  addTask}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent={"center"}
        maxWidth={700}
        alignContent={"center"}
        alignSelf="center"
        marginLeft={"auto"}
        marginRight="auto"
        marginTop="auto"
      >
        <h3 style={{textAlign:"center", fontSize:"3em"}}>Add your Task</h3>
        <FormLabel>Task Name</FormLabel>
        <TextField
        id="outlined-required"
        // label="Task Name"
          onChange={(e) => setTaskName(e.target.value)}
          value={taskName}
          margin="normal"
          fullWidth
          variant="outlined"
          name="taskname"
          sx={{marginTop:'0px'}}
        />
        <FormLabel>Task Description</FormLabel>
        <TextField
        id="outlined-required"
        // label="Task Description"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
          margin="normal"
          fullWidth
          variant="outlined"
          name="desc"
          sx={{marginTop:'0px'}}
        />

        {
          editMode ? 
          <Button variant="contained" type="submit" color='secondary'>
          Update Task
        </Button> : 
        <Button variant="contained" type="submit">
        Add Task
      </Button>
        }
        
      </Box>
    </form>
    </Box>
    <Box
    mt='2em'
    mx='20%'
    >
    <TableContainer component={Paper}>
      <Table  aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>Task Name </StyledTableCell>
            <StyledTableCell align="center">Description</StyledTableCell>
            <StyledTableCell align="center">Edit</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {
                list && list.map(d => (
                    <StyledTableRow key={d.id}>
                    <StyledTableCell align='center'>{d.taskname}</StyledTableCell>
                    <StyledTableCell align='center'>{d.desc}</StyledTableCell>
                    <StyledTableCell align='center'><button style={{cursor: 'pointer'}} onClick={() => showSingleTask(d.id)}>🖋️</button></StyledTableCell>
                    <StyledTableCell align='center'><button style={{cursor: 'pointer'}} onClick={() => deleteTask(d.id)}>❌</button></StyledTableCell>
                     
                  </StyledTableRow>
                ))
            }

        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    </Box>
  )
}

export default NewTask