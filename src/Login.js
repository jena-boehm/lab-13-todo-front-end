import React, { Component } from 'react'
import request from 'superagent';

export default class Login extends Component {
    state = {
        email: '',
        password: '',
        loading: false
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        console.log(this.state);

        this.setState({ loading: true });
        const user = await request
            .post('https://pacific-mesa-57017.herokuapp.com/auth/login')
            .send(this.state);

        this.setState({ loading: false });
        this.props.changeTokenAndUsername(user.body.token, user.body.username);
        this.props.history.push('/todos');
    }
    render() {
        return (
            <div>
                <div className='title'>Log In</div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <span>Email:</span>
                        <input 
                            onChange={(e) => 
                                this.setState({ email: e.target.value })} 
                            value={this.state.email} 
                        />
                    </label>
                    <label>
                        <span>Password:</span>
                        <input 
                            onChange={(e) =>
                                this.setState({ password: e.target.value })}
                            value={this.state.password}
                            type="password"
                        />
                    </label>
                    {
                        this.state.loading
                        ? 'Loading...'
                        : <button>Sign Up</button>
                    }
                </form>
            </div>
        )
    }
}
