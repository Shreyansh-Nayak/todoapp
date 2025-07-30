// Login.js
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useAuth } from "./Authcontext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/todo"); // 👈 Redirect after login
    } catch (error) {
      console.error("Login Error", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="p-4 flex justify-end items-center gap-4">
      {user ? (
        <>
          <span>Welcome, {user.displayName}</span>
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded text-white">Logout</button>
        </>
      ) : (
        <button onClick={handleLogin} className="bg-green-500 px-3 py-1 rounded text-white">Login with Google</button>
      )}
    </div>
  );
};

export default Login;
