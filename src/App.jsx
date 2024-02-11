import "./App.scss";
import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./components/pages/Home";
import Posts from "./components/pages/Posts";
import logo from "./images/logo.png";
import SinglePost from "./components/pages/SinglePost";
import SignUp from "./components/pages/SignUp";
import LogIn from "./components/pages/LogIn";
function App() {
    return (
        <>
            <nav>
                <figure>
                    <img src={logo} alt="" />
                </figure>
                <menu>
                    <li>
                        {" "}
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        {" "}
                        <NavLink to="/posts">Posts</NavLink>
                    </li>
                    <li>
                        {" "}
                        <NavLink to="/auth/log-in">Log in</NavLink>
                    </li>
                    <li>
                        {" "}
                        <NavLink to="/auth/sign-up">Sign Up</NavLink>
                    </li>
                </menu>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/posts/:id" element={<SinglePost />} />
                <Route path="/auth/sign-up" element={<SignUp />} />
                <Route path="/auth/log-in" element={<LogIn />} />
            </Routes>
        </>
    );
}

export default App;
