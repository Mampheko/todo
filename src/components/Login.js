import React, { useState, useEffect } from "react";
import { GoogleButton } from 'react-google-button';
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import './login.css';
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();
    const [registerInformation, setRegisterInformation] = useState({
        name: "",
        email: "",
        password: ""
    });

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                navigate("/homepage");
            }
        });
    }, []);

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();

        const auth = getAuth();

        signInWithPopup(auth, provider).then(() => {
            navigate('/homepage');

        })
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogIn = () => {
        signInWithEmailAndPassword(auth, email, password).then(() => {
            navigate('/homepage')
        }).catch((err) =>
            alert(err.message));

    };

    const handleRegister = () => {
        if (registerInformation.name === registerInformation.email) {
            return
        }
        createUserWithEmailAndPassword(
            auth,
            registerInformation.email,
            registerInformation.password
        )
            .then(() => {
                navigate('/homepage')
            })
            .catch((err) => alert(err.message));
    };

    return (
        <div className="login">
            <h1>Welcome Back</h1>
            <h2>Manage You Task Checklist Easily</h2>
            <div className="login-register-container">
                {isRegistering ? (
                    <>
                        <input
                            type="name"
                            placeholder="Name"
                            value={registerInformation.name}
                            onChange={(e) =>
                                setRegisterInformation({
                                    ...registerInformation,
                                    name: e.target.value
                                })
                            }
                        /><br></br>
                        <input type="email"
                            placeholder="Email"
                            value={registerInformation.email}
                            onChange={(e) =>
                                setRegisterInformation({
                                    ...registerInformation,
                                    email: e.target.value
                                })}
                        /><br></br>
                        <input type="password"
                            placeholder="Password"
                            value={registerInformation.password}
                            onChange={(e) =>
                                setRegisterInformation({
                                    ...registerInformation,
                                    password: e.target.value
                                })}
                        /><br></br>
                        <button className="login-button" onClick={handleRegister}>Register</button>
                        <button className="create-account-button" onClick={() => setIsRegistering(false)}>Go back</button>
                        <GoogleButton onClick={googleSignIn} />
                    </>
                ) : (
                    <>
                        <input
                            type="email"
                            placeholder="Email"
                            onChange={handleEmailChange}
                            value={email}
                        /><br></br>
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={handlePasswordChange}
                            value={password}
                        /><br></br>
                        <button className="login-button" onClick={handleLogIn}>Login</button>
                        <button className="create-account-button" onClick={() => setIsRegistering(true)}>Create an account</button>
                        <GoogleButton onClick={googleSignIn} />
                    </>
                )}
            </div>
        </div>
    );
};


