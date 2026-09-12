import { motion } from "framer-motion";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { UserRegisterForm } from "../../types";

interface RegisterStepContactProps {
  register: UseFormRegister<UserRegisterForm>;
  errors: FieldErrors<UserRegisterForm>;
  onBack: () => void;
  isLoading: boolean;
}

export function RegisterStepContact({
  register,
  errors,
  onBack,
  isLoading,
}: RegisterStepContactProps) {
  return (
    <motion.div
      key="section3"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col gap-4"
    >
      <div className="relative">
        <input
          {...register("contact.email", { required: "Contact email required" })}
          type="email"
          placeholder="Contact Email"
          className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 dark:text-slate-100 dark:placeholder-slate-500 ${
            errors.contact?.email
              ? "border-red-400 bg-red-50 dark:bg-red-950/40 dark:border-red-500"
              : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-green-400 dark:focus:border-green-500 focus:bg-white dark:focus:bg-slate-700 focus:shadow-[0_0_0_3px_rgba(34,197,94,0.12)]"
          }`}
        />
        {errors.contact?.email && (
          <p className="text-xs text-red-500 mt-1 ml-1">{errors.contact.email.message}</p>
        )}
      </div>

      <div className="relative">
        <input
          {...register("contact.phone", { required: "Phone number required" })}
          placeholder="Phone Number"
          className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 dark:text-slate-100 dark:placeholder-slate-500 ${
            errors.contact?.phone
              ? "border-red-400 bg-red-50 dark:bg-red-950/40 dark:border-red-500"
              : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-green-400 dark:focus:border-green-500 focus:bg-white dark:focus:bg-slate-700 focus:shadow-[0_0_0_3px_rgba(34,197,94,0.12)]"
          }`}
        />
        {errors.contact?.phone && (
          <p className="text-xs text-red-500 mt-1 ml-1">{errors.contact.phone.message}</p>
        )}
      </div>

      <div className="relative">
        <input
          {...register("contact.social.twitter")}
          placeholder="Twitter / X handle (@username)"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:border-green-400 dark:focus:border-green-500 focus:bg-white dark:focus:bg-slate-700 text-[#0f172a] dark:text-slate-100 dark:placeholder-slate-500 transition-all duration-200"
        />
      </div>

      <div className="relative">
        <input
          {...register("contact.social.linkedin")}
          placeholder="LinkedIn Profile URL"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:border-green-400 dark:focus:border-green-500 focus:bg-white dark:focus:bg-slate-700 text-[#0f172a] dark:text-slate-100 dark:placeholder-slate-500 transition-all duration-200"
        />
      </div>

      <div className="flex gap-3 mt-2">
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="flex-1 py-3 rounded-xl text-sm font-medium transition-all duration-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 cursor-pointer disabled:opacity-50"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 py-3 rounded-xl text-sm font-semibold text-white shadow-md bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>
      </div>
    </motion.div>
  );
}
