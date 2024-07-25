import { Heading } from "../components/Heading";
import { Subheading } from "../components/Subheading";
import { InputBox } from "../components/InputBox";
import { ButtonComponent } from "../components/ButtonComponent";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [warning,setWarning]=useState("");

  const navigate = useNavigate();

  return (
    <div className="bg-slate-700 flex justify-center items-center w-full h-screen">
      <div className="flex flex-col bg-slate-400 w-1/4 justify-center items-center rounded-md py-5">
        <Heading heading={"PayFlow"} />
        <Subheading text={"Sign up to control money using PayFlow"} />
        <InputBox
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          title={"First Name"}
          placeholder={"John"}
          type={"text"}
          value={firstName}
        />
        <InputBox
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          title={"Last Name"}
          placeholder={"Doe"}
          type={"text"}
          value={lastName}
        />
        <InputBox
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          title={"Email"}
          placeholder={"user@email.com"}
          type={"email"}
          value={username}
        />
        <InputBox
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          title={"Password"}
          placeholder={"password"}
          type={"password"}
          value={password}
        />
        <ButtonComponent
          onClick={async () => {
            try {
              const response = await axios.post(
                "http://localhost:3000/api/v1/user/signup",
                {
                  username,
                  password,
                  firstName,
                  lastName,
                }
              );
              localStorage.setItem("token", response.data.token);
              setWarning("");
              navigate("/signin")
            } catch (error) {
              setWarning(error.response.data.message);
              setFirstName("");setLastName("");setUsername("");setPassword("");
            }
          }}
          text={"Sign up"}
        />
        <BottomWarning
          label={"Have an account?"}
          buttonText={"Sign in"}
          to={"/signin"}
        />
        {warning && <div className="bg-red-400 rounded-md p-2 mt-2">{warning}</div>}
      </div>
    </div>
  );
};
