import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase.config";
const LoginPopup = () => {

    // const [user, loading, error] = useAuthState(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);


  const handleSignIn = event => {
		event.preventDefault();
		signInWithGoogle();
	};
  return (
    <div className=" max-[300px] bg-green-800 rounded-lg py-20">
      <h2 className="text-white font-black text-3xl">Sign In using google to save your recipe&apos;s</h2>
      <button onClick={handleSignIn} className="bg-white py-3 px-6 rounded-full mt-10 font-bold">Sign up</button>
    </div>
  )
}

export default LoginPopup