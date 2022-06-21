import React from 'react';
import { Link } from "react-router-dom";

function TopDecoration() {
    return (
        <Link to="/" className="top-decoration">
            <div className="top-decoration">
                &#9824;
                &#9825;
                &#9826;
                &#9827;
            </div>
        </Link>
    )
}

export default TopDecoration;