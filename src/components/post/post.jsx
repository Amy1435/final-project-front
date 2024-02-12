import dayjs from "dayjs";
import { Link } from "react-router-dom";
const Post = ({ post }) => {
    return (
        <>
            <div className="post">
                <figure>
                    <img
                        src={
                            post.img
                                ? post.img
                                : "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
                        }
                        alt=""
                    />
                </figure>
                <div className="datails-container">
                    <Link to={`/posts/${post._id}`}>
                        <h2>{post.title}</h2>
                    </Link>
                    <div>
                        <div className="details">
                            <div>
                                <span>
                                    {dayjs(post.createdAt).format("DD/MM/YYYY")}{" "}
                                    -{" "}
                                </span>
                                <span className="city">{post.city}</span>
                            </div>
                            <div>
                                <span>{post.username} from </span>
                            </div>
                        </div>
                    </div>
                    <span className="post-write">{post.post}</span>
                </div>
            </div>
        </>
    );
};

export default Post;
