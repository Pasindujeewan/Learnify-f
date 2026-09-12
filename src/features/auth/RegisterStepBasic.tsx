import { motion } from "framer-motion";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { UserRegisterForm } from "../../types";

interface RegisterStepBasicProps {
  register: UseFormRegister<UserRegisterForm>;
  errors: FieldErrors<UserRegisterForm>;
  onContinue: () => void;
}

export function RegisterStepBasic({
  register,
  errors,
  onContinue,
}: RegisterStepBasicProps) {
  return (
    <motion.div
      key="section1"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col gap-4"
    >
      <div className="relative">
        <input
          {...register("name", { required: "Name is required" })}
          placeholder="Full Name"
          className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 dark:text-slate-100 dark:placeholder-slate-500 ${
            errors.name
              ? "border-red-400 bg-red-50 dark:bg-red-950/40 dark:border-red-500"
              : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-green-400 dark:focus:border-green-500 focus:bg-white dark:focus:bg-slate-700 focus:shadow-[0_0_0_3px_rgba(34,197,94,0.12)]"
          }`}
        />
        {errors.name && (
          <p className="text-xs text-red-500 mt-1 ml-1">{errors.name.message}</p>
        )}
      </div>

      <div className="relative">
        <input
          {...register("email", { required: "Email is required" })}
          type="email"
          placeholder="Email Address"
          className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 dark:text-slate-100 dark:placeholder-slate-500 ${
            errors.email
              ? "border-red-400 bg-red-50 dark:bg-red-950/40 dark:border-red-500"
              : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-green-400 dark:focus:border-green-500 focus:bg-white dark:focus:bg-slate-700 focus:shadow-[0_0_0_3px_rgba(34,197,94,0.12)]"
          }`}
        />
        {errors.email && (
          <p className="text-xs text-red-500 mt-1 ml-1">{errors.email.message}</p>
        )}
      </div>

      <div className="relative">
        <input
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Minimum 6 characters" },
          })}
          type="password"
          placeholder="Password (minimum 6 characters)"
          className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 dark:text-slate-100 dark:placeholder-slate-500 ${
            errors.password
              ? "border-red-400 bg-red-50 dark:bg-red-950/40 dark:border-red-500"
              : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-green-400 dark:focus:border-green-500 focus:bg-white dark:focus:bg-slate-700 focus:shadow-[0_0_0_3px_rgba(34,197,94,0.12)]"
          }`}
        />
        {errors.password && (
          <p className="text-xs text-red-500 mt-1 ml-1">{errors.password.message}</p>
        )}
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="w-full py-3 rounded-xl text-sm font-semibold text-white mt-2 transition-all duration-200 active:scale-[0.98] cursor-pointer shadow-md bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
      >
        Continue
      </button>
    </motion.div>
  );
}
