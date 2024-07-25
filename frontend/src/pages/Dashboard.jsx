import { useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export const Dashboard = (props) => {
  const [nav,setNav]=useState(false);
  function handleClick(){
    setNav(false);
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <Appbar nav={nav} setNav={setNav} />
      <Balance handleClick={handleClick} balance={props.balance} />
      <Users handleClick={handleClick} />
    </div>
  );
};
