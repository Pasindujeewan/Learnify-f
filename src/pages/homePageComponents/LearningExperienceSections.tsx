import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  MessageSquareText,
  PlayCircle,
  UserRoundCheck,
} from "lucide-react";

const workflow = [
  {
    title: "Choose a course",
    description: "Filter by level, category, language, price, and rating.",
    icon: ClipboardList,
  },
  {
    title: "Learn with structure",
    description: "Follow lessons, resources, and instructor guidance in order.",
    icon: PlayCircle,
  },
  {
    title: "Track progress",
    description: "Continue from your dashboard and see active enrollments.",
    icon: BarChart3,
  },
  {
    title: "Review and improve",
    description: "Rate completed learning and help other students choose well.",
    icon: MessageSquareText,
  },
];

const outcomes = [
  "Instructor dashboards for course creation and student visibility",
  "Student dashboards with enrolled courses and learning status",
  "Course reviews, ratings, PDF resources, and Cloudinary uploads",
  "Clean protected routes for student and instructor experiences",
];

const testimonials = [
  {
    name: "Nethmi Perera",
    role: "Frontend learner",
    quote:
      "The course flow feels simple. I can browse, enroll, and continue learning without losing my place.",
  },
  {
    name: "Ravindu Silva",
    role: "Instructor",
    quote:
      "Creating courses and checking enrolled students from one dashboard makes teaching much easier.",
  },
  {
    name: "Amani Joseph",
    role: "Career switcher",
    quote:
      "The categories and reviews helped me choose a clear path instead of jumping between random videos.",
  },
];

export function LearningExperienceSections() {
  const navigate = useNavigate();

  return (
    <>
      <section className="bg-slate-50 px-4 py-20 dark:bg-slate-950">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              How Learnify works
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              A full learning workflow, not just a course list
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
              Learnify connects discovery, enrollment, course progress,
              instructor publishing, student feedback, and resource tools into
              one practical LMS experience.
            </p>
            <div className="mt-6 grid gap-3">
              {outcomes.map((item) => (
                <div key={item} className="flex gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={18} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {workflow.map((item, index) => (
              <div
                key={item.title}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                  <item.icon size={19} />
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Step {index + 1}
                </p>
                <h3 className="mt-2 text-base font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 dark:bg-slate-900">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { label: "Students supported", value: "2M+", icon: GraduationCap },
              { label: "Verified instructors", value: "500+", icon: UserRoundCheck },
              { label: "Skill certificates", value: "35K+", icon: Award },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950"
              >
                <stat.icon className="text-blue-600" size={24} />
                <p className="mt-5 text-3xl font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
              Learner stories
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
              Built for real learning momentum
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {testimonials.map((item) => (
                <figure
                  key={item.name}
                  className="rounded-lg border border-slate-200 p-5 dark:border-slate-800"
                >
                  <blockquote className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                    "{item.quote}"
                  </blockquote>
                  <figcaption className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {item.name}
                    </p>
                    <p className="text-xs text-slate-500">{item.role}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 px-4 py-20 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
              Start today
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Build your next skill path with Learnify
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              Join as a student to learn, or register as an instructor to publish
              courses and manage learners.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => navigate("/courses")}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Explore courses
              <ArrowRight size={17} />
            </button>
            <button
              onClick={() => navigate("/register")}
              className="inline-flex items-center justify-center rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Create account
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
