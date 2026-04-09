import { useEffect } from "react";
import { verifyUser } from "../api/getUserProfile";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import StudentDashboard from "./StudentDashboard";
import type { StudentProfileType } from "../types/StudentType";
import type { instructorProfileType } from "../types/instructorType";
import LoadingScreen from "../components/LoadingScreen";
import { useToast } from "../hook/toastHook";
import type { UserStateType } from "../types/UserType";
import { useAppDispatch } from "../hook/reduxHook";
import { setUser } from "../features/authSlice";
import InstructorDashboard from "./InstructurDashboard";

export function ProtectedDashboard() {
  const [user, setUsers] = useState<
    StudentProfileType | instructorProfileType | null
  >(null);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const checkUser = async () => {
      const data = await verifyUser();
      if (!data) {
        toast.showToast("Please login to access the dashboard", "info");
        navigate("/login", { replace: true });
      } else {
        setUsers(data);
        const { userId, name, email, role, avatar }: UserStateType = data;
        console.log("Setting user in Redux:", {
          userId,
          name,
          email,
          role,
          avatar,
        });
        dispatch(setUser({ userId, name, email, role, avatar }));
      }
    };
    checkUser();
  }, []);
  console.log(user);
  if (!user) {
    return <LoadingScreen loadPage="Dashboard" />;
  }

  if (user.role === "instructor") {
    return <InstructorDashboard instructor={user} />;
  }

  return <StudentDashboard student={user} />;
}
