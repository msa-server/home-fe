import React from "react";

interface TooltipButtonProps {
    icon: React.ReactNode;
    label: string;
    tooltip: string;
    onClick?: () => void;
}


export function TooltipButton({icon, label, tooltip, onClick}: TooltipButtonProps) {
    return (
        <div className="relative group inline-block">
            <button
                type="button"
                onClick={onClick}
                aria-label={label}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-700 transition"
      >
        {icon}
      </button>
      <span
        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap
                   rounded bg-gray-800 text-white text-xs px-2 py-1 opacity-0
                   group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
      >
        {tooltip}
      </span>
        </div>
    );
}