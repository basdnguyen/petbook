import { createContext } from "react";

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export interface AppState {
  user?: User;
  setUser: (user: User) => void;
}

export const AppContext = createContext<AppState>({
  user: undefined,
  setUser: () => {},
});