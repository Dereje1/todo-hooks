import './App.css';
import React, { Fragment, useState } from 'react';
import taskListStub from './taskliststub';
import TaskDialog from './TaskDialog';
/* MUI */
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Checkbox from '@mui/material/Checkbox';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const Row = (props) => {
  const { row, onCompleteTask, onDeleteTask } = props;
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" >
          {row.name}
        </TableCell>
        <TableCell padding="checkbox" align='center'>
          <Checkbox
            color="primary"
            checked={row.completed}
            onChange={onCompleteTask}
            inputProps={{
              'aria-label': 'mark complete',
            }}
            id={row.id}
          />
        </TableCell>
        <TableCell padding="checkbox" align='center'>
          <IconButton id="delete-task" onClick={() => onDeleteTask(row.id)}>
            <DeleteForeverIcon color='error' sx={{fontSize: '1.3em'}}/>
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {row.description}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

const App = () => {
  const [tasks, setTasks] = useState(taskListStub);
  const [openTaskDialog, setOpenTaskDialog] = useState(false);

  const handleTaskCompletion = ({ target: { id } }) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed
        }
      }
      return task
    })
    setTasks(updatedTasks);
  }

  const handleTaskAdd = (val) => {
    const updatedTasks = [...tasks, {
      ...val,
      id: Date.now().toString()
    }]
    setTasks(updatedTasks)
    setOpenTaskDialog(false)
  }

  const handleTaskDeletion = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId)
    setTasks(updatedTasks)
  }

  return (
    <>
      <div id="button-group-container"
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{ padding: 1 }}>
          <IconButton id="add-task" onClick={() => setOpenTaskDialog(true)}>
            <AddIcon />
          </IconButton>
          <IconButton id="completed-tasks" onClick={() => { }}>
            <CheckIcon />
          </IconButton>
          <IconButton id="all-tasks" onClick={() => { }}>
            <AllInclusiveIcon />
          </IconButton>
        </ButtonGroup>
      </div>
      {tasks.length ?
        <TableContainer component={Paper} sx={{ maxWidth: 700, margin: '0 auto' }}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell />
                <TableCell >Completed</TableCell>
                <TableCell >Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <Row key={task.id} row={task} onCompleteTask={handleTaskCompletion} onDeleteTask={handleTaskDeletion} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        :
        null
      }
      {openTaskDialog && <TaskDialog
        open={openTaskDialog}
        handleCancel={() => setOpenTaskDialog(false)}
        handleOk={handleTaskAdd}
      />}
    </>
  )
}



export default App;
