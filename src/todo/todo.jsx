import React, { Component } from 'react';
import axios from 'axios';

import Header from '../template/header'
import Form from './form'
import List from './list'

const URL = "http://localhost:3003/api/todos";

export default class Todo extends Component {

    constructor(props) {
        super(props);
        this.state = { description: '', list: [] };
        this.add = this.add.bind(this);
        this.change = this.change.bind(this);
        this.remove = this.remove.bind(this);
        this.markAsDone = this.markAsDone.bind(this);
        this.markAsPending = this.markAsPending.bind(this);
        this.search = this.search.bind(this);
        this.clear = this.clear.bind(this);

        this.refresh();
    }

    add() {
        const description = this.state.description;
        axios.post(URL, { description })
            .then(resp => this.refresh());
    }

    remove(todo) {
        axios.delete(`${URL}/${todo._id}`)
            .then(resp => this.refresh(this.state.description))
    }

    change(event) {
        this.setState({...this.state, description: event.target.value})
    }

    refresh(description = '') {
        const search = description ? `&description__regex=/${description}/i` : ''; 
        axios.get(`${URL}?sort=createdAt${search}`)
        .then(
            resp => this.setState({...this.state, description, list: resp.data})
        );
    }

    markAsDone(todo) {
        axios.put(`${URL}/${todo._id}`, {...todo, done: true}).then(
            resp => this.refresh(this.state.description)
        )
    }

    markAsPending(todo) {
        axios.put(`${URL}/${todo._id}`, {...todo, done: false}).then(
            resp => this.refresh(this.state.description)
        )
    }

    search() {
        this.refresh(this.state.description);
    }

    clear() {
        this.refresh();
    }

    render() {
        return (
            <div>
                <Header name='Tarefas' small='Cadastro'/>
                <Form description={this.state.description}
                    change={this.change}
                    add={this.add}
                    search={this.search}
                    clear={this.clear}></Form>
                <List 
                    list={this.state.list} 
                    remove={this.remove}
                    markAsDone={this.markAsDone}
                    markAsPending={this.markAsPending}>
                </List>
            </div>
        )
    }
}