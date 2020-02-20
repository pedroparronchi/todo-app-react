import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { changeDescription, search, add } from './actions'
import Grid from '../template/grid'
import Button from '../template/button'


class Form extends Component {
    constructor(props) {
        super(props)
        this.keyHandler = this.keyHandler.bind(this)
    }

    keyHandler(e) {
        const { add, search, description } = this.props //extrair atributos de
        if(e.key == 'Enter') {
            e.shiftKey ? search() : add(description)
        } else if(e.key == 'Escape') {
            props.clear();
        }
    }

    componentDidMount() {
        this.props.search()
    }

    render() {
        const { add, search, description } = this.props //extrair atributos de
        return (
            <div role='form' className="todo-form">
                <Grid cols='10 9 10'>
                    <input id="description" className='form-control'
                        placeholder='Adicione uma tarefa'
                        onChange={this.props.changeDescription}
                        onKeyUp={this.keyHandler}
                        value={this.props.description}></input>
                </Grid>
        
                <Grid cols='1 3 2'>
                    <Button style='primary' icon='plus'
                        onClick={() => add(description)}></Button>
                    <Button style='info' icon='search'
                        onClick={() => search()}></Button>
                    <Button style='default' icon='undo'
                        onClick={this.props.clear}></Button>
                </Grid>
            </div>
        )
    }
     
}


// mapeia os estados com as propriedades do objeto
const mapStateToProps = state => ({description: state.todo.description}) // vem do reducer.js


// mapeia as ações do estado
const mapDispatchToProps = dispatch => 
    bindActionCreators ({
        changeDescription,
        search,
        add
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Form)