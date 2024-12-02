import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
const serverUrl = process.env.REACT_APP_SERVER;
console.log('Server URL:', process.env.REACT_APP_SERVER);

function Login() {

    const navigate = useNavigate();
    //const User = JSON.parse(localStorage.getItem('user'));
    //console.log(User,"ljd")
    /*useEffect(() => {
        if(User)
        navigate("/profile"); 
    }, []);*/
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
async function DataCheck(event){
    event.preventDefault();
    /*console.log(event);
    console.log('Username:', username);
    console.log('Password:', password);*/
    try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER}/login`, {
          username: username,
          password: password
        });
      const user = response.data.user;
      //console.log("USER IS",user._id);
      localStorage.setItem('user', JSON.stringify(user));
      //console.log('Logged in user:', user,response);
      navigate("/profile");
      } catch (error) {
        console.error('Login Error:', error);
        navigate("/");
      }
}
    return (
        <div className="main">
            <div className="main-content">
                <div className="content-left">
                    <img src="https://media.gcflearnfree.org/content/633d944b3823fb02e84dce55_10_05_2022/Screen%20Shot%202022-10-10%20at%202.28.19%20PM.png" alt="" />
                </div>
                <div className="content-right">
                    <div className="content-r-1">
                        <div className="r-11">
                            <img src="https://e7.pngegg.com/pngimages/712/1009/png-clipart-letter-instagram-font-instagram-text-logo-thumbnail.png" alt="" />
                        </div>
                        <div className="r-12">
                            <form onSubmit={DataCheck} className="user-data">
                                <div className="r-12-1">
                                    <div className="r-12-1-1">
                                        <label>
                                            <span>Phone number, username, or email</span>
                                            <input type="text"
                                             name="username"
                                             value={username}
                                             onChange={(e) => setUsername(e.target.value)} />
                                        </label>
                                    </div>
                                    <div className="r-12-1-1">
                                        <label>
                                            <span>Password</span>
                                            <input 
                                             type="password"
                                             name="password"
                                             value={password}
                                             onChange={(e) => setPassword(e.target.value)} />
                                        </label>
                                    </div>
                                    <div className="r-12-1-1-for">
                                        <a href=""><span>Forgot password?</span></a>
                                    </div>
                                    <div className="r-12-1-2">
                                        <button type="submit">Log in</button>
                                    </div>
                                    <div className="r-12-1-3">
                                        <div className="r-12-1-3-1"></div>
                                        <div className="r-12-1-3-2">OR</div>
                                        <div className="r-12-1-3-1"></div>
                                    </div>
                                    <div className="r-12-1-4 log">
                                        <span><i className="fa-brands fa-square-facebook"></i></span>
                                        <span>Log in with Facebook</span>
                                    </div>
                                    <div className="r-12-1-4 continue">
                                        <button>
                                            <i className="fa-brands fa-square-facebook"></i>
                                            <span>Continue with Facebook</span>
                                        </button>
                                    </div>
                                </div>
                                <a href="">Forgot password?</a>
                            </form>
                        </div>
                    </div>
                    <div className="content-r-2">
                        <span>
                            <p>Don't have an account? <a href="/signup">Sign up</a></p>
                        </span>
                    </div>
                    <div className="content-r-3">
                        <div className="content-r-31">
                            <span>Get the app.</span>
                        </div>
                        <div className="content-r-32">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Get_it_from_Microsoft_Badge.svg/800px-Get_it_from_Microsoft_Badge.svg.png" alt="" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Get_it_from_Microsoft_Badge.svg/800px-Get_it_from_Microsoft_Badge.svg.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;