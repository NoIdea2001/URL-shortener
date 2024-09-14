import { useNavigate } from "react-router-dom";

function LogoutButton({setToken,setAuthenticated}) {
  const Navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token")
    setToken(null)
    localStorage.removeItem("loggedInUser");
    setAuthenticated(false)
    setTimeout(() => {
      Navigate("/home");
    }, 1000);
  };

  return (
    <button
      className="fixed top-0 right-20 m-4 mr-20 bg-green-700 hover:bg-green-800 text-white font-medium rounded-lg px-5 py-2.5 focus:outline-none focus:ring-4 focus:ring-green-300"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default LogoutButton;
