import React,{Component} from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


class FormSignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name:'',
            email:'',
            password: '',
            error: '',
        };

        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleFirstChange = this.handleFirstChange.bind(this);
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

        if (!this.state.first_name) {
            return this.setState({ error: 'First Name is required' });
        }
        if (!this.state.last_name) {
            return this.setState({ error: 'Last Name is required' });
        }
        if (!this.state.email) {
            return this.setState({ error: 'Email is required' });
        }

        if (!this.state.password) {
            return this.setState({ error: 'Password is required' });
        }

        //console.log('User name : ' + this.state.firstName);

        //console.log('User Email : ' + this.state.email);
        const fetchData = async () => {
            const url = 'http://127.0.0.1:80/api/user';
            const options = {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                    'Access-Control-Allow-Headers': 'Authorization',

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

    handleFirstChange(evt) {
        this.setState({
            first_name: evt.target.value,
        });
    };

    handleLastChange(evt) {
        this.setState({
            last_name: evt.target.value,
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
            <div className="signup-page-full">
                <header className="signup-header">
                    <h1 className={"signup-welcome"}>
                        Welcome to Labori!
                    </h1>
                    <p className={"login-text"}>
                        Get the best from your professional life
                    </p>
                </header>
                <div className={"form-full"}>
                        <form onSubmit={this.handleSubmit}>
                            {
                                this.state.error &&
                                <h3 data-test="error" onClick={this.dismissError}>
                                    <button onClick={this.dismissError}>✖</button>
                                    {this.state.error}
                                </h3>
                            }
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="First Name"
                                name="name"
                                autoComplete="text"
                                autoFocus
                                value={this.state.firstName}
                                onChange={this.handleFirstChange} />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="surname"
                                label="Surname"
                                name="surname"
                                autoComplete="text"
                                autoFocus
                                value={this.state.lastName}
                                onChange={this.handleLastChange} />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={this.state.email}
                                onChange={this.handleEmailChange} />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                label="Password (6 or more characters)"
                                name="password"
                                autoComplete="password"
                                autoFocus
                                value={this.state.password}
                                onChange={this.handlePassChange} />
                                <p>You agree to the LABORI User Agreement, Privacy Policy, and Cookie Policy</p>
                            <Button variant="contained" color="primary" type="submit">
                                Agree & Join
                            </Button>
                        </form>
                </div>
                <p>Already on Labori? <a>Sign in</a></p>
            </div>
    );
}
}


export default FormSignUp;
