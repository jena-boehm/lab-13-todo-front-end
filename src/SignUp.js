import React, { Component } from 'react'
import request from 'superagent';

export default class SignUp extends Component {
    state = {
        email: '',
        password: '',
        loading: false
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        console.log(this.state);

        this.setState({ loading: true })
        const user = await request 
            .post('https://pacific-mesa-57017.herokuapp.com/auth/signup')
            .send(this.state);

        console.log(user.body);

        this.setState({ loading: false });
    }

    render() {
        return (
            <div>
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
