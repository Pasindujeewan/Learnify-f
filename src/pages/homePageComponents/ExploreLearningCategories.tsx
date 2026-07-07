import { useNavigate } from "react-router-dom";
import { FaBullhorn, FaChartBar, FaCode, FaPenNib } from "react-icons/fa";
import type { IconType } from "react-icons";
import { ArrowRight } from "lucide-react";

type Category = {
  id: number;
  title: string;
  description: string;
  courseCount: string;
  icon: IconType;
  iconBg: string;
  countColor: string;
  route: string;
};

const categories: Category[] = [
  {
    id: 1,
    title: "Web Development",
    description: "Learn HTML, CSS, JavaScript, React, and backend fundamentals.",
    courseCount: "150+ Courses",
    icon: FaCode,
    iconBg: "bg-blue-600",
    countColor: "text-blue-600",
    route: "/courses?search=web development",
  },
  {
    id: 2,
    title: "Data Science",
    description: "Master Python, machine learning, AI, and analytics workflows.",
    courseCount: "120+ Courses",
    icon: FaChartBar,
    iconBg: "bg-violet-600",
    countColor: "text-violet-600",
    route: "/courses?search=data science",
  },
  {
    id: 3,
    title: "Design",
    description: "Build product design, UI/UX, typography, and Figma skills.",
    courseCount: "90+ Courses",
    icon: FaPenNib,
    iconBg: "bg-rose-600",
    countColor: "text-rose-600",
    route: "/courses?search=design",
  },
  {
    id: 4,
    title: "Marketing",
    description: "Study SEO, content strategy, campaigns, and growth analytics.",
    courseCount: "80+ Courses",
    icon: FaBullhorn,
    iconBg: "bg-amber-600",
    countColor: "text-amber-600",
    route: "/courses?search=marketing",
  },
];

export function ExploreLearningCategories() {
  const navigate = useNavigate();

  return (
    <section className="bg-white px-4 py-20 transition-colors duration-300 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
            Learning paths
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            Explore by category
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Choose a path, compare courses, enroll, and keep moving through
            structured lessons from your dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate(cat.route)}
              className="flex min-h-56 flex-col gap-3 rounded-lg border border-slate-200 bg-white p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-950"
            >
              <span
                className={`${cat.iconBg} flex h-10 w-10 items-center justify-center rounded-lg text-white`}
              >
                <cat.icon size={18} />
              </span>

              <span className="text-sm font-bold text-slate-800 dark:text-white">
                {cat.title}
              </span>

              <span className="text-xs leading-6 text-slate-500 dark:text-slate-400">
                {cat.description}
              </span>

              <span
                className={`mt-auto flex items-center gap-1 text-xs font-semibold ${cat.countColor}`}
              >
                {cat.courseCount}
                <ArrowRight size={14} />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
