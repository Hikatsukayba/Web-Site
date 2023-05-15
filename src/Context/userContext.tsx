import { createContext, useReducer } from "react";

const initialState: UserState = {
  user: null,
};

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "CLEAR_USER":
      return { ...state, user: null };
    default:
      return state;
  }
};

export const UserContext = createContext<UserContextType>({
  state: initialState,
  dispatch: () => {},
});

export const UserProvider= (props:any) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};
