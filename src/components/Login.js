import React, { Component } from 'react';

class Login extends Component {

    
    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            // event.preventDefault();
            this.props.handleLogin();
        }
      }
    render() {
        const {email, 
            setEmail, 
            password, 
            setPassword, 
            handleLogin, 
            handleSignup, 
            hasAccount, 
            setHasAccount, 
            emailError, 
            passwordError
        } = this.props;
        return (
            <section className="login">

            <div className="loginContainer">
                <label htmlFor="input" className="Input-label">User</label>
                <input type="text" 
                    autoFocus 
                    required 
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)}
                    onKeyPress={this.handleKeyPress}
                />
                <p className="errorMsg">{emailError}</p>
                <label>Password</label>
                <input type="password" 
                    required 
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)}
                    onKeyPress={this.handleKeyPress}
                />
                <p className="errorMsg">{passwordError}</p>
                <div className="btnContainer">
                    {
                        !hasAccount ? (
                            <>
                                <button onClick={handleLogin}>Sign in</button>
                                <p>
                                    Don't have an account?
                                    <span className="btn-span" onClick={()=>setHasAccount(!hasAccount)}>Sign up</span>
                                </p>
                            </>
                            ) : (
                            <>
                                <button onClick={handleSignup}>Sign up</button>
                                <p>
                                    Have an account?
                                    <span className="btn-span" onClick={()=>setHasAccount(!hasAccount)}>Sign in</span>
                                </p>
                            </>
                        )
                    }
                </div>
                
            </div>
        </section>
        );
    }
}

export default Login;