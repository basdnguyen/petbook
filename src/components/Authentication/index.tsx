import { FC, PropsWithChildren, useContext, useEffect } from "react";
import { AppContext } from "../AppContext";
import axios from "axios";

export const Authentication: FC<PropsWithChildren> = ({ children }) => {
  const { setUser , jwt, setJwt } = useContext(AppContext);
  useEffect(() => {
    const jwtFromStorage = localStorage.getItem('jwt');
    if (jwtFromStorage) {
      setJwt(jwtFromStorage);
    } else {
      setUser(null);
    }
  }, []);

  async function getMeUser() {
    const { data } = await axios.get('/api/me', {
      headers: {
        Authorization: `Bearer ${jwt}`,
      }
    }); 
    setUser(data);
  }

  useEffect(() => {
    if (jwt) {
      getMeUser();
    }
  }, [jwt]);
  return children;
}