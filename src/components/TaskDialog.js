import React, { useState } from 'react';
import PropTypes from "prop-types";
/* MUI */
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
    editableTask
}) => {
    const [name, setTaskName] = useState(editableTask ? editableTask.name : '');
    const [description, setTaskDescription] = useState(editableTask ? editableTask.description : '');
    return (
        <Dialog
            sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 530 } }}
            maxWidth="xs"
            open={open}
        >
            <DialogTitle>{editableTask ? `Edit- ${editableTask.name.slice(0,15)}...` : 'Add a Task'}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {
                        editableTask ? '' : 'To add a new TODO, please add a name and a description.'
                    }
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    required
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
                    variant="filled"
                    multiline
                    rows={4}
                    value={description}
                    onChange={({ target: { value } }) => setTaskDescription(value)}
                />
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel}>
                    Cancel
                </Button>
                <Button onClick={() => handleOk({ name, description }, editableTask)}>Ok</Button>
            </DialogActions>
        </Dialog>
    )

};

export default TaskDialog;

TaskDialog.propTypes = {
    handleCancel: PropTypes.func.isRequired,
    handleOk: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    editableTask: PropTypes.object
}