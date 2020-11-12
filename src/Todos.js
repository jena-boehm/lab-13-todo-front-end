import React, { Component } from 'react'
import request from 'superagent';

export default class Todos extends Component {
    state = {
        todos: [],
        todo: ''
    }

    componentDidMount = async () => {
        await this.fetchTodos()
    }


    fetchTodos = async() => {
        const response = await request
            .get('https://pacific-mesa-57017.herokuapp.com/api/todos')
            .set('Authorization', this.props.token)

            this.setState({ todos: response.body })
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        await request
            .post('https://pacific-mesa-57017.herokuapp.com/api/todos')
            .send({
                todo: this.state.todo
                })
            .set('Authorization', this.props.token)

            await this.fetchTodos();

    }

    render() {
        return (
            <div>
                <div className='title'>ToDo List</div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <span>Add a task:</span>
                        <input
                            value={this.state.todo}
                            onChange={(e) => 
                                this.setState({ todo: e.target.value})}
                        />
                    </label>
                    <button>Add Task</button>
                </form>
                {
                    Boolean(this.state.todos.length) && 
                    this.state.todos.map(todo => 
                    <div className="single-task">
                        <div className="task">Task: {todo.todo}</div>
                    </div>)
                }
            </div>
        )
    }
}
