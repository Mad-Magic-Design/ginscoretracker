import React from 'react';
import Menu from './menu';
import Game from './game';
import { Routes, Route, Link, Outlet } from "react-router-dom";

function GinTracker() {
    return (
        <div>

            <Routes>
                <Route path='/' element={<Menu />} />
                <Route path='/play' element={<Game />} />
            </Routes>
        </div>
    );
}

export default GinTracker;