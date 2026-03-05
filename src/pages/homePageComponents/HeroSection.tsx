import hero from "../../assets/hero.png";
import { FaBook, FaRocket } from "react-icons/fa";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-[#2563ea] via-[#204ac0] to-[#7c3aed] text-white py-16 md:py-20 px-4 md:px-20 flex flex-col md:flex-row items-center overflow-x-hidden">
      {/* LEFT CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2 flex flex-col text-center md:text-left"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Unlock Your Potential with Learnify
        </h1>

        <p className="text-sm md:text-lg mb-6">
          Access world-class education from top universities and industry
          experts. Start your learning journey today with over 10,000+ courses.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-white text-blue-600 px-6 py-3 rounded-md hover:bg-gray-100 transition cursor-pointer"
          >
            <FaBook className="inline mr-2" />
            Browse Courses
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-[#60a5fa] text-white px-6 py-3 rounded-md hover:bg-[#4f46e5] transition cursor-pointer"
          >
            <FaRocket className="inline mr-2" />
            Get Started
          </motion.button>
        </div>

        {/* Stats */}
        <div className="flex justify-center md:justify-start gap-6 md:gap-10 mt-8 flex-wrap">
          <div>
            <h1 className="text-lg md:text-xl font-semibold">2M+</h1>
            <p className="text-xs md:text-sm">Active Students</p>
          </div>

          <div>
            <h1 className="text-lg md:text-xl font-semibold">500+</h1>
            <p className="text-xs md:text-sm">Expert Instructors</p>
          </div>

          <div>
            <h1 className="text-lg md:text-xl font-semibold">10K+</h1>
            <p className="text-xs md:text-sm">Courses Available</p>
          </div>
        </div>
      </motion.div>

      {/* IMAGE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center"
      >
        <img
          src={hero}
          className="w-full max-w-md md:max-w-lg h-auto rounded-lg"
          alt="Hero"
        />
      </motion.div>
    </section>
  );
}
