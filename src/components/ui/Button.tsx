import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { Link } from "react-router-dom";
import type { LinkProps } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface StyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-red text-white hover:bg-red-hover",
  secondary:
    "border border-border-strong bg-surface-raised text-text hover:bg-surface-hover",
  ghost: "text-text-secondary hover:bg-surface-hover hover:text-text",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

/** Shared by Button and ButtonLink so every button looks the same. */
export function buttonStyles(
  { variant = "primary", size = "md", fullWidth }: StyleOptions = {},
  className?: string,
) {
  return cn(
    "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-control font-semibold",
    "transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );
}

interface ButtonProps
  extends StyleOptions, ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  leftIcon?: ReactNode;
}

export function Button({
  variant,
  size,
  fullWidth,
  loading,
  leftIcon,
  className,
  children,
  disabled,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonStyles({ variant, size, fullWidth }, className)}
      {...rest}
    >
      {loading ? (
        <Loader2
          className="h-4 w-4 motion-safe:animate-spin"
          aria-hidden="true"
        />
      ) : (
        leftIcon
      )}
      {children}
    </button>
  );
}

interface ButtonLinkProps extends StyleOptions, LinkProps {
  leftIcon?: ReactNode;
}

export function ButtonLink({
  variant,
  size,
  fullWidth,
  leftIcon,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link
      className={buttonStyles({ variant, size, fullWidth }, className)}
      {...rest}
    >
      {leftIcon}
      {children}
    </Link>
  );
}

interface ButtonAnchorProps
  extends StyleOptions, AnchorHTMLAttributes<HTMLAnchorElement> {
  leftIcon?: ReactNode;
}

/** A button-styled link to an external site; always opens in a new tab. */
export function ButtonAnchor({
  variant,
  size,
  fullWidth,
  leftIcon,
  className,
  children,
  ...rest
}: ButtonAnchorProps) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={buttonStyles({ variant, size, fullWidth }, className)}
      {...rest}
    >
      {leftIcon}
      {children}
    </a>
  );
}
