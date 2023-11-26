import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { TableContainer,Paper, Table, TableHead,TableRow, TableBody, TableCell } from '@mui/material'
import { styled } from '@mui/material/styles';
import {tableCellClasses} from '@mui/material';
import axios from 'axios'

const TaskList = () => {


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
      if (taskdelete.status===200) {
        showTasks();
      }
  }
  catch (error){
      console.log(error)
  
  }
}
useEffect(() => {
  showTasks();
}, []);

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
          </TableRow>
        </TableHead>
        <TableBody>
            {
                list && list.map(d => (
                    <StyledTableRow key={d.id}>
                    <StyledTableCell align='center'>{d.taskname}</StyledTableCell>
                    <StyledTableCell align='center'>{d.desc}</StyledTableCell>
                    <StyledTableCell align='center'><button style={{cursor: 'pointer'}}>🖋️</button></StyledTableCell>
                    <StyledTableCell align='center'><button style={{cursor: 'pointer'}} onClick={() => deleteTask(d.id)}>❌</button></StyledTableCell>
                     
                  </StyledTableRow>
                ))
            }

        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  )
}

export default TaskList