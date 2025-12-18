"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import useRegister from "./useRegister";
import Link from "next/link";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const { errors, handleRegister, handleSubmit, isPendingRegister, register } =
    useRegister();

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleRegister)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                {...register("fullname")}
                id="name"
                type="text"
                placeholder="John Doe"
              />
              {!!errors.fullname && (
                <FieldDescription className="text-red-500">
                  {errors.fullname.message}
                </FieldDescription>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                {...register("username")}
                id="username"
                type="text"
                placeholder="johndoe123"
              />
              {!!errors.username && (
                <FieldDescription className="text-red-500">
                  {errors.username.message}
                </FieldDescription>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="m@example.com"
              />
              {!!errors.email && (
                <FieldDescription className="text-red-500">
                  {errors.email.message}
                </FieldDescription>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input {...register("password")} id="password" type="password" />
              {!!errors.password && (
                <FieldDescription className="text-red-500">
                  {errors.password.message}
                </FieldDescription>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                {...register("password_confirmation")}
                id="confirm-password"
                type="password"
              />
              {!!errors.password_confirmation && (
                <FieldDescription className="text-red-500">
                  {errors.password_confirmation.message}
                </FieldDescription>
              )}
            </Field>
            <FieldGroup>
              <Field>
                <Button
                  type="submit"
                  disabled={isPendingRegister}
                  className="cursor-pointer"
                >
                  {isPendingRegister ? "Loading..." : "Create Account"}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link href="/login">Sign In</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
