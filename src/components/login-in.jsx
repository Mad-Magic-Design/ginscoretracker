import { async } from "@firebase/util";
import { signInWithGooglePopup, createUserDocumentFromAuth } from "../utils/firebase";

function LogIn() {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }
    return (
        <div className="wrapper">
            <div className="container">
                <button className="log-in-button" onClick={logGoogleUser}>Log In With Google</button>
            </div>
        </div>
    );
}

export default LogIn;
