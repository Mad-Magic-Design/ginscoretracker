import { useContext, useEffect, useState } from "react";
import { userContext } from "../context/userContext";

function Total() {
    const { userDoc } = useContext(userContext)

    return (
        <div className="wrapper">
            <div className="container">
                <div className="section-container x-large-container">
                    <h1 className="gold-text">{userDoc.oneName}</h1>
                    <h4>Wins: {userDoc.totalWins[0]}</h4>
                    <h4> Total Score: {userDoc.totalScores[0]}</h4>
                    <h1 className="gold-text">{userDoc.twoName}</h1>
                    <h4>Wins: {userDoc.totalWins[1]}</h4>
                    <h4>Total Score: {userDoc.totalScores[1]}</h4>

                </div>

            </div>

        </div >
    );
}

export default Total;