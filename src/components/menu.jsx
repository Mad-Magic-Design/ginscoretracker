import { Link } from "react-router-dom";
import LogIn from "./login-in";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState, useContext } from "react";
import { userContext } from "../context/userContext";


function Menu() {
    const menuOptions = [
        {
            id: 1,
            title: 'Start',
            path: '/play'
        },
        /*  {
              id: 2,
              title: 'Continue',
              path: '/continue',
          },*/
        {
            id: 3,
            title: 'Input Game',
            path: '/input',
        },
        {
            id: 4,
            title: 'All Time',
            path: '/alltime'
        },
        {
            id: 5,
            title: 'Options',
            path: '/options'
        },
    ];

    const { currentUser } = useContext(userContext);
    const auth = getAuth();
    // const user = auth.currentUser;


    const logOut = async () => {
        auth.signOut().then(() => {
            console.log('logged out');
        })
    }

    console.log(currentUser);
    return (
        <> {!currentUser && <LogIn />}
            {currentUser && <div className="wrapper">
                <div className="container">
                    {menuOptions.map(
                        (option) => (
                            <div key={option.id}><Link to={option.path}>
                                <button className="menu-button"> {option.title}
                                </button>
                            </Link></div>

                        )
                    )}
                    {currentUser &&

                        <button className="menu-button" onClick={logOut}>Log Out</button>

                    }

                </div >
            </div>}
        </>
    );
}

export default Menu;