import { Link } from "react-router-dom";
import LogIn from "./Login";
import { getAuth } from "firebase/auth";
import React, { useContext } from "react";
import { userContext } from "../context/userContext";


function Menu() {
    const menuOptions = [
        {
            id: 1,
            title: 'Start',
            path: '/play'
        },
        {
            id: 2,
            title: 'Input Game',
            path: '/input',
        },
        {
            id: 3,
            title: 'All Time',
            path: '/alltime'
        },
        {
            id: 4,
            title: 'Options',
            path: '/options'
        },
    ];

    const { currentUser } = useContext(userContext);
    
    const auth = getAuth();
    const logOut = async () => {
        auth.signOut().then(() => {
            console.log('logged out');
        })
    }

    return (
        <> {!currentUser && <LogIn />}
            {currentUser && <div className="wrapper">
                <div className="container">
                    {menuOptions.map((option) => 
                        (
                            <div key={option.id}>
                                <Link to={option.path}>
                                    <button className="menu-button"> {option.title}
                                    </button>
                                </Link>
                            </div>
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