import { motion } from "framer-motion";
import type { UseFormRegister } from "react-hook-form";
import type { UserRegisterForm } from "../../types";

interface RegisterStepProfileProps {
  register: UseFormRegister<UserRegisterForm>;
  onBack: () => void;
  onNext: () => void;
}

export function RegisterStepProfile({
  register,
  onBack,
  onNext,
}: RegisterStepProfileProps) {
  return (
    <motion.div
      key="section2"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col gap-4"
    >
      <div className="relative">
        <label className="block text-xs font-semibold mb-1.5 text-slate-500 dark:text-slate-400">
          Profile Photo (optional)
        </label>
        <input
          type="file"
          accept="image/*"
          {...register("avatar")}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-500 dark:text-slate-400 outline-none file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-green-50 dark:file:bg-green-900/30 file:text-green-600 dark:file:text-green-400 hover:file:bg-green-100 dark:hover:file:bg-green-900/50 transition-all cursor-pointer"
        />
      </div>

      <div className="relative">
        <label className="block text-xs font-semibold mb-1.5 text-slate-500 dark:text-slate-400">
          Account Role
        </label>
        <select
          {...register("role")}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:border-green-400 dark:focus:border-green-500 focus:bg-white dark:focus:bg-slate-700 text-[#0f172a] dark:text-slate-100 transition-all duration-200 cursor-pointer"
        >
          <option value="student">Student (Learn courses & track progress)</option>
          <option value="instructor">Instructor (Teach & manage courses)</option>
        </select>
      </div>

      <div className="relative">
        <textarea
          {...register("bio")}
          placeholder="Short headline or bio (e.g. Aspiring Full Stack Developer)"
          rows={2}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:border-green-400 dark:focus:border-green-500 focus:bg-white dark:focus:bg-slate-700 transition-all duration-200 resize-none text-[#0f172a] dark:text-slate-100 dark:placeholder-slate-500"
        />
      </div>

      <div className="relative">
        <textarea
          {...register("description")}
          placeholder="Detailed background or teaching experience"
          rows={2}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:border-green-400 dark:focus:border-green-500 focus:bg-white dark:focus:bg-slate-700 transition-all duration-200 resize-none text-[#0f172a] dark:text-slate-100 dark:placeholder-slate-500"
        />
      </div>

      <div className="flex gap-3 mt-2">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-3 rounded-xl text-sm font-medium transition-all duration-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 cursor-pointer"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex-1 py-3 rounded-xl text-sm font-semibold text-white shadow-md bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 active:scale-[0.98] transition-all cursor-pointer"
        >
          Next
        </button>
      </div>
    </motion.div>
  );
}
