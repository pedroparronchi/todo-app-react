import axios from 'axios';

const URL = 'http://localhost:3003/api/todos'

export const changeDescription = (event) => ({
    type: 'DESCRIPTION_CHANGED',
    payload: event.target.value
});

export const search = () => {

    // redux thank pega o valor do estado do componente
    return (dispatch, getState) => {
        const description = getState().todo.description;
        const search = description ? `&description__regex=/${description}/i` : ''; 
        const request = axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => dispatch({ type: 'TODO_SEARCHED', payload: resp.data}))
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
            .then(resp => dispatch( clear() ))
            .then(resp => dispatch( search() ))
    }
}

export const remove = (todo) => {
    return dispatch => {
        axios.delete(`${URL}/${todo._id}`)
            .then(resp => dispatch({ type: 'REMOVED', payload: resp.data}))
            .then(resp => dispatch( search() ))
    }
}


export const markAsDone = (todo) => {
    return dispatch => {
        axios.put(`${URL}/${todo._id}`, {...todo, done: true})
            .then(resp => dispatch( search() ))
    }
}

export const markAsPending = (todo) => {
    return dispatch => {
        axios.put(`${URL}/${todo._id}`, {...todo, done: false})
            .then(resp => dispatch( search() ))
    }
}

export const clear = () => {
    return [{ type: 'TODO_CLEAR' }, search()]
}