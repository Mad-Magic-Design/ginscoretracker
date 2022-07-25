import { signInWithGooglePopup, createUserDocumentFromAuth } from "../utils/firebase";

function LogIn() {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }
    return (
        <div className="wrapper">
            <div className="container section-container x-large-container">
                <h1 className="gold-text" >Gin Score <br/>Tracker</h1>
                <button className="log-in-button" onClick={logGoogleUser}>Log In</button>
                <h1 className="gold-text">with your <br/> gmail</h1>
            </div>
        </div>
    );
}

export default LogIn;
