import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const CreatePost = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get("/me");
                setUser(res.data.user);
            } catch (err) {
                console.log(err);
            }
        };

        fetchUser();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        try {
            setLoading(true);

            const res = await api.post("/create-post", formData);

            alert("Post Created Successfully");
            console.log(res.data);

            navigate("/feed");
        } catch (err) {
            console.log(err);
            alert(err.response?.data?.message || "Failed to create post");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-112.5">

                <h1 className="text-3xl font-bold text-center mb-4">
                    Create Post
                </h1>

                {user && (
                    <div className="mb-6 text-center">
                        <h2 className="text-lg font-semibold">
                            Welcome, {user.username}
                        </h2>
                        <p className="text-gray-500 text-sm">
                            {user.email}
                        </p>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        required
                        disabled={loading}
                        className="w-full border border-gray-300 rounded-lg p-3 mb-4"
                    />

                    <input
                        type="text"
                        name="caption"
                        placeholder="Write a caption..."
                        required
                        disabled={loading}
                        className="w-full border border-gray-300 rounded-lg p-3 mb-4"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {loading ? "Uploading..." : "Create Post"}
                    </button>

                    {loading && (
                        <p className="text-center mt-4 text-gray-500">
                            Uploading image, please wait...
                        </p>
                    )}
                </form>

            </div>
        </div>
    );
};

export default CreatePost;