import React from "react";
import "./Synonyms.css";

export default function Synonyms(props) {
    console.log("Synonyms received:", props.synonyms);

    if (props.synonyms && props.synonyms.length > 0) {
        return (
            <div className="Synonyms">
                <strong>Synonyms: </strong>
                <ul>
                    {props.synonyms.map(function(synonym, index) {
                    return (
                        <li key={index}>{synonym}</li>
                        );
                    })}
                </ul>
            </div>
        );
    } else {
        return null;
    }
}