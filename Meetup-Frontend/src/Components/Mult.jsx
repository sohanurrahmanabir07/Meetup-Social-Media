import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            zIndex: 50
        },
    },
    container: document.getElementById('my_modal_3'), // <-- this is key
};


function getStyles(name, personName, theme) {
    return {
        fontWeight: personName.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

export default function MultipleSelectChip({ friends,box }) {
    console.log('frinds', friends)
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);
    const friendList = Object.values(friends); // convert object to array
    const [menuContainer, setMenuContainer] = React.useState(null);
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };


    React.useEffect(() => {
        // const modal = document.getElementById('my_modal_3');
        const modal = box.current;
        if (modal) {
            setMenuContainer(modal);
        }
    }, []);

    return (
        <div>
            <FormControl sx={{ m: 1, width: '100%' }}>
                <InputLabel id="demo-multiple-chip-label">Select</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value.name} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}


                >

                    {friendList.map((friend) => (
                        <MenuItem
                            key={friend._id}
                            value={friend}
                            style={getStyles(friend.name, personName, theme)}
                        >
                            {friend.name}
                        </MenuItem>
                    ))}



                </Select>
            </FormControl>
        </div>
    );
}
