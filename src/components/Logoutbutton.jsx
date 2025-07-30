// components/LogoutButton.jsx
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../Authcontext";

const LogoutButton = () => {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (!user) return null;

  return (
    <div className="flex justify-end p-4">
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
