import type { StudentProfileType } from "../types/StudentType";
export default function StudentDashboard({
  user,
}: {
  user?: StudentProfileType;
}) {
  return <div className="p-6"> {user?.name}</div>;
}
