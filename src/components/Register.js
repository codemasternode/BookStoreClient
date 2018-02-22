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
            fireRedirect: false,
            errors: null
        };
    }


    handleSubmit(event) {
        const username = this.state.username;
        const password = this.state.password;
        const email = this.state.email;

        event.preventDefault();


        fetch(`http://localhost:8080/users/checkUsername/` + username)
            .then(respone =>
                respone.json()
            )
            .then(respone => {
                this.setState({ errors: respone.status })
            });

        fetch(`http://localhost:8080/users/checkEmail/` + email)
            .then(respone =>
                respone.json()
            )
            .then(respone => {
                this.setState({ errors: respone.status })
            });
        if (this.state.errors == 'Ok') {
            fetch(`http://localhost:8080/users/register`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                    status: ''
                }),
            });
            this.setState({ fireRedirect: true });
        } else {

        }
    }






    render() {
        const { from } = this.props.location.state || '/'
        const { fireRedirect } = this.state
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="register-form">
                    <h2>Form Register</h2>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" className="form-control" placeholder="Enter Username" onChange={event => this.setState({
                            username: event.target.value
                        })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" id="email" className="form-control" placeholder="Enter email" onChange={event => this.setState({
                            email: event.target.value
                        })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pass">Password</label>
                        <input className="form-control" id="pass" placeholder="Enter valid password" type="password" onChange={event => this.setState({
                            password: event.target.value
                        })} />
                    </div>
                    <input type="submit" className="btn btn-lg button-custom-submit" value="Submit" />

                </form>
                {fireRedirect && (
                    <Redirect to={from || '/'} />
                )}
            </div>
        )
    }
}



export default Register;