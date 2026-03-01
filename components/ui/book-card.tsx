import { cn } from "@/lib/utils";
import Link from "next/link";

interface BookCardProps {
  title: string;
  description: string;
  className?: string;
  slug: string;
}

export const BookCard = ({ title, description, className, slug }: BookCardProps) => {
  return (
    <Link href={`/books/${slug}`} className={cn("block h-full", className)}>
      <div className={cn(
        "relative h-full overflow-hidden rounded-3xl transition-all duration-300 group",
        // Background: glass effect that works in both modes
        "bg-white/70 dark:bg-neutral-900/50 backdrop-blur-md",
        // Border: faint dark border for light mode, faint white for dark mode
        "border border-black/[0.08] dark:border-white/[0.08]",
        // Shadow: adds depth in light mode, removed in dark mode for that flat aesthetic
        "shadow-[0_2px_10px_-3px_rgba(0,0,0,0.07)] dark:shadow-none",
        // Hover states
        "hover:border-black/[0.15] dark:hover:border-white/[0.15] hover:shadow-md dark:hover:bg-neutral-900/80"
      )}>
        <div className="relative z-10 p-6">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white group-hover:opacity-80 transition-opacity">
            {title}
          </h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            {description}
          </p>
        </div>
        
        {/* Subtle inner glow effect for dark mode */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 dark:group-hover:opacity-100 transition-opacity" />
      </div>
    </Link>
  );
};