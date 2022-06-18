import PropTypes from "prop-types";
/* MUI */
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
                    sx={{ background: filterSetting === 'completed' ? '#e8e6e6' : '', margin: 1 }}
                >
                    <CheckIcon color='primary' />
                </IconButton>
            </Tooltip>

            <Tooltip title="Active tasks">
                <IconButton
                    id="active-tasks"
                    onClick={() => setFilterSetting('active')}
                    sx={{ background: filterSetting === 'active' ? '#e8e6e6' : '', margin: 1 }}
                >
                    <NotificationImportantIcon color='error' />
                </IconButton>
            </Tooltip>

            <Tooltip title="All tasks">
                <IconButton
                    id="all-tasks"
                    onClick={() => setFilterSetting('all')}
                    sx={{ background: filterSetting === 'all' ? '#e8e6e6' : '', margin: 1 }}
                >
                    <AllInclusiveIcon color='success' />
                </IconButton>
            </Tooltip>
        </ButtonGroup>
    </div>
)

export default Controls;

Controls.propTypes = {
    setOpenTaskDialog: PropTypes.func.isRequired,
    setFilterSetting: PropTypes.func.isRequired,
    filterSetting: PropTypes.string.isRequired
}