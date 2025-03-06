import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";

export default function HomePage() {
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // 🔍 Search state
    const [selectedCategory, setSelectedCategory] = useState(""); // Category filter state
    const [selectedAge, setSelectedAge] = useState(""); // Age filter state
    const [selectedPlayers, setSelectedPlayers] = useState(""); // Players filter state
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
    
        // Fix age filter comparison and convert age to number
        const matchesAge = selectedAge === "" || (
            (selectedAge === "<8" && post.age <= 8) ||
            (selectedAge === "<12" && post.age <= 12) ||
            (selectedAge === "<18" && post.age <= 18) ||
            (selectedAge === "18+" && post.age >= 18)
        );
    
        const matchesPlayers = selectedPlayers === "" || (
            (selectedPlayers === "2" && post.minPlayers <= 2 && post.maxPlayers >= 2) ||
            (selectedPlayers === "2-4" && post.minPlayers >= 2 && post.maxPlayers <= 4) ||
            (selectedPlayers === "2-6" && post.minPlayers >= 2 && post.maxPlayers <= 6) ||
            (selectedPlayers === "6+" && post.maxPlayers >= 6) // Only check maxPlayers for 6+
        );
        
    
        // Fix duration filter - ensure post.duration is a number
        const matchesDuration = selectedDuration === "" || (
            (selectedDuration === "<30" && post.duration <= 30) ||
            (selectedDuration === "<60" && post.duration <= 60)
        );
    
        // Debugging Log
        console.log('Filtered Post:', post.title, {
            matchesSearch,
            matchesCategory,
            matchesAge,
            matchesPlayers,
            matchesDuration
        });
    
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
                <span className="search-icon">&#x1F50D;</span> {/* Unicode for the magnifying glass */}
            </div>

            <div className="filters">
                {/* Category Filter */}
                <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="filter">
                    <option value="">All Categories</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>

                {/* Age Filter */}
                <select value={selectedAge} onChange={e => setSelectedAge(e.target.value)} className="filter">
                    <option value="">All Ages</option>
                    <option value="&lt;8">Age &lt; 8</option>
                    <option value="&lt;12">Age &lt; 12</option>
                    <option value="&lt;18">Age &lt; 18</option>
                    <option value="18+">Age 18+</option>
                </select>

                {/* Players Filter */}
                <select value={selectedPlayers} onChange={e => setSelectedPlayers(e.target.value)} className="filter">
                    <option value="">All Players</option>
                    <option value="2">2 players</option>
                    <option value="2-4">2-4 players</option>
                    <option value="2-6">2-6 players</option>
                    <option value="6+">6+ players</option>
                </select>

                {/* Average Duration Filter */}
                <select value={selectedDuration} onChange={e => setSelectedDuration(e.target.value)} className="filter">
                    <option value="">All Durations</option>
                    <option value="&lt;30">Duration &lt; 30 min</option>
                    <option value="&lt;60">Duration &lt; 60 min</option>
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
