import { useNavigate } from "react-router-dom";
import placeholder from "../assets/img/img-placeholder.jpg";
import { FaUsers, FaClock, FaChild } from "react-icons/fa"; // Using icons for player count, duration, and age

export default function PostCard({ post }) {
    const navigate = useNavigate();
    
    function handleClick() {
        navigate(`/spilcafeen/update/${post.id}`); // Navigate with correct URL structure
    }

    return (
        <article className="post-card" onClick={handleClick}>
            {/* Image */}
            {post.image.includes("undefined") ? (
                <img className="post-card-image" src={placeholder} alt="Placeholder image" />
            ) : (
                <img className="post-card-image" src={post.image} alt={post.title} />
            )}

            {/* Category */}
            <p className="post-card-category">{post.genre}</p>

            <div className="post-card-details">
                {/* Player Count, Duration, Age */}
                <div className="post-card-stats">
                    <div className="post-card-stat">
                        <FaUsers className="post-card-icon" />
                        <span>{post.minPlayers} - {post.maxPlayers} Players</span>
                    </div>
                    <div className="post-card-stat">
                        <FaClock className="post-card-icon" />
                        <span>{post.duration} min</span>
                    </div>
                    <div className="post-card-stat">
                        <FaChild className="post-card-icon" />
                        <span>{post.age} +</span>
                    </div>
                </div>

                {/* Title and Description */}
                <h2 className="post-card-title">{post.title}</h2>
                <p className="post-card-description">{post.description}</p>

                {/* Complexity */}
                <p className="post-card-complexity"><strong>Complexity Level:</strong> {post.complexity}</p>

                
{/* Compact Placement Section */}
<div className="post-card-placement">
    <strong>Placement in: </strong>
    <span>
        {post.placementVestergade && `Vestergade: ${post.placementVestergade}`}
        {post.placementFredensgade && post.placementVestergade && ` | Fredensgade: ${post.placementFredensgade}`}
        {post.placementAalborg && (post.placementVestergade || post.placementFredensgade) && ` | Aalborg: ${post.placementAalborg}`}
        {post.placementKolding && (post.placementVestergade || post.placementFredensgade || post.placementAalborg) && ` | Kolding: ${post.placementKolding}`}
    </span>
</div>
            </div>
        </article>
    );
}
