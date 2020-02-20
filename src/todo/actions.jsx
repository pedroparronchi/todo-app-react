import axios from 'axios';

const URL = 'http://localhost:3003/api/todos'

export const changeDescription = (event) => ({
    type: 'DESCRIPTION_CHANGED',
    payload: event.target.value
});

export const search = () => {
    const request = axios.get(`${URL}?sort=-createdAt`)
    return {
        type: 'TODO_SEARCHED',
        payload: request
    }
}

// export const add = (description) => {
//     const request = axios.post(URL, { description: description }) // ou { description }
//     return [
//         {
//             type: 'TODO_SEARCHED',
//             payload: request
//         }
//     ]
// }


// recebe um método q recebe como parametro o dispatch, que vai enviar a sua action para todos os reduces
// redux-tunk
export const add = (description) => {
    return dispatch => {
        axios.post(URL, { description: description })
            .then(resp => dispatch({ type: 'TODO_ADDED', payload: resp.data}))
            .then(resp => dispatch( search() ))
    }
}

export const remove = (todo) => {
    axios.delete(`${URL}/${todo._id}`)
    return [
        {
            type: 'TODO_SEARCHED',
            payload: request
        }
]
}