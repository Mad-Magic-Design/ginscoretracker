import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, getUserDoc, getUserDocRef } from "../utils/firebase";
import { updateDoc } from 'firebase/firestore';

export const userContext = createContext({
    setCurrentUser: () => null,
    currentUser: null,
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const [userDoc, setUserDoc] = useState(null);



    useEffect(() => {
        const unsunsubscribe = onAuthStateChangedListener((user) => {
            setCurrentUser(user);
        });
        return unsunsubscribe
    }, [])

    useEffect(() => {
        fetchUser();
    }, [currentUser])

    const fetchUser = async () => {
        const retrievedUserDoc = await getUserDoc(currentUser);
        setUserDoc(retrievedUserDoc);
    }

    const updatePlayerNames = async (playerOneName, playerTwoName) => {

        const userDocRef = await getUserDocRef(currentUser);
        await updateDoc(userDocRef, {
            oneName: playerOneName,
            twoName: playerTwoName,
        });
    }

    const updateGameScore = async (gameScore) => {
        const userDocRef = await getUserDocRef(currentUser);
        await updateDoc(userDocRef, {
            currentGame: gameScore,
        });
    }

    const updateTotalStats = async (scores, wins) => {
        const userDocRef = await getUserDocRef(currentUser);
        await updateDoc(userDocRef, {
            totalScores: scores,
            totalWins: wins,
        });
        fetchUser();
    }


    const value = { currentUser, setCurrentUser, userDoc, fetchUser, updateGameScore, updateTotalStats };
    return (
        <userContext.Provider value={value}>
            {children}
        </userContext.Provider>
    );
}