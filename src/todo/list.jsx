import React from 'react'
import { connect } from 'react-redux'


import Button from '../template/button'

const List = props => {

    const renderRows = () => {
        const list = props.list || [];
        return list.map(todo => (
            <tr key={todo._id}>
                <td className={todo.done ? 'mark-as-done' : ''}>{todo.description}</td>
                <td>
                    <Button style="success" icon="check" hide={todo.done}
                        onClick={() => props.markAsDone(todo)}>
                    </Button>
                    <Button style="warning" icon="undo" hide={!todo.done}
                        onClick={() => props.markAsPending(todo)}>
                    </Button>
                    <Button style="danger" icon="trash-o" hide={!todo.done}
                        onClick={() => props.remove(todo)}>
                    </Button>
                </td>
            </tr>
        ))
    }

    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th className='table-btn-group'>Ações</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )
}

// mapeia os estados com as propriedades do objeto
const mapStateToProps = state => ({list: state.todo.list}) // vem do reducer.js

// exportar o component List só que decorado (connect) - padrão de projeto decorator
export default connect(mapStateToProps) (List)