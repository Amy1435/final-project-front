import dayjs from "dayjs";
import { Link } from "react-router-dom";
const Post = ({ post }) => {
    return (
        <>
            <div className="post">
                <Link to={`/posts/${post._id}`}>
                    <figure>
                        <img
                            src={
                                post.img.includes(`https://`)
                                    ? post.img
                                    : `https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png`
                            }
                            alt=""
                        />
                    </figure>
                    <div className="datails-container">
                        <div className="post-title">
                            <h2>{post.title}</h2>
                        </div>

                        <div>
                            <div className="details">
                                <div>
                                    <span>
                                        {dayjs(post.createdAt).format(
                                            "DD/MM/YYYY"
                                        )}{" "}
                                        -{" "}
                                    </span>
                                    <span className="city">
                                        {post.city.name} -{" "}
                                    </span>
                                    <span>@{post.user.username}</span>
                                </div>
                            </div>
                        </div>
                        <span className="post-write">{post.post}</span>
                    </div>
                </Link>
            </div>
        </>
    );
};

export default Post;
