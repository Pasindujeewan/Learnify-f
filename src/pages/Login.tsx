import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    console.log(data);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left image section */}
      <div className="hidden md:block w-[40%] relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
          alt="Learning"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.78) saturate(1.1)" }}
        />
        {/* Blue overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, rgba(30,64,175,0.7) 0%, rgba(59,130,246,0.25) 100%)",
          }}
        />
        {/* Brand text */}
        <motion.div
          className="absolute bottom-10 left-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p
            className="text-white text-2xl font-semibold tracking-tight"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}
          >
            Welcome back
          </p>
          <p className="text-white/70 text-sm mt-1">
            Continue where you left off.
          </p>
        </motion.div>
      </div>

      {/* Right form section */}
      <div
        className="md:w-[60%] w-full flex items-center justify-center md:p-8 p-4"
        style={{ background: "#f0f4ff" }}
      >
        <motion.div
          className="md:w-[75%] w-full rounded-3xl px-6 md:px-10 py-10"
          style={{
            background: "#ffffff",
            boxShadow:
              "0 4px 6px -1px rgba(37,99,235,0.06), 0 12px 40px -8px rgba(37,99,235,0.12)",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            {/* Blue accent bar */}
            <div
              className="w-10 h-1 rounded-full mb-4"
              style={{ background: "linear-gradient(90deg, #2563eb, #60a5fa)" }}
            />
            <h1
              className="text-3xl font-bold"
              style={{ color: "#0f172a", letterSpacing: "-0.02em" }}
            >
              Sign in
            </h1>
            <p className="text-sm mt-1" style={{ color: "#64748b" }}>
              Enter your credentials to access your account.
            </p>
          </motion.div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Email */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.35 }}
            >
              <input
                {...register("email", { required: "Email is required" })}
                placeholder="Email Address"
                className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 ${
                  errors.email
                    ? "border-red-400 bg-red-50"
                    : "border-slate-200 bg-slate-50 focus:border-blue-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)]"
                }`}
                style={{ color: "#0f172a" }}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1 ml-1">
                  {errors.email.message}
                </p>
              )}
            </motion.div>

            {/* Password */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.28, duration: 0.35 }}
            >
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                placeholder="Password"
                className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 ${
                  errors.password
                    ? "border-red-400 bg-red-50"
                    : "border-slate-200 bg-slate-50 focus:border-blue-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)]"
                }`}
                style={{ color: "#0f172a" }}
              />
              {errors.password && (
                <p className="text-xs text-red-500 mt-1 ml-1">
                  {errors.password.message}
                </p>
              )}
            </motion.div>

            {/* Forgot password */}
            <motion.div
              className="flex justify-end -mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.34 }}
            >
              <a
                href="/forgot-password"
                className="text-xs font-medium hover:underline transition-colors"
                style={{ color: "#2563eb" }}
              >
                Forgot password?
              </a>
            </motion.div>

            {/* Submit button */}
            <motion.button
              type="submit"
              className="w-full py-3 rounded-xl text-sm font-semibold text-white mt-2 transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                boxShadow: "0 4px 14px rgba(37,99,235,0.35)",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.35 }}
              whileHover={{
                boxShadow: "0 6px 20px rgba(37,99,235,0.5)",
                scale: 1.01,
              }}
              whileTap={{ scale: 0.98 }}
            >
              Sign In
            </motion.button>

            {/* Divider */}
            <motion.div
              className="flex items-center gap-3 my-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.44 }}
            >
              <div className="flex-1 h-px" style={{ background: "#e2e8f0" }} />
              <span className="text-xs" style={{ color: "#94a3b8" }}>
                or
              </span>
              <div className="flex-1 h-px" style={{ background: "#e2e8f0" }} />
            </motion.div>

            {/* Footer */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.48 }}
            >
              <p className="text-sm" style={{ color: "#94a3b8" }}>
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="font-medium hover:underline transition-colors"
                  style={{ color: "#2563eb" }}
                >
                  Register
                </a>
              </p>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
