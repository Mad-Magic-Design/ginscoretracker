import { useContext, useState } from "react";
import { userContext } from "../context/userContext";
import { useNavigate } from 'react-router-dom';

function Input() {
    const { userDoc, updateTotalStats } = useContext(userContext)
    const [formState, setFormState] = useState({
        playerOneScore: 0,
        playerTwoScore: 0,
        validScore: false,
    })


    const handleChange = e => {
        setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (e.target.value >= 100) {
            setFormState(prev => ({ ...prev, validScore: true }))
        }
    }

    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        const newScore = [+userDoc.totalScores[0] + +formState.playerOneScore, +userDoc.totalScores[1] + +formState.playerTwoScore];
        let wins;
        if (formState.playerOneScore >= 100) {
            wins = [+userDoc.totalWins[0] + +1, userDoc.totalWins[1]]
        }
        else {
            wins = [userDoc.totalWins[0], +userDoc.totalWins[1] + +1]
        }

        updateTotalStats(newScore, wins);
        navigate('/')
    }

    return (
        <div className="wrapper">
            <div className="container x-large-container">
                <div  >

                    <form className="section-container x-large-container" onSubmit={handleSubmit}>
                        <label className="big-gold" htmlFor="playerOneInput">{userDoc.oneName} Score</label>
                        <input className="score-input" type="text" id="playerOneInput" value={formState.playerOneScore} onChange={handleChange} name='playerOneScore' />
                        <label className="big-gold" htmlFor="playerTwoInput">{userDoc.twoName} Score</label>
                        <input className="score-input" type="text" id="playerTwoInput" value={formState.playerTwoScore} onChange={handleChange} name='playerTwoScore' />
                        {formState.validScore && <button className='menu-button' type="submit">Submit</button>}

                    </form>

                </div>
            </div>
        </div>
    );
}

export default Input;