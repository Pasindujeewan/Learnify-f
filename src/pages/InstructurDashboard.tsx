import type { instructorProfileType } from "../types/instructorType";
import CreateCourseForm from "./instructurDashboardComponents/instructurAddCourse";
import { useState } from "react";

type Props = {
  instructor: instructorProfileType;
};

export default function InstructorDashboard({ instructor }: Props) {
  const [showCreateForm, setShowCreateForm] = useState(false);

  const toggleCreateForm = () => {
    setShowCreateForm((prev) => !prev);
  };
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Create Course Form */}
      {showCreateForm && (
        <div className="absolute z-20 ">
          <CreateCourseForm
            onClose={setShowCreateForm}
            isOpen={showCreateForm}
          />
        </div>
      )}
      {/* Top Section */}
      <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          {instructor.avatar ? (
            <img
              src={instructor.avatar}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-500"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
              {instructor.name?.charAt(0)}
            </div>
          )}

          {/* Info */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {instructor.name}
            </h2>
            <p className="text-sm text-gray-500">{instructor.email}</p>
            <p className="text-sm text-blue-600 mt-1">{instructor.expertise}</p>
          </div>
        </div>

        <button
          onClick={toggleCreateForm}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm"
        >
          + Create Course
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-xs text-gray-500">Total Courses</p>
          <h3 className="text-lg font-bold text-gray-800">
            {instructor.courses.length}
          </h3>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-xs text-gray-500">Rating</p>
          <h3 className="text-lg font-bold text-yellow-500">
            {instructor.rating ?? "N/A"}
          </h3>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-xs text-gray-500">Experience</p>
          <h3 className="text-lg font-bold text-blue-600">
            {instructor.experience ?? 0} yrs
          </h3>
        </div>
      </div>

      {/* Courses */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">My Courses</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {instructor.courses.length ? (
            instructor.courses.map((course) => (
              <div
                key={course.course_id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
              >
                <img
                  src={course.image || "/placeholder.jpg"}
                  className="w-full aspect-video object-cover"
                />

                <div className="p-3">
                  <h4 className="text-sm font-semibold line-clamp-2">
                    {course.title}
                  </h4>

                  <p className="text-xs text-gray-500 mt-1">
                    {course.category}
                  </p>

                  <div className="flex justify-between items-center mt-2">
                    <span className="text-blue-600 font-bold text-sm">
                      ${course.price}
                    </span>

                    <span className="text-xs text-yellow-500">
                      ⭐ {course.rating ?? "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No courses created yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
