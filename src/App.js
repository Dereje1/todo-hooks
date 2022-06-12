import './App.css';
import React, { Fragment, useState } from 'react';
import taskListStub from './taskliststub';
import Row from './Row';
import TaskDialog from './TaskDialog';
/* MUI */
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import Tooltip from '@mui/material/Tooltip';

const App = () => {
  const [tasks, setTasks] = useState(taskListStub);
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [filterSetting, setFilterSetting] = useState('all');
  const [editableTask, setEditableTask] = useState(null);

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

  const handleTaskAddOrEdit = (val, editableTask) => {
    let updatedTasks;
    if (editableTask) {
      const indexToUpdate = tasks.findIndex(task => task.id === editableTask.id)
      updatedTasks = [
        ...tasks.slice(0, indexToUpdate),
        {
          ...editableTask,
          name: val.name,
          description: val.description
        },
        ...tasks.slice(indexToUpdate + 1)
      ]
    } else {
      updatedTasks = [...tasks, {
        ...val,
        id: Date.now().toString()
      }]
    }
    setTasks(updatedTasks)
    setOpenTaskDialog(false)
    setEditableTask(null)
  }

  const handleTaskDeletion = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId)
    setTasks(updatedTasks)
  }

  const handleTaskEdit = (taskId) => {
    const [taskToEdit] = tasks.filter(task => task.id === taskId)
    setEditableTask(taskToEdit)
    setOpenTaskDialog(true)
  }

  const filterdTasks = () => {
    switch (filterSetting) {
      case 'all':
        return tasks
      case 'completed':
        return tasks.filter(task => Boolean(task.completed))
      case 'active':
        return tasks.filter(task => !Boolean(task.completed))
      default:
        return tasks
    }
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
          <Tooltip title="Add a task">
            <IconButton
              id="add-task"
              onClick={() => setOpenTaskDialog(true)}
              sx={{ margin: 1 }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Completed tasks">
            <IconButton
              id="completed-tasks"
              onClick={() => setFilterSetting('completed')}
              sx={{ border: filterSetting === 'completed' ? '.5px solid black' : '', margin: 1 }}
            >
              <CheckIcon color='primary' />
            </IconButton>
          </Tooltip>

          <Tooltip title="Active tasks">
            <IconButton
              id="active-tasks"
              onClick={() => setFilterSetting('active')}
              sx={{ border: filterSetting === 'active' ? '.5px solid black' : '', margin: 1 }}
            >
              <NotificationImportantIcon color='error' />
            </IconButton>
          </Tooltip>

          <Tooltip title="All tasks">
            <IconButton
              id="all-tasks"
              onClick={() => setFilterSetting('all')}
              sx={{ border: filterSetting === 'all' ? '.5px solid black' : '', margin: 1 }}
            >
              <AllInclusiveIcon color='success' />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
      </div>
      {filterdTasks().length ?
        <TableContainer component={Paper} sx={{ maxWidth: 700, margin: '0 auto' }}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell />
                <TableCell >Edit</TableCell>
                <TableCell >Completed</TableCell>
                <TableCell >Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterdTasks().map((task) => (
                <Row
                  key={task.id}
                  row={task}
                  onEditTask={handleTaskEdit}
                  onCompleteTask={handleTaskCompletion}
                  onDeleteTask={handleTaskDeletion}
                  openTaskDialog={openTaskDialog}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        :
        null
      }
      {openTaskDialog && <TaskDialog
        open={openTaskDialog}
        handleCancel={() => {
          setOpenTaskDialog(false)
          setEditableTask(null)
        }}
        handleOk={handleTaskAddOrEdit}
        editableTask={editableTask}
      />}
    </>
  )
}



export default App;
