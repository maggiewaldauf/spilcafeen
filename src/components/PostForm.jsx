import { useEffect, useState } from "react";
import placeholder from "../assets/img/img-placeholder.jpg";

export default function PostForm({ savePost, post }) {
    const [gameId, setGameId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState("");
    const [minPlayers, setMinPlayers] = useState("");
    const [maxPlayers, setMaxPlayers] = useState("");
    const [duration, setDuration] = useState("");
    const [age, setAge] = useState("");
    const [complexity, setComplexity] = useState("");
    const [genre, setGenre] = useState("");
    const [placementVestergade, setPlacementVestergade] = useState("");
    const [placementFredensgade, setPlacementFredensgade] = useState("");
    const [placementAalborg, setPlacementAalborg] = useState("");
    const [placementKolding, setPlacementKolding] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (post) {
            // if post, set the states with values from the post object.
            // The post object is a prop, passed from UpdatePage
            setGameId(post.gameId);
            setTitle(post.title);
            setDescription(post.description);
            setImageFile(post.image);
            setMinPlayers(post.minPlayers);
            setMaxPlayers(post.maxPlayers);
            setDuration(post.duration);
            setAge(post.age);
            setComplexity(post.complexity);
            setGenre(post.genre);
            setPlacementVestergade(post.placementVestergade);
            setPlacementFredensgade(post.placementFredensgade);
            setPlacementAalborg(post.placementAalborg);
            setPlacementKolding(post.placementKolding);
        }
    }, [post]); // useEffect is called every time post changes.

    function handleSubmit(event) {
        event.preventDefault();
        const formData = {
            // create a new object to store the value from states / input fields
            gameId: gameId,
            title: title,
            image: imageFile,
            description: description,
            minPlayers: minPlayers,
            maxPlayers: maxPlayers,
            duration: duration,
            age: age,
            complexity: complexity,
            genre: genre,
            placementVestergade: placementVestergade,
            placementFredensgade: placementFredensgade,
            placementAalborg: placementAalborg,
            placementKolding: placementKolding
        };

        const validForm = formData.gameId && formData.title && formData.description && formData.image && formData.minPlayers && formData.maxPlayers && formData.duration && formData.age && formData.complexity && formData.genre; // will return false if one of the properties doesn't have a value
        if (validForm) {
            // if all fields/ properties are filled, then call savePost
            savePost(formData);
        } else {
            // if not, set errorMessage state.
            setErrorMessage("Please, fill in all fields.");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Game ID
                <input type="number" value={gameId} placeholder="Set a unique Game ID" onChange={e => setGameId(e.target.value)} />
            </label>
            <label>
                Title
                <input type="text" value={title} placeholder="Type a title" onChange={e => setTitle(e.target.value)} />
            </label>
            <label>
                Description
                <input type="text" value={description} placeholder="Type a body text" onChange={e => setDescription(e.target.value)} />
            </label>
            <label>
                Image URL
                <input
                    type="text" value={imageFile} placeholder="https://exampleforimage.jpg" onChange={e => setImageFile(e.target.value)}
                />
                <img className="image-preview" src={imageFile || placeholder} alt="Preview" onError={event => {
                        event.target.onerror = null;
                        event.target.src = placeholder;
                    }}
                />
            </label>
            <label>
                Recommended Age
                <input type="number" value={age} placeholder="Set the recommended age" onChange={e => setAge(e.target.value)} />
            </label>
            <label>
                Min. Players
                <input type="number" value={minPlayers} placeholder="Type the minimum of players" onChange={e => setMinPlayers(e.target.value)} />
            </label>
            <label>
                Max. Players
                <input type="number" value={maxPlayers} placeholder="Type the maximum of players" onChange={e => setMaxPlayers(e.target.value)} />
            </label>
            <label>
                Average Duration (in min)
                <input type="text" value={duration} placeholder="Type the duration of the game" onChange={e => setDuration(e.target.value)} />
            </label>
            <label>
                Difficulty Level (out of 5)
                <select value={complexity} onChange={e => setComplexity(e.target.value)}>
                    <option value="">Select difficulty</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </label>
            <label>
                Category
                <input type="text" value={genre} placeholder="Set the Category" onChange={e => setGenre(e.target.value)} />
            </label>
            <label>
                Placement in Vestergade
                <input type="text" value={placementVestergade} placeholder="Type the Shelf Placement" onChange={e => setPlacementVestergade(e.target.value)} />
            </label>
            <label>
                Placement in Fredensgade
                <input type="text" value={placementFredensgade} placeholder="Type the Shelf Placement" onChange={e => setPlacementFredensgade(e.target.value)} />
            </label>
            <label>
                Placement in Aalborg
                <input type="text" value={placementAalborg} placeholder="Type the Shelf Placement" onChange={e => setPlacementAalborg(e.target.value)} />
            </label>
            <label>
                Placement in Kolding
                <input type="text" value={placementKolding} placeholder="Type the Shelf Placement" onChange={e => setPlacementKolding(e.target.value)} />
            </label>
            <p className="text-error">{errorMessage}</p>
            <button type="submit">Save</button>
        </form>
    );
}
