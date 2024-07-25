import { Heading } from "../components/Heading";
import { Subheading } from "../components/Subheading";
import { InputBox } from "../components/InputBox";
import { ButtonComponent } from "../components/ButtonComponent";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const Signin = ({setToken}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [warning,setWarning]= useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-slate-700 flex justify-center items-center w-full h-screen">
      <div className="flex flex-col bg-slate-400 w-1/4 justify-center items-center rounded-md py-5">
        <Heading heading={"PayFlow"} />
        <InputBox
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          title={"Email"}
          placeholder={"user@email.com"}
          type={"email"}
        />
        <InputBox
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          title={"Password"}
          placeholder={"password"}
          type={"password"}
        />
        <ButtonComponent
          onClick={async () => {
            try {
              const response = await axios.post(
                "http://localhost:3000/api/v1/user/signin",
                {
                  username,
                  password,
                }
              );
              localStorage.setItem("token", response.data.token);
              setToken(response.data.token);
              setUsername("");setPassword("");
              navigate("/dashboard");
            } catch (error) {
              setWarning(error.response.data.message);
            }
          }}
          text={"Log in"}
        />
        <BottomWarning
          label={"Don't have an account?"}
          buttonText={"Sign up"}
          to={"/signup"}
        />
        {warning && <div className="bg-red-400 rounded-md p-2 mt-2">{warning}</div>}
      </div>
    </div>
  );
};
