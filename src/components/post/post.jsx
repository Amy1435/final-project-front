import dayjs from "dayjs";
import { Link } from "react-router-dom";
const Post = ({ post }) => {
    return (
        <>
            <div className="post">
                <figure>
                    <img src={post.img} alt="" />
                </figure>
                <Link to={`/posts/${post._id}`}>
                    <h2>{post.title}</h2>
                </Link>

                <span>{post.city}</span>
                <span>{post.username}</span>
                <span>{dayjs(post.createdAt).format("DD/MM/YYYY")}</span>
                <span className="post-write">{post.post}</span>
            </div>
        </>
    );
};

export default Post;
