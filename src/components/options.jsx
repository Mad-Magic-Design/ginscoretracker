import { useContext, useEffect, useState } from "react";
import { userContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

function Options() {
    const { updatePlayerNames, userDoc } = useContext(userContext);
    const [playerNames, setPlayerNames] = useState({ playerOneName: 'Player One Name', playerTwoName: 'Player Two Name' });


    

    useEffect(() => {
        setPlayerNames({ playerOneName: userDoc.oneName, playerTwoName: userDoc.twoName });
    }, []);

    const navigate = useNavigate()

    const submitNewNames = (e) => {
        e.preventDefault();
        updatePlayerNames(playerNames.playerOneName, playerNames.playerTwoName,)
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