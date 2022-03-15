import react, { useState } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, makeStyles, Typography } from '@material-ui/core';
import { addClassroom } from '../Service/api';
import { useHistory } from 'react-router-dom';

const initialValue = {
    ID: '',
    location: '',
    status: ''  
}

const useStyles = makeStyles({
    container: {
        width: '50%',
        margin: '5% 0 0 25%',
        '& > *': {
            marginTop: 20
        }
    }
})

const AddClassroom = () => {
    const [classroom, setClassroom] = useState(initialValue);
    const { ID, location, status } = classroom;
    const classes = useStyles();
    let history = useHistory();

    const onValueChange = (e) => {
        console.log(e.target.value);
        setClassroom({...classroom, [e.target.name]: e.target.value})
    }

    const addUserDetails = async() => {
        await addClassroom(classroom);
        history.push('./all');
    }

    return (
        <FormGroup className={classes.container}>
            <Typography variant="h4">Add Classroom</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">ID</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='ID' value={ID} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Location</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='location' value={location} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Status</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='status' value={status} id="my-input"/>
            </FormControl>
           
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => addUserDetails()}>Add Classroom</Button>
            </FormControl>
        </FormGroup>
    )
}

export default AddClassroom;