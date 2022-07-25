import React from 'react';
import { Routes, Route} from "react-router-dom";
import Menu from './Menu';
import Game from './Game';
import Total from './Total'
import Input from './Input';
import Options from './Options';
import CardBack from '../Imgs/Card_Back-01.svg'


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

