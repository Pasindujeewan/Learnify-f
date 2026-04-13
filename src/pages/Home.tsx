import { HeroSection } from "./homePageComponents/HeroSection";
import { FeaturedCourses } from "./homePageComponents/FeaturedCourses";
import { ExploreCategories } from "./homePageComponents/ExploreCategories";
export function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedCourses />
      <ExploreCategories />
    </div>
  );
}
