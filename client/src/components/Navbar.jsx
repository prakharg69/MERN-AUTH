import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/Appcontext";
import axios from "axios";
import { toast } from "react-toastify";

function NavBar() {
  const navigate = useNavigate();
  const {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
  } = useContext(AppContext);

  const logout = async ()=>{
    try {
      axios.defaults.withCredentials = true;
      const {data} = await axios.post(backendUrl+'/api/auth/logout');
      data.success && setIsLoggedIn(false);
      data.success && setUserData(false);
      toast.success('Logedout');
      navigate('/')
    } catch (error) {
        toast.error(error.message);

    }
  }

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <img src={assets.logo} alt="" className="w-28 sm:w-32" />
      {userData ?<div className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group">
  {userData.name[0].toUpperCase()}

<div className="absolute hidden group-hover:block top-8 right-0 z-10 bg-white text-black rounded shadow p-2 min-w-max">
  <ul>
    {!userData.isAccountVerified && (<li className="cursor-pointer hover:bg-gray-100 p-1 rounded whitespace-nowrap">Verify Email</li>)}
    
    <li onClick={logout} className="cursor-pointer hover:bg-gray-100 p-1 rounded">Logout</li>
  </ul>
</div>

</div>
 : <button
        onClick={() => {
          navigate("/login");
        }}
        className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all"
      >
        Login
        <img src={assets.arrow_icon} alt="" />{" "}
      </button>}
     
    </div>
  );
}

export default NavBar;
