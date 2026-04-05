import { getDurationLabel } from "./getDuratinonLabel";
import type { Course, courseFilters } from "../types/courseType";

type Props = {
  courses: Course[];
  filters: courseFilters;
};

export const filterCourse = ({ courses, filters }: Props) => {
  if (
    filters.category.length == 0 &&
    filters.duration.length == 0 &&
    filters.language.length == 0 &&
    filters.level.length == 0 &&
    filters.price.length == 0
  ) {
    return courses;
  }
  return courses.filter((c) => {
    const duration = getDurationLabel(c.duration);
    return (
      (filters.level.length === 0 || filters.level.includes(c.level)) &&
      (filters.category.length === 0 ||
        filters.category.includes(c.category)) &&
      (filters.language.length === 0 ||
        filters.language.includes(c.language)) &&
      (filters.duration.length === 0 || filters.duration.includes(duration)) &&
      (filters.price.length === 0 ||
        (filters.price.includes("Free") && c.price === 0) ||
        (filters.price.includes("Paid") && c.price > 0))
    );
  });
};
