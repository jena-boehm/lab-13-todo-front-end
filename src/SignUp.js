import React, { Component } from 'react'

export default class SignUp extends Component {
    state = {
        email: '',
        password: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();

        console.log(this.state);
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
                    <button>Sign Up</button>
                </form>
            </div>
        )
    }
}
