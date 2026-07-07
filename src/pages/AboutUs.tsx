import { FiSun, FiMoon } from "react-icons/fi";

export function AboutUs() {
  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
      {/* Navbar */}
      <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
        <h1 className="font-bold text-xl">Learnfy</h1>

        {/* Just visual (toggle handled globally via html class) */}
        <div className="flex gap-2">
          <FiSun />
          <FiMoon />
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-6">
        {/* Title */}
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
          Learnfy was founded in 2019 to make education accessible for everyone.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="border p-4 text-center dark:border-gray-700">
            <h3 className="font-bold">2.4M+</h3>
            <p className="text-sm">Learners</p>
          </div>
          <div className="border p-4 text-center dark:border-gray-700">
            <h3 className="font-bold">8500+</h3>
            <p className="text-sm">Courses</p>
          </div>
          <div className="border p-4 text-center dark:border-gray-700">
            <h3 className="font-bold">190+</h3>
            <p className="text-sm">Countries</p>
          </div>
          <div className="border p-4 text-center dark:border-gray-700">
            <h3 className="font-bold">98%</h3>
            <p className="text-sm">Satisfaction</p>
          </div>
        </div>

        {/* Mission */}
        <div className="mb-8">
          <h3 className="font-bold mb-2">Our Mission</h3>
          <p className="text-sm mb-2 text-gray-600 dark:text-gray-300">
            We provide high quality courses that help people build real skills.
          </p>
          <ul className="list-disc ml-5 text-sm text-gray-600 dark:text-gray-300">
            <li>Industry based content</li>
            <li>Project based learning</li>
            <li>Career support</li>
          </ul>
        </div>

        {/* Values */}
        <div className="mb-8">
          <h3 className="font-bold mb-2">Our Values</h3>
          <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
            <li>Outcome focused learning</li>
            <li>Accessible education</li>
            <li>Community support</li>
            <li>Updated content</li>
          </ul>
        </div>

        {/* Team */}
        <div className="mb-8">
          <h3 className="font-bold mb-4">Team</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="border p-3 dark:border-gray-700">
              <p className="font-semibold">Amara Osei</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">CEO</p>
            </div>
            <div className="border p-3 dark:border-gray-700">
              <p className="font-semibold">Jin Park</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">CTO</p>
            </div>
            <div className="border p-3 dark:border-gray-700">
              <p className="font-semibold">Leila Hassan</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Curriculum Head
              </p>
            </div>
            <div className="border p-3 dark:border-gray-700">
              <p className="font-semibold">Marco Rivera</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Design Head
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="font-bold mb-2">Start Learning Today</h3>
          <button className="border px-4 py-2 mr-2 dark:border-gray-700">
            Browse Courses
          </button>
          <button className="border px-4 py-2 dark:border-gray-700">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
