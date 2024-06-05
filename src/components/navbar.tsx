// import Link to enable navigation
import { Link } from "react-router-dom";
// import auth  display username and image
import { auth } from "../config/firebase";
// import useAuthState to store the auth data in a state
import { useAuthState } from "react-firebase-hooks/auth"
// import signOut function from firebase to enable signing out
import { signOut } from "firebase/auth";

export const Navbar = () =>{
    // declare and populate auth variable
    const [user] = useAuthState(auth);
    const signUserOut = async () =>{
        await signOut(auth);
    }
    // return the html portion of the navbar
    // modify the display of options in respect to the login status
    // modify the sign in, sign out buttons based on login status
    return( <div className="navbar">
        <div className="links">
        <Link to="/">Home</Link>
        {!user ? <Link to="/login">Login</Link>: 
        <Link to="/createpost">Create Post</Link>
}
        {user && <Link to="/my-post">My Posts</Link>}
        </div>
        <div className="user">
       {user && ( 
        <>    
        <p>{auth.currentUser?.displayName}</p>
        <img src = {auth.currentUser?.photoURL || ""} width="40" height="40"/>
        <button onClick={signUserOut}>Log Out</button>
        </>
      )}
        </div>
    </div>
    )
}