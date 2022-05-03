import { Link } from "react-router-dom";
import LogIn from "./login-in";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";


function Menu() {
    const menuOptions = [
        {
            id: 1,
            title: 'Start',
            path: '/play'
        },
        {
            id: 2,
            title: 'Continue',
            path: '/continue',
        },
        {
            id: 3,
            title: 'Input Game',
            path: '/input',
        },
        {
            id: 4,
            title: 'View History',
            path: '/history'
        }
    ];

    const [userID, setUserID] = useState(null);
    const auth = getAuth();
    const user = auth.currentUser;
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserID(user.id);
            } else {
                setUserID(null);
            }
        });
        // console.log(currentUser);
    }, [userID]);


    const logOut = async () => {
        auth.signOut().then(() => {
            console.log('logged out');
        })
    }

    return (
        <> {!user && <LogIn />}
            {user && <div className="menu-container">
                {menuOptions.map(
                    (option) => (
                        <Link key={option.id} to={option.path}> {option.title} </Link>
                    )
                )}
                {user &&
                    <button onClick={logOut}>Log Out</button>
                }

            </div >}
        </>
    );
}

export default Menu;