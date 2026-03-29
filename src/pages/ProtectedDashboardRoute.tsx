import { useEffect } from "react";
import { verifyUser } from "../api/verifyUser";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { UserDbType } from "../types/UserType";

export function ProtectedDashboard() {
  const [user, setUser] = useState<UserDbType>();

  const navigate = useNavigate();
  useEffect(() => {
    const checkUser = async () => {
      const data = await verifyUser();
      console.log("infinite");
      if (!data) {
        navigate("/login");
      } else {
        setUser(data);
      }
    };
    checkUser();
  }, []);
  console.log(user);
  return <div>{user}</div>;
}
