import type { ReactNode } from "react";
import { Inbox } from "lucide-react";
import "./empty-state.css";

interface EmptyStateProps {
  children: ReactNode;
  className?: string;
  size?: "default" | "compact";
}

export default function EmptyState({
  children,
  className = "",
  size = "default",
}: EmptyStateProps) {
  return (
    <div className={`shared-empty-state shared-empty-state-${size} ${className}`.trim()}>
      <Inbox className="shared-empty-state-icon" strokeWidth={1.5} aria-hidden="true" />
      {children}
    </div>
  );
}