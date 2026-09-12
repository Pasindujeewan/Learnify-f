import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { StudentProfileType, InstructorProfileType, UserStateType } from "../types";
import { verifyUser } from "../services/authService";
import { useToast } from "../hooks/useToast";
import { useAppDispatch } from "../hooks/useAppRedux";
import { setUser } from "../features/authSlice";
import LoadingScreen from "../components/LoadingScreen";
import InstructorDashboard from "./InstructorDashboard";
import StudentDashboard from "./StudentDashboard";

export function ProtectedDashboard() {
  const [user, setCurrentUser] = useState<StudentProfileType | InstructorProfileType | null>(null);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkSession = async () => {
      const profile = await verifyUser();
      if (!profile) {
        toast.info("Please sign in to access your personalized dashboard.", "Authentication required");
        navigate("/login", { replace: true });
      } else {
        setCurrentUser(profile);
        const userState: UserStateType = {
          userId: profile.userId,
          name: profile.name,
          email: profile.email,
          role: profile.role,
          avatar: profile.avatar,
        };
        dispatch(setUser(userState));
      }
    };

    checkSession();
  }, [dispatch, navigate, toast]);

  if (!user) {
    return <LoadingScreen loadPage="Dashboard" />;
  }

  if (user.role === "instructor") {
    return <InstructorDashboard instructor={user} />;
  }

  return <StudentDashboard student={user} />;
}

export default ProtectedDashboard;
