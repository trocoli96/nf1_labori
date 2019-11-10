import React,{Component} from 'react';
import './App.css';


class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            lastName:'',
            email:'',
            password: '',
            error: '',
        };

        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleLastChange = this.handleLastChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dismissError = this.dismissError.bind(this);
    }

    dismissError() {
        this.setState({ error: '' });
    }

    handleSubmit(evt) {
        evt.preventDefault();

        if (!this.state.username) {
            return this.setState({ error: 'First Name is required' });
        }
        if (!this.state.lastName) {
            return this.setState({ error: 'Last Name is required' });
        }
        if (!this.state.email) {
            return this.setState({ error: 'Email is required' });
        }

        if (!this.state.password) {
            return this.setState({ error: 'Password is required' });
        }
        console.log('State : ' + this.state);
        console.log('User name : ' + this.state.username);

        console.log('User Email : ' + this.state.email);
        const fetchData = async () => {
            const url = 'http://127.0.0.1:80/api/user';

            const options = {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                    //'Access-Control-Allow-Headers': 'Authorization',

                }),
                mode: 'cors',
            };

            return fetch(url, options)
                .then(response => {
                    //debugger;
                    if(response.status === 201) {
                        alert(response.statusText);
                        return response.json();
                    }
                    return Promise.reject(response.status);
                }).then(data => {
                    //debugger;
                    // alert("Succesful, codigo 200"); alert("Error.\n\nOptions body:\n" + options.body +"\n\nURL called:\n" + url +
                });
        };

        fetchData();

    }

    handleUserChange(evt) {
        this.setState({
            username: evt.target.value,
        });
    };

    handleLastChange(evt) {
        this.setState({
            lastName: evt.target.value,
        });
    };

    handleEmailChange(evt) {
        this.setState({
            email: evt.target.value,
        });
    };

    handlePassChange(evt) {
        this.setState({
            password: evt.target.value,
        });
    }


render(){
    return (
            <div className="App">
                <header className="App-header">

                        <form onSubmit={this.handleSubmit}>
                            {
                                this.state.error &&
                                <h3 data-test="error" onClick={this.dismissError}>
                                    <button onClick={this.dismissError}>✖</button>
                                    {this.state.error}
                                </h3>
                            }
                            <label>First Name</label>
                            <input type="text" data-test="username" value={this.state.username} onChange={this.handleUserChange} />
                            <label>Last Name</label>
                            <input type="text" data-test="lastName" value={this.state.lastName} onChange={this.handleLastChange} />
                            <label>Email</label>
                            <input type="email" data-test="email" value={this.state.email} onChange={this.handleEmailChange} />

                            <label>Password (6 or more characters)</label>
                            <input type="password" data-test="password" value={this.state.password} onChange={this.handlePassChange} />
                                <p>You agree to the LinkedIn User Agreement, Privacy Policy, and Cookie Policy</p>

                            <input type="submit" value="Agree & Join" data-test="submit" />
                                <p>Already on LinkedIn? Sign in</p>
                        </form>
                </header>
            </div>
    );
}
}


export default SignUpPage;
