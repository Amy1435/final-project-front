import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Posts from "./components/pages/Posts";
import SinglePost from "./components/pages/SinglePost";
import SignUp from "./components/pages/SignUp";
import LogIn from "./components/pages/LogIn";
import { useContext } from "react";
import { Context } from "./context/UserContext";
import CreatePost from "./components/pages/CreatePost";
import PageNotFound from "./components/pages/PageNotFound";
import NavBar from "./components/Navbar/NavBar";
import Users from "./components/pages/Users";
import SingleUser from "./components/pages/SingleUser";
import UserSettings from "./components/pages/UserSettings";

function App() {
    const { user } = useContext(Context);
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/posts" element={<Posts />} />
                <Route path="/posts/:id" element={<SinglePost />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<SingleUser />} />
                <Route
                    path="/user/settings"
                    element={user ? <UserSettings /> : <LogIn />}
                />
                <Route
                    path="/user/posts"
                    element={user ? <CreatePost /> : <LogIn />}
                />
                <Route
                    path="/auth/sign-up"
                    element={user ? <Posts /> : <SignUp />}
                />
                <Route
                    path="/auth/log-in"
                    element={user ? <Posts /> : <LogIn />}
                />

                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </>
    );
}

export default App;
