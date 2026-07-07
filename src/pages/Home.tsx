import { HeroSection } from "./homePageComponents/HeroSection";
import { FeaturedCourses } from "./homePageComponents/FeaturedCourses";
import { ExploreLearningCategories } from "./homePageComponents/ExploreLearningCategories";
import { LearningExperienceSections } from "./homePageComponents/LearningExperienceSections";

export function Home() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950">
      <HeroSection />
      <ExploreLearningCategories />
      <FeaturedCourses />
      <LearningExperienceSections />
    </div>
  );
}
