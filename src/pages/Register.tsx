import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import type { UserRegisterForm, UserDbType } from "../types";
import { registerUser } from "../services/authService";
import { uploadImage } from "../services/uploadService";
import { useToast } from "../hooks/useToast";
import { RegisterStepIndicator } from "../features/auth/RegisterStepIndicator";
import { RegisterStepBasic } from "../features/auth/RegisterStepBasic";
import { RegisterStepProfile } from "../features/auth/RegisterStepProfile";
import { RegisterStepContact } from "../features/auth/RegisterStepContact";

export default function Register() {
  const [section, setSection] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<UserRegisterForm>({
    defaultValues: {
      role: "student",
    },
  });

  const onSubmit = async (data: UserRegisterForm) => {
    setIsLoading(true);
    let imageUrl = "";

    try {
      if (data.avatar?.[0]) {
        imageUrl = await uploadImage(data.avatar[0]);
      }
    } catch {
      toast.info("Image upload skipped. Continuing account creation.", "Photo");
    }

    const userData: UserDbType = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      bio: data.bio,
      description: data.description,
      contact: data.contact,
      avatar: imageUrl,
    };

    try {
      await registerUser(userData);
      toast.success("Account successfully created! Please log in.", "Success");
      navigate("/login");
    } catch {
      toast.error("Registration failed. Please check your details and try again.", "Error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStep1Continue = async () => {
    const valid = await trigger(["name", "email", "password"]);
    if (valid) setSection(2);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left visual branding */}
      <div className="hidden md:block w-[40%] relative overflow-hidden bg-slate-900">
        <img
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1000"
          alt="Learning experience"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
        <div className="absolute bottom-10 left-8">
          <h2 className="text-white text-2xl font-bold tracking-tight">
            Start your journey
          </h2>
          <p className="text-white/70 text-sm mt-1">
            Join thousands of students and instructors worldwide.
          </p>
        </div>
      </div>

      {/* Form Container */}
      <div className="md:w-[60%] w-full flex items-center justify-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-950">
        <div className="relative w-full max-w-lg rounded-3xl p-6 sm:p-10 bg-white dark:bg-slate-900 shadow-xl border border-gray-100 dark:border-slate-800">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Create an Account
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Complete the steps below to set up your profile.
            </p>
          </div>

          <RegisterStepIndicator currentStep={section} />

          <form onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              {section === 1 && (
                <RegisterStepBasic
                  register={register}
                  errors={errors}
                  onContinue={handleStep1Continue}
                />
              )}

              {section === 2 && (
                <RegisterStepProfile
                  register={register}
                  onBack={() => setSection(1)}
                  onNext={() => setSection(3)}
                />
              )}

              {section === 3 && (
                <RegisterStepContact
                  register={register}
                  errors={errors}
                  onBack={() => setSection(2)}
                  isLoading={isLoading}
                />
              )}
            </AnimatePresence>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-green-600 dark:text-green-400 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
