import React from 'react';
import Menu from './menu';
import Game from './game';
import Total from './total'
import Input from './input';
import Options from './options';
import { Routes, Route, Link, Outlet } from "react-router-dom";
import TopDecoration from './topDecoration';
import CardBack from '../Imgs/Card_Back-01.svg'
//import * as SuitsDancing from '../Imgs/Suits_Dancing.json'
//import Lottie from 'react-lottie';

function GinTracker() {


    return (
        <div className='page page-height'>
            <img className='card-back page-height' src={CardBack} alt="Card Background Decoration" />


            <Routes>
                <Route path='/' element={<Menu />} />
                <Route path='/play' element={<Game />} />
                <Route path='/options' element={<Options />} />
                <Route path='/alltime' element={<Total />} />
                <Route path='/input' element={<Input />} />
            </Routes>
        </div>
    );
}

export default GinTracker;

/*
    const defaultLottieOptions = {
        loop: true,
        autoplay: true,
        animationData: SuitsDancing,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        },

    };

<div className='suit-dancing' >
                <Lottie options={defaultLottieOptions}
                    height={90}
                    width={200}
                    isClickToPauseDisabled
                />
            </div>*/