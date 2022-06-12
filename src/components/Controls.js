import IconButton from '@mui/material/IconButton';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import Tooltip from '@mui/material/Tooltip';

const Controls = ({
    setOpenTaskDialog,
    setFilterSetting,
    filterSetting
}) =>
(
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
                    onClick={setOpenTaskDialog}
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
)

export default Controls;