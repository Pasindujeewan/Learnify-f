import { FaSearch } from "react-icons/fa";

export function Courses() {
  return (
    <div className="flex mt-5 px-10 gap-2 ">
      {/* filter section */}
      <div className="flex-1 bg-white rounded-2xl p-5"></div>
      {/* courses section */}
      <div className="flex-3 bg-white rounded-2xl p-5">
        <div className="flex flex-col md:flex-row justify-evenly items-center gap-3 w-full ">
          {/* Search */}
          <div className="relative w-full flex-1">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-1/2 pl-10 pr-3 py-2.5 rounded-lg border border-gray-300
          text-gray-700 text-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          </div>

          {/* Sort */}
          <select
            className="py-2.5 px-3 rounded-lg border border-gray-300
        text-sm text-gray-700
        focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option>Sort</option>
            <option>Popular</option>
            <option>Newest</option>
            <option>Highest Rated</option>
          </select>
        </div>
      </div>
    </div>
  );
}
