import { useNavigate } from "react-router-dom";
import { FaCode, FaChartBar, FaPenNib, FaBullhorn } from "react-icons/fa";
import type { IconType } from "react-icons";

type Category = {
  id: number;
  title: string;
  description: string;
  courseCount: string;
  icon: IconType;
  iconBg: string;
  cardBg: string;
  arrowColor: string;
  countColor: string;
  route: string;
};

const categories: Category[] = [
  {
    id: 1,
    title: "Web Development",
    description: "Learn HTML5, CSS, JavaScript, React, and Nodejs.",
    courseCount: "150+ Courses",
    icon: FaCode,
    iconBg: "bg-blue-500",
    cardBg: "bg-blue-50 dark:bg-blue-950/40",
    arrowColor: "text-blue-500",
    countColor: "text-blue-500",
    route: "/categories/web-development",
  },
  {
    id: 2,
    title: "Data Science",
    description: "Master Python, ML, AI, and data analytics.",
    courseCount: "120+ Courses",
    icon: FaChartBar,
    iconBg: "bg-purple-500",
    cardBg: "bg-purple-50 dark:bg-purple-950/40",
    arrowColor: "text-purple-500",
    countColor: "text-purple-500",
    route: "/categories/data-science",
  },
  {
    id: 3,
    title: "Design",
    description: "UI/UX, Graphic Design, and Figma basics.",
    courseCount: "90+ Courses",
    icon: FaPenNib,
    iconBg: "bg-pink-500",
    cardBg: "bg-pink-50 dark:bg-pink-950/40",
    arrowColor: "text-pink-500",
    countColor: "text-pink-500",
    route: "/categories/design",
  },
  {
    id: 4,
    title: "Marketing",
    description: "Digital Marketing, SEO, Social Media, & Analytics.",
    courseCount: "80+ Courses",
    icon: FaBullhorn,
    iconBg: "bg-orange-500",
    cardBg: "bg-orange-50 dark:bg-orange-950/40",
    arrowColor: "text-orange-500",
    countColor: "text-orange-500",
    route: "/categories/marketing",
  },
];

export function ExploreCategories() {
  const navigate = useNavigate();

  return (
    <section className="bg-white dark:bg-[#0d1b3e] py-16 px-4 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Explore Categories
          </h2>
          <p className="text-sm text-gray-400 dark:text-slate-400">
            Choose from our diverse range of learning paths.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(cat.route)}
              className={`${cat.cardBg} rounded-2xl p-5 flex flex-col gap-3 cursor-pointer hover:scale-[1.02] hover:shadow-md transition-all duration-300 border border-transparent dark:border-white/5`}
            >
              {/* Icon */}
              <div
                className={`${cat.iconBg} w-10 h-10 rounded-xl flex items-center justify-center text-white`}
              >
                <cat.icon size={18} />
              </div>

              {/* Title */}
              <h3 className="font-bold text-sm text-gray-800 dark:text-white">
                {cat.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                {cat.description}
              </p>

              {/* Course count + arrow */}
              <div
                className={`flex items-center gap-1 text-xs font-semibold mt-auto ${cat.countColor}`}
              >
                <span>{cat.courseCount}</span>
                <span className="text-base">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
