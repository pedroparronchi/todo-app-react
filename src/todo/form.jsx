import React from 'react'
import Grid from '../template/grid'
import Button from '../template/button'

export default props => {

    const keyHandler = (e) => {
        if(e.key == 'Enter') {
            e.shiftKey ? props.search() : props.add()
        } else if(e.key == 'Escape') {
            props.clear();
        }
    }

    return (
        <div role='form' className="todo-form">
            <Grid cols='10 9 10'>
                <input id="description" className='form-control'
                    placeholder='Adicione uma tarefa'
                    onChange={props.change}
                    onKeyUp={keyHandler}
                    value={props.description}></input>
            </Grid>
    
            <Grid cols='1 3 2'>
                <Button style='primary' icon='plus'
                    onClick={props.add}></Button>
                <Button style='info' icon='search'
                    onClick={props.search}></Button>
                <Button style='default' icon='undo'
                    onClick={props.clear}></Button>
            </Grid>
        </div>
    )
}