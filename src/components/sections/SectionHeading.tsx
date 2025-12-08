import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeading = ({
  subtitle,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) => {
  return (
    <div
      className={cn(
        "max-w-3xl mb-12 md:mb-16",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {subtitle && (
        <span className="inline-block text-xs tracking-[0.3em] uppercase text-primary font-semibold mb-4">
          {subtitle}
        </span>
      )}
      <h2 className="heading-lg mb-4">{title}</h2>
      {description && (
        <p className="body-lg">{description}</p>
      )}
      {align === "center" && <div className="divider-rose mt-6" />}
    </div>
  );
};
