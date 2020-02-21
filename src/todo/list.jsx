import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { markAsDone, markAsPending, remove } from './actions'
import Button from '../template/button'


class List extends Component {
    constructor(props) {
        super(props)
        this.renderRows = this.renderRows.bind(this)
    }

    renderRows() {
        const list = this.props.list || [];
        const { markAsDone, markAsPending, remove } = this.props //extrair atributos de
        return list.map(todo => (
            <tr key={todo._id}>
                <td className={todo.done ? 'mark-as-done' : ''}>{todo.description}</td>
                <td>
                    <Button style="success" icon="check" hide={todo.done}
                        onClick={() => markAsDone(todo)}>
                    </Button>
                    <Button style="warning" icon="undo" hide={!todo.done}
                        onClick={() => markAsPending(todo)}>
                    </Button>
                    <Button style="danger" icon="trash-o" hide={!todo.done}
                        onClick={() => remove(todo)}>
                    </Button>
                </td>
            </tr>
        ))
    }

    render() {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th className='table-btn-group'>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }
}

// mapeia os estados com as propriedades do objeto
const mapStateToProps = state => ({list: state.todo.list}) // vem do reducer.js

// mapeia as ações do estado
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        markAsDone,
        markAsPending,
        remove
    }, dispatch)
)

// exportar o component List só que decorado (connect) - padrão de projeto decorator
export default connect(mapStateToProps, mapDispatchToProps) (List)