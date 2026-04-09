import type { StudentProfileType } from "../types/StudentType";

type Props = {
  student: Partial<StudentProfileType>;
};

export default function StudentDashboard({ student }: Props) {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Top Section */}
      <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex gap-x-5">
          <img
            src={student.avatar || "/avatar.png"}
            alt="avatar"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {student.name}
            </h2>
            <p className="text-sm text-gray-500">{student.email}</p>
            <p className="text-sm text-blue-600 mt-1">
              {student.education_level}
            </p>
          </div>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm">
          Edit Profile
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-xs text-gray-500">Courses Enrolled</p>
          <h3 className="text-lg font-bold text-gray-800">
            {student.courses?.length || 0}
          </h3>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-xs text-gray-500">Completed</p>
          <h3 className="text-lg font-bold text-green-600">
            {student.courses?.filter((c) => c.completed).length || 0}
          </h3>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-xs text-gray-500">In Progress</p>
          <h3 className="text-lg font-bold text-blue-600">
            {student.courses?.filter((c) => !c.completed).length || 0}
          </h3>
        </div>
      </div>

      {/* Courses */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">My Courses</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {student.courses?.length ? (
            student.courses.map((course) => (
              <div
                key={course.course_id}
                className="bg-white rounded-xl shadow-sm p-3"
              >
                <img
                  src={course.image || "/placeholder.jpg"}
                  className="w-full aspect-video object-cover rounded-md"
                />

                <h4 className="text-sm font-medium mt-2 line-clamp-2">
                  {course.title}
                </h4>

                <p className="text-xs text-gray-500 mt-1">
                  {course.instructorName}
                </p>

                {/* Progress Bar */}
                <div className="mt-2">
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${course.progress || 0}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1">
                    {course.progress || 0}% completed
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No courses enrolled yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
