import axios from 'axios';

// const usersUrl = 'http://localhost:3003/users';
const classroomsUrl = 'http://localhost:8080/classrooms';

export const getClassrooms = async () => {
    
    return await axios.get(`${classroomsUrl}/`);
}

export const addClassroom = async (classroom) => {
    return await axios.post(`${classroomsUrl}/add`, classroom);
}

export const deleteClassroom = async (id) => {
    return await axios.delete(`${classroomsUrl}/${id}`);
}

export const editClassroom = async (id, classroom) => {
    return await axios.put(`${classroomsUrl}/${id}`, classroom)
}
export const getClassroom = async (id) => {
    
    return await axios.get(`${classroomsUrl}/${id}`);
}