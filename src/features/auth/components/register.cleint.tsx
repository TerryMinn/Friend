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
import { useRegitserMutate } from "../hook/useAuthMutate";
import Link from "next/link";

const RegisterForm = () => {
  const { control, formData, handleSubmit, isPending, onSubmit, state } =
    useRegitserMutate();
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
              Register your account
            </CardTitle>
            <CardDescription>
              Enter your credentials to create a new account.
            </CardDescription>
          </CardHeader>

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
                name="name"
                label="Name"
                type="text"
                placeholder="John Doe"
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
            <div className="space-y-2">
              <InputController
                control={control}
                name="confirmPassword"
                label="Confirm Password"
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
              {isPending ? <Loader2 className="animate-spin" /> : "Register"}
            </Button>
          </CardFooter>
          <div className="text-center text-sm space-x-1">
            <span>you already have account ?</span>
            <span className="text-blue-500">
              <Link href="/login">Login</Link>
            </span>
          </div>
        </Card>
      </form>
    </Form>
  );
};

export default RegisterForm;
