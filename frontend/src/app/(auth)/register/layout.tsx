import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sign Up - Task Managenment",
  description: "Sign Up - Task Managenment",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
