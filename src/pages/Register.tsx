import { useForm } from "react-hook-form";
import type { User, UserForm } from "../types/UserType";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { uploadImage } from "../api/getSignature";
import { registerUser } from "../api/registerUser";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hook/toastHook";

const variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

export default function Register() {
  const [section, setSection] = useState(1);
  const navigate = useNavigate();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<User>();

  const onSubmit = async (data: User) => {
    let imageUrl = "";
    try {
      if (data.avatar?.[0]) {
        imageUrl = await uploadImage(data.avatar[0]);
        console.log("Image uploaded successfully:", imageUrl);
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    }

    const { avatar, ...rest } = data;
    const userData: UserForm = { ...rest, avatar: imageUrl };
    try {
      const response = await registerUser(userData);
      console.log("Registration response:", response);

      if (response.ok) {
        toast.showToast("RegisterSucess", "success");
        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        if (errorData.code && errorData.code === "USER_ALREADY_EXSIST") {
          toast.showToast("USER already exist", "error");
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* image section */}
      <div className="hidden md:block w-[40%] relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
          alt="Learning"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.82) saturate(1.1)" }}
        />
        {/* Overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, rgba(16,24,40,0.55) 0%, rgba(16,24,40,0.15) 100%)",
          }}
        />
        {/* Brand text on image */}
        <div className="absolute bottom-10 left-8">
          <p
            className="text-white text-2xl font-semibold tracking-tight"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}
          >
            Start your journey
          </p>
          <p className="text-white/70 text-sm mt-1">
            Join thousands of learners today.
          </p>
        </div>
      </div>

      {/* form section */}
      <div
        className="md:w-[60%] w-full flex items-center justify-center md:p-8 p-4"
        style={{ background: "#f7f8fa" }}
      >
        <div
          className="md:w-[78%] w-full rounded-3xl px-6 md:px-10 py-10"
          style={{
            background: "#ffffff",
            boxShadow:
              "0 4px 6px -1px rgba(0,0,0,0.05), 0 12px 40px -8px rgba(0,0,0,0.1)",
          }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1
              className="text-3xl font-bold"
              style={{ color: "#0f172a", letterSpacing: "-0.02em" }}
            >
              Create account
            </h1>
            <p className="text-sm mt-1" style={{ color: "#64748b" }}>
              Fill in your details to get started.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col"
            style={{ gap: "0" }}
          >
            {/* Step Indicators */}
            <div className="flex items-center mb-8 gap-1">
              {[
                { label: "Basic Info", step: 1 },
                { label: "Profile Info", step: 2 },
                { label: "Contact", step: 3 },
              ].map(({ label, step }, i) => (
                <div key={step} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className="flex items-center gap-2 mb-1"
                      style={{ minWidth: 0 }}
                    >
                      <div
                        className="flex items-center justify-center rounded-full text-xs font-bold transition-all duration-300"
                        style={{
                          width: 26,
                          height: 26,
                          flexShrink: 0,
                          background: section >= step ? "#22c55e" : "#e2e8f0",
                          color: section >= step ? "#fff" : "#94a3b8",
                          boxShadow:
                            section === step
                              ? "0 0 0 3px rgba(34,197,94,0.18)"
                              : "none",
                          transition: "all 0.3s",
                        }}
                      >
                        {section > step ? (
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 13 13"
                            fill="none"
                          >
                            <path
                              d="M2.5 6.5L5.5 9.5L10.5 4"
                              stroke="white"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          step
                        )}
                      </div>
                      <span
                        className="text-xs font-medium hidden sm:block truncate"
                        style={{
                          color: section >= step ? "#22c55e" : "#94a3b8",
                          transition: "color 0.3s",
                        }}
                      >
                        {label}
                      </span>
                    </div>
                    <div
                      className="w-full h-[2px] rounded-full transition-all duration-500"
                      style={{
                        background: section >= step ? "#22c55e" : "#e2e8f0",
                      }}
                    />
                  </div>
                  {i < 2 && (
                    <div
                      style={{
                        width: 12,
                        flexShrink: 0,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Sections */}
            <AnimatePresence mode="wait">
              {/* SECTION 1 */}
              {section === 1 && (
                <motion.div
                  key="section1"
                  variants={variants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-4"
                >
                  <div className="relative">
                    <input
                      {...register("name", { required: "Name is required" })}
                      placeholder="Full Name"
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 ${
                        errors.name
                          ? "border-red-400 bg-red-50"
                          : "border-slate-200 bg-slate-50 focus:border-green-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(34,197,94,0.12)]"
                      }`}
                      style={{ color: "#0f172a" }}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1 ml-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      {...register("email", { required: "Email is required" })}
                      placeholder="Email Address"
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 ${
                        errors.email
                          ? "border-red-400 bg-red-50"
                          : "border-slate-200 bg-slate-50 focus:border-green-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(34,197,94,0.12)]"
                      }`}
                      style={{ color: "#0f172a" }}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1 ml-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      {...register("password", {
                        required: "Password required",
                        minLength: { value: 6, message: "Min 6 characters" },
                      })}
                      type="password"
                      placeholder="Password"
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 ${
                        errors.password
                          ? "border-red-400 bg-red-50"
                          : "border-slate-200 bg-slate-50 focus:border-green-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(34,197,94,0.12)]"
                      }`}
                      style={{ color: "#0f172a" }}
                    />
                    {errors.password && (
                      <p className="text-xs text-red-500 mt-1 ml-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={async () => {
                      const valid = await trigger([
                        "name",
                        "email",
                        "password",
                      ]);
                      if (valid) setSection(2);
                    }}
                    className="w-full py-3 rounded-xl text-sm font-semibold text-white mt-2 transition-all duration-200 active:scale-[0.98]"
                    style={{
                      background: "linear-gradient(135deg, #22c55e, #16a34a)",
                      boxShadow: "0 4px 14px rgba(34,197,94,0.35)",
                    }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLElement).style.boxShadow =
                        "0 6px 20px rgba(34,197,94,0.5)")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.boxShadow =
                        "0 4px 14px rgba(34,197,94,0.35)")
                    }
                  >
                    Continue →
                  </button>
                </motion.div>
              )}

              {/* SECTION 2 */}
              {section === 2 && (
                <motion.div
                  key="section2"
                  variants={variants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-4"
                >
                  <div className="relative">
                    <label
                      className="block text-xs font-medium mb-1.5"
                      style={{ color: "#64748b" }}
                    >
                      Profile Photo
                    </label>
                    <input
                      type="file"
                      {...register("avatar")}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-500 outline-none file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-green-50 file:text-green-600 hover:file:bg-green-100 transition-all"
                    />
                  </div>

                  <div className="relative">
                    <select
                      {...register("role")}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-green-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(34,197,94,0.12)] transition-all duration-200 appearance-none"
                      style={{ color: "#0f172a" }}
                    >
                      <option value="student">Student</option>
                      <option value="instructor">Instructor</option>
                    </select>
                  </div>

                  <div className="relative">
                    <textarea
                      {...register("bio")}
                      placeholder="Short bio"
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-green-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(34,197,94,0.12)] transition-all duration-200 resize-none"
                      style={{ color: "#0f172a" }}
                    />
                  </div>

                  <div className="relative">
                    <textarea
                      {...register("description")}
                      placeholder="Description"
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-green-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(34,197,94,0.12)] transition-all duration-200 resize-none"
                      style={{ color: "#0f172a" }}
                    />
                  </div>

                  <div className="flex gap-3 mt-2">
                    <button
                      type="button"
                      onClick={() => setSection(1)}
                      className="flex-1 py-3 rounded-xl text-sm font-medium transition-all duration-200 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98]"
                      style={{ color: "#64748b" }}
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setSection(3)}
                      className="flex-1 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 active:scale-[0.98]"
                      style={{
                        background: "linear-gradient(135deg, #22c55e, #16a34a)",
                        boxShadow: "0 4px 14px rgba(34,197,94,0.35)",
                      }}
                    >
                      Next →
                    </button>
                  </div>
                </motion.div>
              )}

              {/* SECTION 3 */}
              {section === 3 && (
                <motion.div
                  key="section3"
                  variants={variants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-4"
                >
                  <div className="relative">
                    <input
                      {...register("contact.email", {
                        required: "Contact email required",
                      })}
                      placeholder="Contact Email"
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 ${
                        errors.contact?.email
                          ? "border-red-400 bg-red-50"
                          : "border-slate-200 bg-slate-50 focus:border-green-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(34,197,94,0.12)]"
                      }`}
                      style={{ color: "#0f172a" }}
                    />
                    {errors.contact?.email && (
                      <p className="text-xs text-red-500 mt-1 ml-1">
                        {errors.contact.email.message}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      {...register("contact.phone", {
                        required: "Phone required",
                      })}
                      placeholder="Phone Number"
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 ${
                        errors.contact?.phone
                          ? "border-red-400 bg-red-50"
                          : "border-slate-200 bg-slate-50 focus:border-green-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(34,197,94,0.12)]"
                      }`}
                      style={{ color: "#0f172a" }}
                    />
                    {errors.contact?.phone && (
                      <p className="text-xs text-red-500 mt-1 ml-1">
                        {errors.contact.phone.message}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      {...register("contact.social.twitter")}
                      placeholder="Twitter handle"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-green-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(34,197,94,0.12)] transition-all duration-200"
                      style={{ color: "#0f172a" }}
                    />
                  </div>

                  <div className="relative">
                    <input
                      {...register("contact.social.linkedin")}
                      placeholder="LinkedIn URL"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-green-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(34,197,94,0.12)] transition-all duration-200"
                      style={{ color: "#0f172a" }}
                    />
                  </div>

                  <div className="flex gap-3 mt-2">
                    <button
                      type="button"
                      onClick={() => setSection(2)}
                      className="flex-1 py-3 rounded-xl text-sm font-medium transition-all duration-200 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98]"
                      style={{ color: "#64748b" }}
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 active:scale-[0.98]"
                      style={{
                        background: "linear-gradient(135deg, #22c55e, #16a34a)",
                        boxShadow: "0 4px 14px rgba(34,197,94,0.35)",
                      }}
                    >
                      Create Account ✓
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer */}
            <div className="flex mt-6 justify-center">
              <p className="text-sm" style={{ color: "#94a3b8" }}>
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium hover:underline transition-colors"
                  style={{ color: "#22c55e" }}
                >
                  Sign in
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
