import React, { useState, useEffect } from 'react';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogContentText from '@mui/material/DialogContentText';

const TaskDialog = ({
    open,
    handleCancel,
    handleOk,
}) => {
    const [name, setTaskName] = useState('');
    const [description, setTaskDescription] = useState('');
    return (
        <Dialog
            sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 530 } }}
            maxWidth="xs"
            open={open}
        >
            <DialogTitle>Add a Task</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To add a new TODO, please add a name and a description.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={name}
                    onChange={({ target: { value } }) => setTaskName(value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="description"
                    label="Description"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={description}
                    onChange={({ target: { value } }) => setTaskDescription(value)}
                />
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel}>
                    Cancel
                </Button>
                <Button onClick={() => handleOk({ name, description })}>Ok</Button>
            </DialogActions>
        </Dialog>
    )

};

export default TaskDialog;