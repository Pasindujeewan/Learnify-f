import { useEffect } from "react";
import { verifyUser } from "../api/getUserProfile";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import StudentDashboard from "./StudentDashboard";
import type { StudentProfileType } from "../types/StudentType";
import type { instructorProfileType } from "../types/instructorType";

export function ProtectedDashboard() {
  const [user, setUser] = useState<
    StudentProfileType | instructorProfileType | null
  >(null);

  const navigate = useNavigate();
  useEffect(() => {
    const checkUser = async () => {
      const data = await verifyUser();
      if (!data) {
        navigate("/login", { replace: true });
      } else {
        setUser(data);
      }
    };
    checkUser();
  }, []);
  console.log(user);
  if (!user) {
    return <div className="p-6">Loading...</div>;
  }

  if (user.role === "instructor") {
    return <div className="p-6">Instructor Dashboard - {user.name}</div>;
  }

  return <StudentDashboard user={user} />;
}
