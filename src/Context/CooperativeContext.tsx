import { createContext, useReducer } from "react";

const initialState: CoopState = {
  Cooperative: null,
};

const coopReducer = (account: CoopState, action: CoopAction): CoopState => {
  switch (action.type) {
    case "SET_COOP":
      return { ...account, Cooperative: action.payload };
    case "CLEAR_COOP":
      return { ...account, Cooperative: null };
    default:
      return account;
  }
};

export const CoopContext = createContext<CoopContextType>({
  account: initialState,
  dispatch: () => {},
});

export const CoopProvider = (props: any) => {
  const [account, dispatch] = useReducer(coopReducer, initialState);

  return (
    <CoopContext.Provider value={{ account, dispatch }}>
      {props.children}
    </CoopContext.Provider>
  );
};
