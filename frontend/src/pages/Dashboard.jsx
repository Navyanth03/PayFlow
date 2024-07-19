import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export const Dashboard = (props) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Appbar />
      <Balance balance={props.balance} />
      <Users />
    </div>
  );
};
