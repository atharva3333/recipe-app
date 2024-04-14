import  Logo from "../assets/Logo.jpg"
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";

const Navigation = () => {

  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [user] = useAuthState(auth);

  const handleSignIn = event => {
		event.preventDefault();
		signInWithGoogle();
	};
  return (
    <div className="sm:px-10 px-auto py-5">
      <div className="flex justify-between bg-white items-center sm:px-10 px-4 rounded-full">
        <div className="flex items-center gap-1">
        
          <img src={Logo} alt="logo" className="w-[5%]"/>
          <h2 className="font-black text-xl">Magic Recipe&apos;s</h2>
        </div>
        <div className="flex items-center gap-8">
        <a href="/#recipes" className="list-none font-bold z-10">Recipes</a>
          {user && <>{user.displayName}</>}
          {!user && 
            <button onClick={handleSignIn} className="font-bold bg-blue-600 text-white px-5 py-2 rounded-full z-10">Login</button>
          }
          
          
        </div>
      </div>
    </div>
  )
}

export default Navigation