import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";

export default function HomePage() {
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // 🔍 Search state
    const [selectedCategory, setSelectedCategory] = useState(""); // Category filter state
    const [selectedAge, setSelectedAge] = useState(""); // Age filter state
    const [selectedPlayers, setSelectedPlayers] = useState(1); // Players filter state (default to 1)
    const [selectedDuration, setSelectedDuration] = useState(""); // Duration filter state

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

    // Filter posts based on search, category, age, players, and duration
    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "" || post.genre === selectedCategory;

        const matchesAge = selectedAge === "" || (
            (selectedAge === "<8" && post.age <= 8) ||
            (selectedAge === "<12" && post.age <= 12) ||
            (selectedAge === "<18" && post.age <= 18) ||
            (selectedAge === "18+" && post.age >= 18)
        );

        const matchesPlayers = selectedPlayers === "" || 
            (post.minPlayers <= selectedPlayers && post.maxPlayers >= selectedPlayers);

        const matchesDuration = selectedDuration === "" || (
            (selectedDuration === "<30" && post.duration <= 30) ||
            (selectedDuration === "<60" && post.duration <= 60)
        );

        return matchesSearch && matchesCategory && matchesAge && matchesPlayers && matchesDuration;
    });

    return (
        <section className="page">
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

            <div className="filters">
                {/* Category Filter */}
                <label>Category</label>
                <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="filter">
                    <option value="">All Categories</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>

                {/* Age Filter */}
                <label>Age</label>
                <select value={selectedAge} onChange={e => setSelectedAge(e.target.value)} className="filter">
                    <option value="">All Ages</option>
                    <option value="<8">Age &lt; 8</option>
                    <option value="<12">Age &lt; 12</option>
                    <option value="<18">Age &lt; 18</option>
                    <option value="18+">Age 18+</option>
                </select>

                {/* Players Filter */}
                <label>Players</label>
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

                {/* Average Duration Filter */}
                <label>Duration</label>
                <select value={selectedDuration} onChange={e => setSelectedDuration(e.target.value)} className="filter">
                    <option value="">All Durations</option>
                    <option value="<30">Duration &lt; 30 min</option>
                    <option value="<60">Duration &lt; 60 min</option>
                </select>
            </div>

            {filteredPosts.length > 0 ? (
                <section className="grid-container">
                    {filteredPosts.map(post => (
                        <PostCard post={post} key={post.id} />
                    ))}
                </section>
            ) : (
                <p>No matching results</p>
            )}
        </section>
    );
}
