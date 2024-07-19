// import { InputBox } from "../components/InputBox";
// import { ButtonComponent } from "../components/ButtonComponent";
// import { useSearchParams } from "react-router-dom";
// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";


// export const SendMoney = (props) => {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const id = searchParams.get("id");
//   const name = searchParams.get("name");

//   const [amount, setAmount] = useState(0);

//   return (
//     <div className="bg-slate-300 flex flex-col justify-center items-center h-screen">
//       <div className="bg-white w-1/3 flex flex-col justify-center items-center rounded-md py-10">
//         <div className="text-4xl font-extrabold pb-5">Send Money</div>
//         <div className="flex items-center  my-5">
//           <div className="rounded-full flex justify-center items-center cursor-pointer bg-slate-200 h-11 w-11">
//             <div className="text-xl font-medium"> {name[0]}</div>
//           </div>
//           <div className="pl-4 font-bold text-2xl">{name}</div>
//         </div>
//         <InputBox
//           onChange={(e) => {
//             setAmount(e.target.value);
//           }}
//           title={"Amount (in Rs)"}
//           placeholder={"Enter amount"}
//           type={"number"}
//         />
//         <ButtonComponent
//           onClick={() => {
//             axios.post(
//               "http://localhost:3000/api/v1/account/transfer",
//               {
//                 to: id,
//                 amount,
//               },
//               {
//                 headers: {
//                   Authorization: "Bearer " + localStorage.getItem("token"),
//                 },
//               }
//             );
//             navigate("/dashboard");

//           }}
//           text={"Initiate Transfer"}
//         />
//       </div>
//     </div>
//   );
// };

import { InputBox } from "../components/InputBox";
import { ButtonComponent } from "../components/ButtonComponent";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const SendMoney = (props) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  const [amount, setAmount] = useState(0);
  const [transferStatus, setTransferStatus] = useState(null); // State to track the request status
  const [error, setError] = useState(null); // State to track any errors

  // Effect to handle side effects after transfer status changes
  useEffect(() => {
    if (transferStatus === "success") {
      // Handle success case, e.g., show a success message
      async function balance(){
        const data=await axios.get("http://localhost:3000/api/v1/account/balance",{
          headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        props.setBalance(data.data.balance);
      }
      balance();
      navigate("/dashboard");
    } else if (transferStatus === "error") {
      // Handle error case, e.g., show an error message
      console.log("Transfer failed:", error);
    }
  }, [transferStatus, error, navigate]);

  const handleTransfer = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          to: id,
          amount,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setTransferStatus("success"); // Update status to success
    } catch (err) {
      setError(err.message); // Update error state
      setTransferStatus("error"); // Update status to error
    }
  };

  return (
    <div className="bg-slate-700 flex flex-col justify-center items-center h-screen">
      <div className="bg-slate-400 w-1/3 flex flex-col justify-center items-center rounded-md py-10">
        <div className="text-4xl font-extrabold pb-5">Transfer Money</div>
        <div className="flex items-center  my-5">
          <div className="rounded-full flex justify-center items-center cursor-pointer bg-slate-200 h-11 w-11">
            <div className="text-xl font-medium"> {name[0]}</div>
          </div>
          <div className="pl-4 font-bold text-2xl">Paying {name}</div>
        </div>
        <InputBox
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          placeholder={"Enter amount"}
          type={"number"}
        />
        <ButtonComponent
          onClick={handleTransfer} // Use the handler function
          text={"Pay"}
        />
        {error && <div>Insufficient funds</div>}
      </div>
    </div>
  );
};

