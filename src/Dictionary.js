import React, {useState} from "react";
import axios from "axios";
import Results from "./Results";
import Photos from "./Photos";
import "./Dictionary.css";

export default function Dictionary(props) {
    let [keyword, setKeyword] = useState(props.defaultKeyword);
    let [results, setResults] = useState(null);
    let [loaded, setLoaded] = useState(false);
    let [photos, setPhotos] = useState(null);
    let [error, setError] = useState(null);
    let [isLoading, setIsLoading] = useState(false);

    function handleDictionResponse(response) {
        console.log("API Response:", response.data[0]); 
        setResults(response.data[0]);
        setError(null);
        setIsLoading(false);
    }

    function handlePexelsResponse(response) {
        console.log("Pexels API Response:", response.data);
        setPhotos(response.data.photos);
    }

    function handleError(error) {
        console.error("API Error:", error);

        if(error.response && error.response.status === 404) {
            setError("🤷‍♀️ No definitions found for this word. Please try another one.");
        } else {
            setError("Sorry, there was an error fetching the data. Please try again ");
        }
        setResults(null);
        setPhotos(null);
        setIsLoading(false);
    }

    function search() {
        setIsLoading(true);

        //documentation: https://dictionaryapi.dev/
        let dictionaryUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;
        
        axios
        .get(dictionaryUrl)
        .then(handleDictionResponse)
        .catch(handleError);

        let pexelsApiKey =
        "563492ad6f91700001000001fdd29f0808df42bd90c33f42e128fa89";
        let pexelsApiUrl = `https://api.pexels.com/v1/search?query=${keyword}&per_page=9`;
        let headers = { Authorization: `${pexelsApiKey}` };
        axios
        .get(pexelsApiUrl, { headers: headers })
        .then(handlePexelsResponse)
        .catch(handleError);
    }

    function handleSubmit(event) {
        event.preventDefault();
        search();
    }

    function handleKeywordChange(event) {
        setKeyword(event.target.value);
    }

    function load() {
        setLoaded(true);
        search();
    }

    if (loaded) {
        return (
            <div className="Dictionary">
                <section>
                    <h1>What word do you want to look up?</h1>
                    <form onSubmit={handleSubmit}>
                    <input type="search" autoFocus={true} onChange={handleKeywordChange} defaultValue={props.defaultKeyword}/>
                    </form>
                    <div className="hint">
                        suggested words: snow, sunset, atom, date...
                    </div>
                </section>
                {error && <div className="error-message">{error}</div>}
                {isLoading && <div className="loader">Loading...</div>}
                {!isLoading && !error && <Results results={results} />}
                {!isLoading && !error && <Photos photos={photos} />}
            </div>
        );
    } else {
        load();
        return "Loading...";
    }
}