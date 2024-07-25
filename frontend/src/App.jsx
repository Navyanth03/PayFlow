import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import { useEffect, useState } from "react";

function App() {
  const [balance,setBalance]=useState(0);
  const [token,setToken]=useState(localStorage.getItem('token'));
  useEffect(()=>{
    async function balance(){
      const data=await axios.get("http://localhost:3000/api/v1/account/balance",{
        headers:{
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      setBalance(data.data.balance);
    }
    // if(localStorage.getItem('token'))balance();
    if(token)balance();
  },[token])
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin setToken={setToken} />} />
          {localStorage.getItem('token') && <Route path="/dashboard" element={<Dashboard balance={balance} />} />}
          {localStorage.getItem('token') && <Route path="/send" element={<SendMoney setBalance={setBalance} />} />}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
