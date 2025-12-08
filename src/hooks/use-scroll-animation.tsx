import { useEffect, useRef, useState } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const { threshold = 0.1, rootMargin = "0px 0px -50px 0px", triggerOnce = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
};

// Component wrapper for scroll animations
interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-left" | "fade-right" | "fade" | "scale" | "blur";
  delay?: number;
  duration?: number;
  stagger?: number;
  index?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
  duration = 0.6,
  stagger = 0,
  index = 0,
}) => {
  const { ref, isVisible } = useScrollAnimation();

  const baseStyles = {
    opacity: isVisible ? 1 : 0,
    transition: `all ${duration}s cubic-bezier(0.22, 1, 0.36, 1)`,
    transitionDelay: `${delay + index * stagger}s`,
  };

  const animationStyles: Record<string, React.CSSProperties> = {
    "fade-up": {
      ...baseStyles,
      transform: isVisible ? "translateY(0)" : "translateY(40px)",
    },
    "fade-left": {
      ...baseStyles,
      transform: isVisible ? "translateX(0)" : "translateX(-40px)",
    },
    "fade-right": {
      ...baseStyles,
      transform: isVisible ? "translateX(0)" : "translateX(40px)",
    },
    fade: {
      ...baseStyles,
    },
    scale: {
      ...baseStyles,
      transform: isVisible ? "scale(1)" : "scale(0.95)",
    },
    blur: {
      ...baseStyles,
      filter: isVisible ? "blur(0)" : "blur(8px)",
      transform: isVisible ? "translateY(0)" : "translateY(20px)",
    },
  };

  return (
    <div ref={ref} className={className} style={animationStyles[animation]}>
      {children}
    </div>
  );
};
