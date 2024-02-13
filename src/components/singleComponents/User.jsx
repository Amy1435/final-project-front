import { Link } from "react-router-dom";
const User = ({ user }) => {
    return (
        <>
            <div className="user">
                <Link to={`/users/${user._id}`}>
                    <figure>
                        <img
                            src={
                                user.profile_img
                                    ? user.profile_img
                                    : "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
                            }
                            alt="profile_img"
                        />
                    </figure>
                    <div className="datails-container">
                        <span>User: {user.username}</span>
                        <div className="details">
                            <span>From: </span>
                            <span className="city">{user.from_city}</span>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    );
};

export default User;
