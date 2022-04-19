import React, { useState } from "react";
import { createApi } from "unsplash-js";

const unsplash = new createApi({
    accessKey: process.env.REACT_APP_ACCESS_KEY,
});


export default function SearchPhotos() {
    const [query, setQuery] = useState("");
    const [pics, setPics] = useState([]);

    const searchPhotos = async (e) => {
        e.preventDefault();
        unsplash.search
            .getPhotos({ query: query, per_page: 20 })
            .then((json) => { setPics(json.response.results) })
    };

    return (
        <>
            <form className="form" onSubmit={searchPhotos}>
                <label className="label" htmlFor="query">
                    {" "}
                    📷
                </label>
                <input
                    type="text"
                    name="query"
                    className="input"
                    placeholder={`Try "dog" or "apple"`}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="button">
                    Search
                </button>
            </form>
            <div className="card-list">
                {pics.map((pic) => <div className="card" key={pic.id}>
                    <img
                        className="card--image"
                        alt={pic.alt_description}
                        src={pic.urls.small}
                        width="50%"
                        heigh="50%"
                    ></img>
                </div>)}
            </div>
        </>
    );
}