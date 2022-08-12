import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { set, ref, onValue, remove } from "firebase/database";
import './homepage.css';
import AddIcon from '@mui/icons-material/Add';

export default function Homepage() {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                onValue(ref(db, `/${auth.currentUser.uid}`), snapshot => {
                    setTodos([]);
                    const data = snapshot.val();
                    if (data !== null) {
                        Object.values(data).map(todo => {
                            setTodos((oldArray) => [...oldArray, todo])
                        });
                    }
                });
            } else if (!user) {
                navigate("/");
            }
        });
    }, []);

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigate("/");
            })
            .catch(err => {
                alert(err.message);
            });
    };

    const writeToDatabase = () => {
        const uidd = uid();
        set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
            todo: todo,
            uidd: uidd,
        });

        setTodo("")
    };

    const handleDelete = (uid) => {
        remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
    };

    return (
        <div className="homepage">
            <input
                className="add-task-input"
                type="text"
                placeholder="Add New Task"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />

            <select className="select" >
                <option></option>
                <option value="High"> High </option>
                <option value="Medium"> Medium </option>
                <option value="Low"> Low </option>
            </select>

            {todos.map((todo) => (
                <div className="todo">
                    <h1>{todo.todo}</h1>
                    <button className="delete-button" onClick={() => handleDelete(todo.uidd)}>Complete</button>
                </div>
            ))}
            <div>
                <AddIcon onClick={writeToDatabase} className="add-icon" />
            </div>
            <button className="logout-button" onClick={handleSignOut}>LogOut</button>
        </div>
    );
}