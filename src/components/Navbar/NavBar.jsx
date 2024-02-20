import { NavLink, Link } from "react-router-dom";
import logo from "../../images/logo.png";
import { useContext, useEffect } from "react";
import { Context } from "../../context/UserContext";
import { handleScroll } from "./handleScroll";
const NavBar = () => {
    const { user, dispatch } = useContext(Context);

    const handleLogOut = () => {
        dispatch({ type: "LOGOUT" });
    };

    //scroll
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <nav>
                <figure>
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                </figure>
                <menu>
                    <>
                        <div className="links">
                            <li>
                                <NavLink to="/cities">Cities</NavLink>
                            </li>
                            <li>
                                <NavLink to="/posts">Posts</NavLink>
                            </li>
                            <li>
                                <NavLink to="/users">Users</NavLink>
                            </li>
                        </div>

                        {!user ? (
                            <>
                                <div className="log-links">
                                    <li>
                                        {" "}
                                        <NavLink to="/auth/log-in">
                                            Log in
                                        </NavLink>
                                    </li>
                                    <li>
                                        {" "}
                                        <NavLink to="/auth/sign-up">
                                            Sign Up
                                        </NavLink>
                                    </li>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="links">
                                    <li>
                                        {" "}
                                        <NavLink to="/user/posts">
                                            Your experiences
                                        </NavLink>
                                    </li>
                                    <li>
                                        {" "}
                                        <NavLink to="/user/settings">
                                            Settings
                                        </NavLink>
                                    </li>
                                    <li>
                                        {" "}
                                        <NavLink
                                            to="/auth/sign-up"
                                            onClick={handleLogOut}
                                        >
                                            Log Out
                                        </NavLink>
                                    </li>
                                </div>
                            </>
                        )}
                    </>
                </menu>
            </nav>
        </>
    );
};

export default NavBar;
