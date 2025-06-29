import React from "react";
import { cn } from "@/lib/utils";

export interface StepperProps {
  steps: string[];
  currentStep: number; // zero-based index
  className?: string;
}

const accent = "#156450";

const Stepper: React.FC<StepperProps> = ({ steps, currentStep, className }) => {
  return (
    <div className={cn("flex items-center justify-between w-full", className)}>
      {steps.map((label, idx) => {
        const isCompleted = idx < currentStep;
        const isActive = idx === currentStep;
        return (
          <React.Fragment key={idx}>
            <div className="flex flex-col items-center text-center min-w-[80px]">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold border-2",
                  isActive
                    ? `bg-[${accent}] text-white border-[${accent}]`
                    : isCompleted
                    ? `bg-[${accent}] text-white border-[${accent}] opacity-70`
                    : "text-gray-400 border-gray-300"
                )}
              >
                {idx + 1}
              </div>
              <span
                className={cn(
                  "mt-1 text-xs", 
                  isActive ? `text-[${accent}] font-medium` : "text-gray-500"
                )}
              >
                {label}
              </span>
            </div>
            {idx !== steps.length - 1 && (
              <div className="flex-1 h-px bg-gray-300 mx-2" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Stepper;
