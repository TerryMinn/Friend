"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import InputController from "@/components/shared/form/Input-controller";
import { Form } from "@/components/ui/form";
import { useLoginMutate } from "../hook/useAuthMutate";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type LoginFormProps = {
  message?: string;
};

const LoginForm = ({ message }: LoginFormProps) => {
  const { control, formData, handleSubmit, isPending, onSubmit } =
    useLoginMutate();

  return (
    <Form {...formData}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full">
        <Card className="mx-auto w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <div className="rounded-full bg-muted p-3">
                <LockKeyhole className="h-6 w-6" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">
              Login your account
            </CardTitle>
            <CardDescription>
              Enter your credentials and login to your account.
            </CardDescription>
          </CardHeader>

          {message && (
            <div className="px-5">
              <Alert variant={message ? "destructive" : "default"}>
                <AlertTitle>Email Verify</AlertTitle>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            </div>
          )}

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <InputController
                control={control}
                name="email"
                label="Email Address"
                type="email"
                placeholder="admin@example.com"
              />
            </div>
            <div className="space-y-2">
              <InputController
                control={control}
                name="password"
                label="Password"
                type="password"
                placeholder="* * * * *"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className={`w-full disabled:opacity-50`}
              size="lg"
            >
              {isPending ? <Loader2 className="animate-spin" /> : "Login"}
            </Button>
          </CardFooter>
          <div className="text-center text-sm space-x-1">
            <span>Don&apos;t have an account ?</span>
            <span className="text-blue-500">
              <Link href="/register">Register</Link>
            </span>
          </div>
        </Card>
      </form>
    </Form>
  );
};

export default LoginForm;
