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
import InstructorDashboard from "./InstructorDashboard";

export function ProtectedDashboard() {
  const [user, setUsers] = useState<
    StudentProfileType | instructorProfileType | null
  >(null);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    // The dashboard is role-based, so verify the cookie session before rendering either view.
    const checkUser = async () => {
      const data = await verifyUser();
      if (!data) {
        toast.info("Please login to access your dashboard.", "Authentication required");
        navigate("/login", { replace: true });
      } else {
        setUsers(data);
        const { userId, name, email, role, avatar }: UserStateType = data;
        dispatch(setUser({ userId, name, email, role, avatar }));
      }
    };
    checkUser();
  }, [dispatch, navigate, toast]);
  if (!user) {
    return <LoadingScreen loadPage="Dashboard" />;
  }

  if (user.role === "instructor") {
    return <InstructorDashboard instructor={user} />;
  }

  return <StudentDashboard student={user} />;
}
