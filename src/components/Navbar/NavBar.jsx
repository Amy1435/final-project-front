import { NavLink, Link } from "react-router-dom";
import logo from "../../images/logo.png";
import { useContext } from "react";
import { Context } from "../../context/UserContext";

const NavBar = () => {
    const { user, dispatch } = useContext(Context);

    const handleLogOut = () => {
        dispatch({ type: "LOGOUT" });
    };

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
                        <div className="common-links">
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
                            </>
                        )}
                    </>
                </menu>
            </nav>
        </>
    );
};

export default NavBar;
