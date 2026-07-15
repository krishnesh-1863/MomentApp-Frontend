import React, { useEffect, useState } from "react";

import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Feed = () => {
    const navigate = useNavigate();

    const [posts, setPosts] = useState([
        {
            _id: 1,
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5ONQjRP58gEf_w2Kci6ruxedbZZnkeReW6dYRfdSdiQ&s=10",
            caption: "Beautiful view",
        },
    ]);

    const [user, setUser] = useState(null);

    const navigatetopost = () => {
        navigate("/create-post");
    };

    useEffect(() => {
        fetchPosts();
        fetchUser();
    }, []);

    const fetchPosts = async () => {
    try {
        const res = await api.get("/posts");
        setPosts(res.data.posts);
    } catch (err) {
        console.log(err);
    }
};

    const fetchUser = async () => {
        try {
            const res = await api.get("/me");
            setUser(res.data.user);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (id) => {
    try {
        const res = await api.delete(`/posts/${id}`);
        console.log(res.data);

        setPosts((prevPosts) =>
            prevPosts.filter((post) => post._id !== id)
        );
    } catch (err) {
        console.log("Status:", err.response?.status);
        console.log("Response:", err.response?.data);
        console.log(err);
    }
};

    return (
        <div>
            {/* Navbar */}
            <div className="navbar flex justify-between items-center px-8 py-4">
                <h3 className="logo">Moment Maker</h3>

                {user && (
                    <div className="text-right">
                        <h4 className="font-semibold text-lg">
                            👋 {user.username}
                        </h4>
                        <p className="text-gray-500 text-sm">
                            {user.email}
                        </p>
                    </div>
                )}
            </div>

            {/* Create Post Button */}
            <div className="flex justify-center">
                <button
                    onClick={navigatetopost}
                    className="cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-white px-5 py-2 mt-7 bg-black rounded-3xl"
                >
                    + Create Post
                </button>
            </div>

            {/* Feed */}
            <div className="feed-section">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post._id} className="post-card">
                            <img src={post.image} alt={post.caption} />
                            <p>{post.caption}</p>

                            <button
                                className="delete-btn"
                                onClick={() => handleDelete(post._id)}
                            >
                                Delete Post
                            </button>
                        </div>
                    ))
                ) : (
                    <h1>No posts available</h1>
                )}
            </div>
        </div>
    );
};

export default Feed;