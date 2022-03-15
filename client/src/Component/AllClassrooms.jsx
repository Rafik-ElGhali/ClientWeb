import react, { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, Paper, TableRow, TableBody, Button, makeStyles } from '@material-ui/core'
import { getClassrooms, deleteClassroom } from '../Service/api';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    table: {
        width: '90%',
        margin: '50px 0 0 50px'
    },
    thead: {
        '& > *': {
            fontSize: 20,
            background: '#000000',
            color: '#FFFFFF'
        }
    },
    row: {
        '& > *': {
            fontSize: 18
        }
    }
})


const AllClassrooms = () => {
    const [classrooms, setClassrooms] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        getAllClassrooms();
    }, []);

    const deleteClassroomData = async (id) => {
        await deleteClassroom(id);
        getAllClassrooms();
    }

    const getAllClassrooms = async () => {
        let response = await getClassrooms();
        console.log(response.data);
        setClassrooms(response.data);
    }

    return (
        <Table className={classes.table}>
            <TableHead>
                <TableRow className={classes.thead}>
                    <TableCell>Id</TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>status</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {classrooms.map((classroom) => (
                    <TableRow className={classes.row} key={classroom.id}>
                        <TableCell>{classroom._id}</TableCell> {/* change it to user.id to use JSON Server */}
                        <TableCell>{classroom.ID}</TableCell>
                        <TableCell>{classroom.location}</TableCell>
                        <TableCell>{classroom.status}</TableCell>
                        <TableCell>
                            <Button color="primary" variant="contained" style={{marginRight:10}} component={Link}  to={`/edit/${classroom._id}`}>Edit</Button> {/* change it to user.id to use JSON Server */}
                            <Button color="secondary" variant="contained" onClick={() => deleteClassroomData(classroom._id)}>Delete</Button> {/* change it to user.id to use JSON Server */}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default AllClassrooms;