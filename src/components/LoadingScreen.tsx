import { motion } from "framer-motion";

type Props = {
  loadPage: string;
};

export default function LoadingScreen({ loadPage }: Props) {
  return (
    <div
      className="flex items-center justify-center min-h-screen
                 bg-gray-100 dark:bg-gray-950 transition-colors duration-300"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold tracking-wide
                     text-gray-900 dark:text-white"
        >
          {loadPage}
        </motion.div>

        {/* Spinner */}
        <motion.div
          className="w-16 h-16 rounded-full border-4
                     border-gray-300 dark:border-gray-700
                     border-t-blue-500"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />

        {/* Loading Text */}
        <motion.p
          className="text-sm text-gray-600 dark:text-gray-400"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          Loading, please wait...
        </motion.p>

        {/* Progress Bar */}
        <div
          className="w-48 h-1 rounded overflow-hidden
                        bg-gray-300 dark:bg-gray-800"
        >
          <motion.div
            className="h-full bg-blue-500"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}
