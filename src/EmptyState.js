import React from "react";
import "./EmptyState.css";

export default function EmptyState({ message }) {
    return (
        <div className="EmptyState">
            <div className="empty-emoji">🤷‍♀️</div>
            <p className="empty-message">{message}</p>
        </div>
    );
}