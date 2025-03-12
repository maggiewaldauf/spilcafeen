import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostForm from "../components/PostForm";

export default function UpdatePage() {
    const [post, setPost] = useState(null); // Ensuring we handle null properly
    const params = useParams();
    const navigate = useNavigate();
    const url = `https://boardgamecafe-dac23-default-rtdb.europe-west1.firebasedatabase.app/posts/${params.postId}.json`;

    useEffect(() => {
        async function getPost() {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("❌ Failed to fetch post");
                }
                const data = await response.json();

                if (data) {
                    setPost(data);
                } else {
                    console.warn("⚠️ Post not found!");
                }
            } catch (error) {
                console.error("❌ Error fetching post:", error);
            }
        }

        getPost();
    }, [url]);

    async function updatePost(postToUpdate) {
        if (!postToUpdate || Object.keys(postToUpdate).length === 0) {
            console.error("❌ postToUpdate is empty or undefined!");
            alert("Post data is missing! Please check the form.");
            return;
        }

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(postToUpdate),
            });

            const result = await response.json();

            if (response.ok) {
                navigate("/spilcafeen/");
            } else {
                alert("Failed to update post. Check console for details.");
            }
        } catch (error) {
            alert("Error updating post. Check console for details.");
        }
    }

    async function deletePost() {
        if (!post) {
            alert("Cannot delete a post that does not exist.");
            return;
        }

        const confirmDelete = window.confirm(`Do you want to delete post, ${post?.title}?`);
        if (confirmDelete) {
            try {
                const response = await fetch(url, { method: "DELETE" });

                if (response.ok) {
                    navigate("/spilcafeen/");
                } else {
                    alert("Failed to delete post.");
                }
            } catch (error) {
                alert("Error deleting post.");
            }
        }
    }

    return (
        <section className="page">
            <h1>Update Post</h1>
            {post ? (
                <>
                    <PostForm post={post} savePost={updatePost} />
                    <button className="btn-delete" onClick={deletePost}>
                        Delete Post
                    </button>
                </>
            ) : (
                <p>Loading post...</p>
            )}
        </section>
    );
}
