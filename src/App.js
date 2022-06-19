import './App.css';
import React, { useState, useEffect } from 'react';
import taskListStub from './taskliststub';
import Row from './components/Row';
import Controls from './components/Controls';
import TaskDialog from './components/TaskDialog';
/* MUI */
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const App = () => {
  const [tasks, setTasks] = useState(null);
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [filterSetting, setFilterSetting] = useState('all');
  const [editableTask, setEditableTask] = useState(null);

  useEffect(() => {
    if (!tasks) {
      const inLocalStorage = localStorage.getItem('todo');
      if (!inLocalStorage) {
        setTasks(taskListStub);
      } else {
        setTasks(JSON.parse(inLocalStorage));
      }
    } else {
      localStorage.setItem('todo', JSON.stringify(tasks))
    }
  }, [tasks])

  const handleTaskCompletion = ({ target: { id } }) => {
    const indexToUpdate = tasks.findIndex(task => task.id === id)
    const updatedTasks = [
      ...tasks.slice(0, indexToUpdate),
      {
        ...tasks[indexToUpdate],
        completed: !tasks[indexToUpdate].completed
      },
      ...tasks.slice(indexToUpdate + 1)
    ]
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
        completed: false,
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

  if (!tasks) return null;

  return (
    <>
      <Controls
        setOpenTaskDialog={setOpenTaskDialog}
        setFilterSetting={setFilterSetting}
        filterSetting={filterSetting}
      />
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
      {
        openTaskDialog &&
        <TaskDialog
          open={openTaskDialog}
          handleCancel={() => {
            setOpenTaskDialog(false)
            setEditableTask(null)
          }}
          handleOk={handleTaskAddOrEdit}
          editableTask={editableTask}
        />
      }
    </>
  )
}

export default App;
