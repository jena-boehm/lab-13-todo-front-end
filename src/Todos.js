import React, { Component } from 'react'
import request from 'superagent';

export default class Todos extends Component {
    state = {
        todos: []
    }

    componentDidMount = async () => {
        const response = await request
            .get('https://pacific-mesa-57017.herokuapp.com/api/todos')
            .set('Authorization', this.props.token)

            this.setState({ todos: response.body })
    }

    render() {
        return (
            <div>
                <div className='title'>ToDo List</div>
                {
                    Boolean(this.state.todos.length) && 
                    this.state.todos.map(todo => 
                    <div className="single-task">
                        <div className="task">Task: {todo.todo}</div>
                        <div className="completed">Completed: {todo.completed}</div>
                    </div>)
                }
            </div>
        )
    }
}
