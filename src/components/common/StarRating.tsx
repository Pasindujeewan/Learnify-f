export interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: number;
}

export function StarRating({ rating, maxStars = 5, size = 13 }: StarRatingProps) {
  const stars = Array.from({ length: maxStars }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of ${maxStars}`}>
      {stars.map((i) => {
        const fill =
          i <= Math.floor(rating)
            ? "#f59e0b"
            : i === Math.ceil(rating) && rating % 1 >= 0.5
              ? "#fcd34d"
              : "#d1d5db";

        return (
          <svg key={i} width={size} height={size} viewBox="0 0 16 16">
            <polygon
              points="8,1.5 10.09,6.26 15.27,6.69 11.45,9.97 12.72,15.02 8,12.2 3.28,15.02 4.55,9.97 0.73,6.69 5.91,6.26"
              fill={fill}
            />
          </svg>
        );
      })}
    </div>
  );
}
