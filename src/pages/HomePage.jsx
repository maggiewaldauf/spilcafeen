import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import React from "react";

export default function HomePage() {
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // Search state
    const [selectedCategory, setSelectedCategory] = useState(""); // Category filter state
    const [selectedPlayers, setSelectedPlayers] = useState(2); // Players filter state (default to 2)
    const [maxDuration, setMaxDuration] = useState(120); // Max duration state

    useEffect(() => {
        async function getPosts() {
            const url = "https://boardgamecafe-dac23-default-rtdb.europe-west1.firebasedatabase.app/posts.json";
            const response = await fetch(url);
            const data = await response.json();
            if (data) {
                const postsArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                setPosts(postsArray);
            }
        }
        getPosts();
    }, []);

    // Get unique categories from posts
    const categories = [...new Set(posts.map(post => post.genre))];

    // Filter posts based on search, category, players, and max duration
    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "" || post.genre === selectedCategory;
        const matchesPlayers = selectedPlayers === "" || 
            (post.minPlayers <= selectedPlayers && post.maxPlayers >= selectedPlayers);
        const matchesDuration = post.duration <= maxDuration; // Only check for max duration

        return matchesSearch && matchesCategory && matchesPlayers && matchesDuration;
    });

    // Handle slider change for max duration
    const handleSliderChange = (event) => {
        setMaxDuration(Number(event.target.value));
    };

    return (
        <section className="main-content">
            <section className="search-and-filter">
                {/* Search Bar */}
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search for a game..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="search-bar"
                    />
                    <span className="search-icon">&#x1F50D;</span>
                </div>

                {/* Filters */}
                <div className="filters">
                <strong>Filter by</strong>
                    <div className="filter-group">
                        {/* Category Filter */}
                        <label>Category:</label>
                        <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="filter">
                        <option value="">All Categories</option>
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        {/* Players Filter */}
                        <label>Players:</label>
                        <div className="player-filter">
                        <button className="counter-btn" onClick={() => setSelectedPlayers(prev => Math.max(1, prev - 1))}>-</button>
                        <input 
                            type="number" 
                            className="player-input"
                            value={selectedPlayers}
                            min="1"
                            onChange={e => setSelectedPlayers(Number(e.target.value))}
                        />
                        <button className="counter-btn" onClick={() => setSelectedPlayers(prev => prev + 1)}>+</button>
                        </div>
                    </div>

                    <div className="filter-group">
                        {/* Duration Filter */}
                        <label>Max Duration:</label>
                        <div className="range-slider">
                        <input
                            type="range"
                            min="0"
                            max="120"
                            value={maxDuration}
                            onChange={handleSliderChange}
                            className="range-input"
                        />
                        <input
                            type="number"
                            value={maxDuration}
                            min="0"
                            max="120"
                            onChange={(e) => setMaxDuration(Number(e.target.value))}
                            className="duration-input"
                        />
                        </div>
                    </div>
                </div>
            </section>

            <section className="page">
                {/* Post cards are shown */}
                {filteredPosts.length > 0 ? (
                <section className="grid-container">
                    {filteredPosts.map(post => (
                        <PostCard post={post} key={post.id} />
                    ))}
                </section>
            ) : (
                <p className="no-results-message">No matching results</p>
            )}
            </section>
        </section>
    );
}
