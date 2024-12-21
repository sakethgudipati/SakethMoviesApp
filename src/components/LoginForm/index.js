import {Component} from "react"
import {Navigate} from "react-router-dom"
import { TailSpin } from "react-loader-spinner"
import Cookies from "js-cookie"
import "./index.css"

class LoginForm extends Component {
    state = {
        username: '',
        password: '',
        errorMsg: '',
        showErr: false,
        isLoggedIn: false,  
        isLoading: false
    };
    
    onSubmitSuccess = jwtToken => {
        Cookies.set('jwt_token', jwtToken, {
          expires: 30,
          path: '/',
        });
        this.setState({ isLoggedIn: true });  
    };
    
    onSubmitFailure = errMsg => {
        this.setState({ errorMsg: errMsg, showErr: true });
    };
    
    onChangeUsername = event => {
        this.setState({ username: event.target.value });
    };
    
    onChangePassword = event => {
        this.setState({ password: event.target.value });
    };
    
    submitForm = async event => {
        event.preventDefault();
        this.setState({isLoading: true});
        const { username, password } = this.state;
        const userDetails = { username, password };
        const url = 'https://apis.ccbp.in/login';
        const options = {
          method: 'POST',
          body: JSON.stringify(userDetails),
        };
        const response = await fetch(url, options);
        const data = await response.json();
        if (response.ok === true) {
          this.onSubmitSuccess(data.jwt_token);
          this.setState({isLoading: true});
        } else {
          this.onSubmitFailure(data.error_msg);
        }
    };

    render() {
        const { errorMsg, isLoading } = this.state;
        const jwtToken = Cookies.get('jwt_token');

        if (jwtToken !== undefined) {
        return <Navigate to="/" />;
        }

        return (
            <div className="login-bg-container">
                <img src="https://res.cloudinary.com/defacaof3/image/upload/v1730194589/Group_7399.png" className="logo" alt="logo" />
                <div className="login-container">
                    <h1 className="login-head">Login</h1>
                    <form className="login-form" onSubmit={this.submitForm}>
                        <label htmlFor="username" className="login-label-element">USERNAME</label>
                        <input type="text" id="username" className="login-input-element" onChange={this.onChangeUsername} />
                        <label htmlFor="password" className="login-label-element">PASSWORD</label>
                        <input type="password" id="password" className="login-input-element" onChange={this.onChangePassword} />
                        <p className="error-msg">{errorMsg}</p>
                        {isLoading ? (
                            <button className="login-button">
                                <TailSpin color="white" height={30} width={30}  />
                            </button>
                        ) : (
                            <button className="login-button" type="submit">Login</button>
                        )}
                    </form>
                </div>
            </div>
        )
    }
}

export default LoginForm