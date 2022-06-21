import { useContext, useEffect, useState } from "react";
import { userContext } from "../context/userContext";
import { getUserDoc, getUserDocRef } from "../utils/firebase";
import { updateDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";

function Options() {
    const { currentUser } = useContext(userContext);
    const [userInfo, setUserInfo] = useState([]);

    const [playerNames, setPlayerNames] = useState({ playerOneName: 'Player One Name', playerTwoName: 'Player Two Name' });


    useEffect(() => {
        const fetchUsers = async () => {
            const userDoc = await getUserDoc(currentUser);
            setUserInfo(userDoc);
            console.log('fetched');
        }

        fetchUsers();
    }, []);

    useEffect(() => {
        setPlayerNames({ playerOneName: userInfo.oneName, playerTwoName: userInfo.twoName });
    }, [userInfo]);

    const navigate = useNavigate()

    const submitNewNames = (e) => {
        e.preventDefault();
        const updateUserDoc = async () => {
            //move to userContext:
            const userDocRef = await getUserDocRef(currentUser);
            const updatedUserDoc = await updateDoc(userDocRef, {
                oneName: playerNames.playerOneName,
                twoName: playerNames.playerTwoName,
            });
        }
        updateUserDoc();
        navigate('/')
    }

    const handleChange = (e) => {
        setPlayerNames(values => ({ ...values, [e.target.name]: e.target.value }));
    }


    return (
        <div className="wrapper">
            <div className="container">
                <form className="section-container option" onSubmit={submitNewNames}>
                    <label htmlFor="playerOneNameInput">Player One Name</label>
                    <input className='name-input' type="text" id="playerOneNameInput" value={playerNames.playerOneName} onChange={handleChange} name='playerOneName' />
                    <label htmlFor="playerTwoNameInput">Player Two Name</label>
                    <input className='name-input' type="text" id="playerTwoNameInput" value={playerNames.playerTwoName} onChange={handleChange} name='playerTwoName' />
                    <button type="submit">Submit</button>
                </form>

            </div>
        </div>

    );
}

export default Options;