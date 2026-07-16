import { cn } from "@/lib/utils";

interface ExternalLinkButtonProps {
  text: string;
  url: string;
  className?: string;
}

export function ExternalLinkButton({ text, url, className }: ExternalLinkButtonProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-lg transition-colors",
        "bg-gray-900 text-gray-50 hover:bg-gray-800",
        "dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200",
        className
      )}
    >
      <svg
        className="w-6 h-6 group-hover:text-brand transition-colors"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M15 3h6v6" />
        <path d="M10 14 21 3" />
        <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
      </svg>
      {text}
    </a>
  );
}
