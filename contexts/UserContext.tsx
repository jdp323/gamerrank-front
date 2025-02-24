import Spinner from "@/atoms/spinner";
import { API, IUser } from "@/services/api";
import { Flex } from "@chakra-ui/react";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export interface IUserContext {
  user: IUser | null;
  refetch: () => void;
}

const UserContext = createContext<IUserContext>({
  user: null,
  refetch: () => {},
});

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<IUserContext["user"]>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      setUser(null);
      return;
    }
    API.fetchCurrentUser()
      .then((user) => {
        console.log(user);
        setUser(user);
      })
      .catch((er) => {
        setUser(null);
        console.error(er);
        localStorage.removeItem("token"); // remove token from storage to avoid dead refetching
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <Flex
        w="100%"
        h="100vh"
        justify={"center"}
        align={"center"}
        style={{ background: "rgb(246, 246, 239)" }}
      >
        <Spinner />
      </Flex>
    );
  }

  return (
    <UserContext.Provider value={{ user: user, refetch: fetchUser }}>
      {children}
    </UserContext.Provider>
  );
}
export function useUser() {
  const user = useContext(UserContext);
  return user;
}
