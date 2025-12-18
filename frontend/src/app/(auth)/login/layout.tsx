import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Login - Task Managenment",
  description: "Login - Task Managenment",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
