import { Clock } from "lucide-react";

type ClockIconProps = {
  className?: string;
};

export default function ClockIcon({ className = "w-4 h-4" }: ClockIconProps) {
  return <Clock className={className} />;
}
