import { createContext } from "react";

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export interface AppState {
  user: User | null;
  setUser: (user: User | null) => void;
  jwt: string | null;
  setJwt: (jwt: string | null) => void;
}

export const AppContext = createContext<AppState>({
  user: null,
  setUser: () => {},
  jwt: null,
  setJwt: () => {},
});