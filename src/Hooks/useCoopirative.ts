import axios from "axios";
import { useContext } from "react";
import { CoopContext } from "../Context/CooperativeContext";

function useCooperative() {
  const { dispatch } = useContext(CoopContext);
  const getCooperative = () => {
    axios.get("/api/cooperative/dashbord/").then((res) => {
      dispatch({ type: "SET_COOP", payload: res.data });
    });
  };
  const logoutCooperative = () => {
    dispatch({ type: "CLEAR_COOP" });
  };
  return { getCooperative, logoutCooperative };
}

export default useCooperative;
