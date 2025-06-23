import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import PropertyCard from "./Components/PropertyCard";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import { useSelector } from "react-redux";
import useGetCurrentUser from "./customHooks/useGetCurrentUser";

function App() {
  useGetCurrentUser()
const {user,loading}=useSelector(state=> state?.auth)

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={user? <PropertyCard /> : <Navigate to='/login' /> } />
        <Route path="/signup" element={!user ? <SignUp/> : <Navigate to='/' />} />
        <Route path="/login" element={!user ? <Login/> : <Navigate to='/' /> } />
        <Route />
      </Routes>
    </>
  );
}

export default App;
