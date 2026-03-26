import { useEffect } from "react";
import { verifyUser } from "../api/verifyUser";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { UserForm } from "../types/UserType";

export function ProtectedDashboard() {
  const [user, setUser] = useState<UserForm>();

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
  return <div>{}</div>;
}
