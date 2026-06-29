import { useReducer, useState } from "react";

const initialState = {
    username: "",
    password: "",
    loading: false,
    error: "",
};


function authReducer(state, action) {
    switch (action.type) {
        case "SET_FIELD":
            return {
                ...state,
                [action.field]: action.value,
            };

        case "LOGIN_START":
            return {
                ...state,
                loading: true,
                error: "",
            };

        case "LOGIN_SUCCESS":
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
            };

        case "LOGOUT":
            return {
                user: null,
                isAuthenticated: false,
            };

        default:
            return state;
    }
}

export default function Login() {
    const [LoggedIn, setIsLoggedIn] = useState(false);
    const [state, dispatch] =
        useReducer(authReducer,
            initialState);

    const handleChange = (e) => {
        dispatch({
            type: "SET_FIELD",
            field: e.target.name,
            value: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch({
            type: "LOGIN_START",
        });

        if (
            state.username === "admin" &&
            state.password === "123"
        ) {
            dispatch({
                type: "LOGIN_SUCCESS",
            });
            setIsLoggedIn(true);

            alert("Login Successful");
        } else {
            dispatch({
                type: "LOGIN_ERROR",
                payload: "Invalid Credentials",
            });
            alert("Login Failed");
        }
    };

    const [show, setShow] = useState(true);
    if (!show) return null;

    return (
        <form onSubmit={handleSubmit} className="flex items-center justify-center">
            <div className="bg-black rounded-xl p-4 login-form">
                <button className="text-red-500 hover:text-red-700 close-icon text-right mb-2" onClick={() => setShow(false)}>
                    ❌
                </button>
                <br />
                <input
                    className=" text-sm bg-white border border-gray-300 rounded-md py-2 px-4 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Username"
                    name="username"
                    value={state.username}
                    onChange={handleChange}
                />

                <input
                    className=" text-sm bg-white border border-gray-300 rounded py-2 px-4 mb-2 mx-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={state.password}
                    onChange={handleChange}
                />

                <button type="submit" disabled={state.loading} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold">
                    {state.loading
                        ? "Logging In..."
                        : "Login"}
                </button>

                <h3>{state.username}</h3>
            </div>
        </form>
    );
}