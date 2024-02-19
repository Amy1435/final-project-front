import { Link } from "react-router-dom";
const User = ({ user }) => {
    return (
        <>
            <div className="user">
                <Link to={`/users/${user._id}`}>
                    <figure>
                        <img
                            src={
                                user.profile_img.includes(`https://`)
                                    ? user.profile_img
                                    : `https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png`
                            }
                            alt="profile_img"
                        />
                    </figure>
                    <div className="name">
                        <span>{user.username}</span>
                    </div>
                </Link>
            </div>
        </>
    );
};

export default User;
