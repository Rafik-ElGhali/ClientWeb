import { useState, useEffect } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, makeStyles, Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { getClassroom, editClassroom } from '../Service/api';

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

const EditClassroom = () => {
    const [classroom, setClassroom] = useState(initialValue);
    const { ID, location, status } = classroom;
    const { id } = useParams();
    const classes = useStyles();
    let history = useHistory();

    useEffect(() => {
        loadClassroomDetails();
    }, []);

    const loadClassroomDetails = async() => {
        const response = await getClassroom(id);
        setClassroom(response.data);
    }

    const editClassroomDetails = async() => {
        const response = await editClassroom(id, classroom);
        history.push('/all');
    }

    const onValueChange = (e) => {
        console.log(e.target.value);
        setClassroom({...classroom, [e.target.name]: e.target.value})
    }

    return (
        <FormGroup className={classes.container}>
            <Typography variant="h4">Edit Information</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">ID</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='ID' value={ID} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Location</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='location' value={location} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Status</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='status' value={status} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => editClassroomDetails()}>Edit Classroom</Button>
            </FormControl>
        </FormGroup>
    )
}

export default EditClassroom;