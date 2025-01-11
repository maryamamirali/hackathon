import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import {auth,} from "../config/firebase"


export default function SignUp() {

function googleLogin() {

const provider = new GoogleAuthProvider();
signInWithPopup(auth, provider).then(async(result) => {
console.log(result);

if(result.user) {

console.log("user logged in successfully");

window.location.href = "/";
}
})

}

async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }


return <>
<div class="extras">

    <a onClick={googleLogin}>Signin with Google</a>
<span>|</span>
    <a onClick={handleLogout} >Logout</a>
</div>
</>
}

