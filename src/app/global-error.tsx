"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <Card className="w-full max-w-md shadow-lg border-red-100">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Something went wrong
          </CardTitle>
          <CardDescription className="text-center">
            We encountered an error while trying to process your request
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="mt-2 text-sm break-words">
              {error.message || "An unexpected error occurred"}
              {error.digest && (
                <div className="mt-2 text-xs text-muted-foreground">
                  Error ID: {error.digest}
                </div>
              )}
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => reset()} variant="default">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
