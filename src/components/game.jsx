import React from 'react'
import { useContext, useEffect, useState } from "react";
import { userContext } from "../context/userContext";
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import * as SuitsFalling from '../Imgs/Suits_Falling.json'



export default function Game() {
    const { updateGameScore, userDoc, updateTotalStats } = useContext(userContext)

    const [score, setScore] = useState([0, 0]);
    const [gameOver, setGameOver] = useState(false);
    const [newScore, setNewScore] = useState({
        playerName:'',
        i: 0,
        score: '',
        showScore: false,
    })
    const [playFalling, setPlayFalling] = useState(false)

    useEffect(() => {
        updateGameScore(score);
        if (score[0] >= 100 || score[1] >= 100) {
            setGameOver(true);
        }
    }, [score])


    const navigate = useNavigate();

    const submitGame = () => {
        const newScore = [userDoc.totalScores[0] + score[0], userDoc.totalScores[1] + score[1]];
        let wins;
        if (score[0] >= 100) {
            wins = [userDoc.totalWins[0] + 1, userDoc.totalWins[1]]
        }
        else {
            wins = [userDoc.totalWins[0], +userDoc.totalWins[1] + 1]
        }

        updateTotalStats(newScore, wins);
        navigate('/')

    }

    const scoreHand = (i) => {
        let winnerName
        if (i === 0) winnerName = userDoc.oneName
        if (i === 1) winnerName = userDoc.twoName

        setNewScore({
            playerName: winnerName,
            i: i,
            score: '',
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

                {playFalling && <div aria-label='Scoring Animation' className='suit-falling page-height' >
                    <Lottie options={defaultLottieOptions}
                        height={400}
                        width={400}
                        isClickToPauseDisabled
                    />
                </div>}
                
                
                <>
                    <div onClick={() => scoreHand(0)} className="section-container">
                        <div className="Name-Container"><h2>{userDoc.oneName}</h2></div>
                    </div>
                    <div className="section-container">
                        <div className="score-container" id="playerOneScore">
                            <div style={{ width: `${(score[0] * .9) + 10}%` }} className="score-bar">
                                <div aria-label='Player One Score'>
                                    <p className='score-display'>{score[0]}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => scoreHand(1)} className="section-container">
                        <div className="Name-Container"><h2>{userDoc.twoName}</h2></div>
                    </div>
                    <div className="section-container">
                        <div className="score-container" id="playeTwoScore">
                            <div style={{ width: `${(score[1] * .9) + 10}%` }} className="score-bar">
                                <div aria-label='Player Two Score'  >
                                    <p className='score-display'>{score[1]}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                
                
                {newScore.showScore && <div className="section-container container-upper-fixed">
                    <h4>{newScore.playerName} Scored:</h4>
                    <br />
                    <label htmlFor="scoreInput"></label>
                    <input type="text" id="scoreInput" name="score" value={newScore.score} onChange={handleChange} placeholder="?" className="score-input" autoComplete="off" />
                    <br />
                    <button aria-label='Submit Hand Score' disabled={(newScore.score === '') ? true : false} className="score-button" onClick={handleSubmitHand}>score</button>

                </div>}

                
                {gameOver &&
                    <div className="section-container container-middle-fixed large-container">
                        {score[0] >= 100 && <h1 className="gold-text"> {userDoc.oneName} Wins! </h1>}
                        {score[1] >= 100 && <h1 className="gold-text" > {userDoc.twoName} Wins! </h1>}
                        <button className="end-button" onClick={submitGame}>End Game</button>
                    </div>

                }

            </div >
        </div >

    );
}