import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { set, ref, onValue, remove } from "firebase/database";

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
                            setTodos((oldArray) => [...oldArray, todo]);
                        });
                    }
                });
            } else if (!user) {
                navigate("/");
            }
        });
    }, [])

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
        <div>
            <input
                type="text"
                placeholder="Add New Task"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            {todos.map((todo) => (
                <div>
                <h1>{todo.todo}</h1>
                <button onClick={() => handleDelete(todo.uidd)}>Complete</button>
                </div>
            ))}

            <button onClick={writeToDatabase}>add</button>
            <button onClick={handleSignOut}>Logout</button>
        </div>
    );
}