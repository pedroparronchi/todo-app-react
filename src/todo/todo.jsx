import React from 'react';

import Header from '../template/header'
import Form from './form'
import List from './list'

// COMPONENTE FUNCIONAL (SEM O COMPONENT DO REACT)

export default props => (
    <div>
        <Header name='Tarefas' small='Cadastro'/>
        <Form></Form>
        <List></List>
    </div>
)