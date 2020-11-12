import React, { Component } from 'react'
import request from 'superagent';

export default class Todos extends Component {
    state = {
        todos: [],
        todo: '',
        loading: false
    }

    componentDidMount = async () => {
        await this.fetchTodos()
    }


    fetchTodos = async() => {
        await this.setState({loading: true });
        const response = await request
            .get('https://pacific-mesa-57017.herokuapp.com/api/todos')
            .set('Authorization', this.props.token)

        await this.setState({ todos: response.body, loading: false })
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
            await this.setState({ loading: true })
            // STRETCH: clear form on submit
    }

    handleCompletedClick = async (id) => {
        await request
            .put(`https://pacific-mesa-57017.herokuapp.com/api/todos/${id}`)
            .set('Authorization', this.props.token);
            
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

                <div className='title'>Tasks</div>
                {
                    this.state.loading
                    ? 'Loading...'
                    : this.state.todos.map(todo => 
                        <div 
                            className="single-task"
                            key={`${todo.todo}${todo.id}${Math.random()}`}
                            style={{textDecoration: todo.completed
                                ? 'line-through'
                                : 'none'}
                                }>
                            <ul>
                                <li>
                                    <span className="task">{todo.todo} </span>
                                    {
                                        todo.completed
                                        ? ''
                                        : <button onClick={() => this.handleCompletedClick(todo.id)}>Complete</button>
                                    }
                                </li>
                            </ul>
                        </div>)
                }
            </div>
        )
    }
}
