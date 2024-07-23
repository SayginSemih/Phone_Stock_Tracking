import { useRef, useState } from "react";
import "./LoginPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {

    const username = useRef();
    const passwd = useRef();
    const col = useRef();
    const [errorMessage, setErrorMessage] = useState("");

    function btnLogin() {
        axios.post("http://localhost:3001/login", {
            username: username.current.value,
            passwd: passwd.current.value
        }).then(response => {
            if (response.data == 0) {
                setErrorMessage("Kullanıcı adı veya şifreniz hatalı!");
                col.current.value.InnerHTML = `
                `;
            }
            else {
                localStorage.setItem('token', response.data);
                window.location.reload();
            }
        })
            .catch(err => {
                console.log("Error: ", err)
            })
    }

    return (
        <>
            <div className="container-wrapper">
                <br />
                <div class="container">
                    <div class="row">
                        <div class="col-md-6 offset-md-3 login-form">
                            <h2 class="text-center mb-4">Giriş Yap</h2>
                            <div class="mb-3">
                                <label for="username" class="form-label">Username</label>
                                <input ref={username} type="text" class="form-control" id="username" name="username" />
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input ref={passwd} type="password" class="form-control" id="password" name="password" />
                            </div>
                            <button onClick={btnLogin} class="btn btn-primary w-100">Giriş Yap</button>
                            <div ref={col}>
                                {errorMessage != "" ? (
                                    <div class="alert alert-danger" role="alert">
                                        {errorMessage}
                                    </div>
                                ) :
                                (<></>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage
