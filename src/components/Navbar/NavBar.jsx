import { NavLink, Link } from "react-router-dom";
import logo from "../../images/logo.png";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/UserContext";
import { handleScroll } from "./handleScroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
const NavBar = () => {
    const { user, dispatch } = useContext(Context);
    const [menuOpen, setMenuOpen] = useState(false);

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
            <nav className={menuOpen ? "nav-open" : ""}>
                <figure>
                    <Link to="/">
                        <img src={logo} />
                    </Link>
                </figure>
                <menu
                    className={menuOpen ? "open-menu" : ""}
                    onClick={() => setMenuOpen(false)}
                >
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
                                            Add Experience
                                        </NavLink>
                                    </li>
                                    <li>
                                        {" "}
                                        <NavLink to="/user/settings">
                                            My Account
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
                <button className="menu-icon">
                    {menuOpen ? (
                        <FontAwesomeIcon
                            icon={faXmark}
                            onClick={() => setMenuOpen(false)}
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon={faBars}
                            onClick={() => setMenuOpen(true)}
                        />
                    )}
                </button>
            </nav>
        </>
    );
};

export default NavBar;
