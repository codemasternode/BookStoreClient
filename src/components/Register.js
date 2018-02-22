import React from 'react';
import '../style/Register.css';


class Register extends React.Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            username: '',
            email: '',
            password: '',
        };
    }


    handleSubmit(event) {
        const username = this.state.username;
        const password = this.state.password;
        const email = this.state.email;

        event.preventDefault();

        fetch(`http://localhost:8080/users/register`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            }),
        });
    }

    
    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" onChange={event => this.setState({
                        username: event.target.value
                    })}/>
                    <input type="email" onChange={event => this.setState({
                        email: event.target.value
                    })}/>
                    <input type="password" onChange={event => this.setState({
                        password: event.target.value
                    })}/>
                    <input type="submit" value="Submit" />
                </form>
                
            </div>
        )
    }
}



export default Register;