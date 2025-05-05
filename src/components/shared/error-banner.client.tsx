"use client";

import { useState, useEffect } from "react";
import { AlertCircle, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorBannerProps {
  show: boolean;
  message: string | undefined | null;
  clean: () => void;
  title?: string;
  variant?: "default" | "destructive";
  className?: string;
  autoHideDuration?: number | null;
}

export default function ErrorBanner({
  show,
  message,
  title = "Error",
  variant = "destructive",
  className,
  autoHideDuration = 5000,
  clean,
}: ErrorBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
    }

    if (autoHideDuration !== null) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [autoHideDuration, show]);

  const handleDismiss = () => {
    setIsVisible(false);
    clean();
  };

  if (!isVisible) return null;

  return (
    <Alert
      variant={variant}
      className={cn(
        "mb-6 animate-in fade-in slide-in-from-top-5 duration-300 w-full relative",
        className
      )}
      role="alert"
    >
      <AlertCircle className="h-5 w-5" />
      <AlertTitle className="font-medium">{title}</AlertTitle>
      <AlertDescription className="text-sm text-red-500">
        {message ?? "An error occurred..."}
      </AlertDescription>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 rounded-full opacity-70 ring-offset-background transition-opacity hover:opacity-100 absolute right-0"
        onClick={handleDismiss}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Dismiss</span>
      </Button>
    </Alert>
  );
}
