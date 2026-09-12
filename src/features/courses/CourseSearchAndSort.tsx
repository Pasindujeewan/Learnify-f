import { FaSearch } from "react-icons/fa";

interface CourseSearchAndSortProps {
  search: string;
  onSearchChange: (value: string) => void;
  sortOption: string;
  onSortChange: (value: string) => void;
  activeFilters: string[];
  onRemoveFilter: (filter: string) => void;
  onClearAllFilters: () => void;
}

export function CourseSearchAndSort({
  search,
  onSearchChange,
  sortOption,
  onSortChange,
  activeFilters,
  onRemoveFilter,
  onClearAllFilters,
}: CourseSearchAndSortProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 w-full">
        {/* Search input */}
        <div className="relative flex-1">
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            type="text"
            placeholder="Search courses by title, topic, or instructor..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-200 text-sm bg-gray-50 dark:bg-slate-800 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-700 transition"
          />
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 text-sm" />
        </div>

        {/* Sort selector */}
        <div className="shrink-0">
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full sm:w-auto py-2.5 px-3 rounded-xl border border-gray-200 dark:border-slate-700 text-sm text-gray-700 dark:text-slate-200 bg-gray-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-500 transition cursor-pointer"
          >
            <option value="">Sort by: Recommended</option>
            <option value="popular">Most Popular</option>
            <option value="newest">Newest</option>
            <option value="price low to high">Price: Low to High</option>
            <option value="price high to low">Price: High to Low</option>
            <option value="highestRated">Highest Rated</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {/* Active Filter Badges */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-gray-400 dark:text-slate-500">Active:</span>
          {activeFilters.map((filter) => (
            <span
              key={filter}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-100 dark:border-blue-800"
            >
              {filter}
              <button
                type="button"
                onClick={() => onRemoveFilter(filter)}
                className="hover:text-blue-900 dark:hover:text-blue-100 cursor-pointer text-xs"
              >
                ×
              </button>
            </span>
          ))}
          <button
            type="button"
            onClick={onClearAllFilters}
            className="text-xs text-gray-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 ml-1 underline cursor-pointer"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
