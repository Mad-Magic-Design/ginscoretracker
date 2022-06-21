import { useContext, useEffect, useState } from "react";
import { userContext } from "../context/userContext";
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import * as SuitsFalling from '../Imgs/Suits_Falling.json'


function Game() {
    const { updateGameScore, userDoc, updateTotalStats } = useContext(userContext)

    const [score, setScore] = useState([0, 0]);
    const [handValue, setHandValue] = useState('');
    const [winner, setWinner] = useState();
    const [gameOver, setGameOver] = useState(false);
    const [formAtr, setFormAtr] = useState({
        scoreEntered: false,
        winnerSelected: false,
    })

    const [newScore, setNewScore] = useState({
        i: 0,
        score: 0,
        showScore: false,
    })
    const [playFalling, setPlayFalling] = useState(false)




    useEffect(() => {
        updateGameScore(score);
        if (score[0] >= 100 || score[1] >= 100) {
            setGameOver(true);
        }
    }, [score])

    const handleSubmit = e => {
        e.preventDefault();
        console.log(e);
        if (winner == 1) {
            setScore(prev => [+prev[0] + +handValue, prev[1]]);
        }
        if (winner == 2) {
            setScore(prev => [prev[0], +prev[1] + +handValue]);
        }
    }

    /* const handleChange = e => {
         setHandValue(e.target.value);
         setFormAtr(prev => ({ ...prev, scoreEntered: true }))
     }*/

    const handleWinnerChange = e => {
        setWinner(e.target.value);
        console.log(e.target.value);
    }

    const navigate = useNavigate();

    const submitGame = () => {
        const newScore = [+userDoc.totalScores[0] + +score[0], +userDoc.totalScores[1] + +score[1]];
        let wins;
        if (score[0] >= 100) {
            wins = [+userDoc.totalWins[0] + +1, userDoc.totalWins[1]]
        }
        else {
            wins = [userDoc.totalWins[0], +userDoc.totalWins[1] + +1]
        }

        updateTotalStats(newScore, wins);
        navigate('/')

    }

    const scoreHand = (i) => {
        let winnerName
        console.log()
        if (i === 0) winnerName = userDoc.oneName
        if (i === 1) winnerName = userDoc.twoName

        setNewScore({
            name: winnerName,
            i: i,
            score: "",
            showScore: true
        })

    }

    const handleChange = (e) => {
        setNewScore(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmitHand = () => {
        setNewScore(prev => ({ ...prev, showScore: false }))
        const scoreHolder = [...score]
        scoreHolder[newScore.i] = +scoreHolder[newScore.i] + +newScore.score
        setScore(scoreHolder)
        setPlayFalling(true)
        setTimeout(() => {
            setPlayFalling(false)
        }, 3000);
    }

    const defaultLottieOptions = {
        loop: false,
        autoplay: true,
        animationData: SuitsFalling,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        },

    };

    return (
        <div className="wrapper">
            <div className="container">
                {playFalling && <div className='suit-falling page-height' >
                    <Lottie options={defaultLottieOptions}
                        height={400}
                        width={400}
                        isClickToPauseDisabled
                    />
                </div>}
                <div >
                    <div onClick={() => scoreHand(0)} className="section-container">
                        <div className="Name-Container"><h4>{userDoc.oneName}</h4></div>
                    </div>
                    <div className="section-container">
                        <div className="score-container" id="playerOneScore">
                            <div style={{ width: `${(score[0] * .9) + 10}%` }} className="score-bar">
                                <div>
                                    <p className='score-display'>{score[0]}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => scoreHand(1)} className="section-container">
                        <div className="Name-Container"><h4>{userDoc.twoName}</h4></div>
                    </div>
                    <div className="section-container">
                        <div className="score-container" id="playeTwoScore">
                            <div style={{ width: `${(score[1] * .9) + 10}%` }} className="score-bar">
                                <div className='score-display' >
                                    {score[1]}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {newScore.showScore && <div className="section-container container-upper-fixed">
                    <h4>{newScore.name} Scored:</h4>
                    <br />
                    <label htmlFor="scoreInput"></label>
                    <input type="text" id="scoreInput" name="score" value={newScore.score} onChange={handleChange} placeholder="?" className="score-input" autoComplete="off" />
                    <br />
                    <button disabled={(newScore.score === '') ? true : false} className="score-button" onClick={handleSubmitHand}>score</button>

                </div>}

                {gameOver &&
                    <div className="section-container container-middle-fixed large-container">
                        {score[0] >= 100 && <h1 className="big-gold"> {userDoc.oneName} Wins! </h1>}
                        {score[1] >= 100 && <h1 className="big-gold" > {userDoc.twoName} Wins! </h1>}
                        <button className="end-button" onClick={submitGame}>End Game</button>
                    </div>

                }

            </div >
        </div >

    );
}

export default Game;

/*< div className="section-container" >
                    <h4 className="Header-Text">Gin Rummy</h4>
                </div >
                
                  <div className="section-container">
                    <form className="score-form" onSubmit={handleSubmit} autoComplete="off">
                        <label htmlFor="scoreInput"></label>
                        <input type="text" id="scoreInput" value={handValue} onChange={handleChange} placeholder="SCORE" className="score-input" />

                        {formAtr.scoreEntered && <div className="winner-select-container">
                            <p>WINNER:</p>
                            <div className="switch-field">
                                <label htmlFor="p1">Yes</label>
                                <input id='p1' type="radio" name='winner' value='1' onChange={handleWinnerChange} className="winner-button" />

                                <label htmlFor="p2">No</label>
                                <input id='p2' type="radio" name='winner' value='2' onChange={handleWinnerChange} className="winner-button" />
                            </div>
                        </div>}

                        {formAtr.winnerSelected && <div className="submit-container">
                            <button type="submit">Submit</button>
                        </div>}


                    </form>
                </div>
                
                
                
                
                */