import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/UserContext";

//pages
import Home from "./components/pages/Home";
import Posts from "./components/pages/Posts";
import SinglePost from "./components/pages/SinglePost";
import SignUp from "./components/pages/SignUp";
import LogIn from "./components/pages/LogIn";
import CreatePost from "./components/pages/CreatePost";
import PageNotFound from "./components/pages/PageNotFound";
import NavBar from "./components/Navbar/NavBar";
import Users from "./components/pages/Users";
import SingleUser from "./components/pages/SingleUser";
import UserSettings from "./components/pages/UserSettings";
import Cities from "./components/pages/Cities";
import SingleCity from "./components/pages/SingleCity";

function App() {
    const { user } = useContext(Context);
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/posts">
                    <Route index element={<Posts />} />
                    <Route path=":id" element={<SinglePost />} />
                </Route>

                <Route path="/users">
                    <Route index element={<Users />} />
                    <Route path=":id" element={<SingleUser />} />
                </Route>

                <Route
                    path="/user/settings"
                    element={user ? <UserSettings /> : <LogIn />}
                />
                <Route
                    path="/user/posts"
                    element={user ? <CreatePost /> : <LogIn />}
                />

                <Route path="/cities">
                    <Route index element={<Cities />} />
                    <Route path=":id" element={<SingleCity />} />
                </Route>

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
