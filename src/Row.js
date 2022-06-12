import React, { Fragment, useState } from 'react';
/* MUI */
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Checkbox from '@mui/material/Checkbox';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';

const Row = ({
    row,
    onCompleteTask,
    onDeleteTask,
    onEditTask,
    openTaskDialog
}) => {
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
                    <IconButton id="edit-task" onClick={() => onEditTask(row.id)}>
                        <EditIcon color='success' sx={{ fontSize: '1.3em' }} />
                    </IconButton>
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
                        <DeleteForeverIcon color='error' sx={{ fontSize: '1.3em' }} />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open && !openTaskDialog} timeout="auto" unmountOnExit>
                        <TextField
                            margin="dense"
                            id="description"
                            label="Description"
                            type="text"
                            fullWidth
                            variant="standard"
                            multiline
                            defaultValue={row.description}
                            disabled
                            sx={{
                                "& .MuiInputBase-input.Mui-disabled": {
                                    WebkitTextFillColor: "#6e6b6b",
                                },
                                '& .MuiInput-underline:before': { borderBottomColor: 'white' },
                            }}
                        />
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

export default Row;