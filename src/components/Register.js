import React from 'react';
import { Redirect } from 'react-router'
import '../style/Register.css';


class Register extends React.Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            username: '',
            email: '',
            password: '',
            fireRedirect: false
        };
    }


    handleSubmit(event) {
        const username = this.state.username;
        const password = this.state.password;
        const email = this.state.email;

        event.preventDefault();
        this.setState({ fireRedirect: true });

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
        })
            .then(res => {
                console.log(res);
            });
    }


    render() {
        const { from } = this.props.location.state || '/'
        const { fireRedirect } = this.state
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="register-form">
                    <h2>Form Register</h2>
                    <div className="form-group">
                        <label for="username">Username</label>
                        <input type="text" id="username" class="form-control" placeholder="Enter Username" onChange={event => this.setState({
                            username: event.target.value
                        })} />
                    </div>
                    <div className="form-group">
                        <label for="email">E-mail</label>
                        <input type="email" id="email" class="form-control" placeholder="Enter email" onChange={event => this.setState({
                            email: event.target.value
                        })} />
                    </div>
                    <div className="form-group">
                        <label for="pass">Password</label>
                        <input class="form-control" id="pass" placeholder="Enter valid password" type="password" onChange={event => this.setState({
                            password: event.target.value
                        })} />
                    </div>
                    <input type="submit" class="btn btn-lg button-custom-submit" value="Submit" />

                </form>
                {fireRedirect && (
                    <Redirect to={from || '/'} />
                )}
            </div>
        )
    }
}



export default Register;