"use client";
import { useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import instance from "@/lib/axios";
import { ILoginResponse } from "@/types/auth/auth";
import { signIn } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useLogin = () => {
  // Endpoint
  const BASE = "/login";

  const ENDPOINT = {
    login: `${BASE}`,
  };

  //   Router
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const loginService = async (payload: LoginSchema) => {
    const res = await instance.post(ENDPOINT.login, {
      email: payload.email,
      password: payload.password,
    });

    const data: ILoginResponse = res.data;

    const nextAuthRes = await signIn("credentials", {
      redirect: false,
      username: data.data.username,
      email: data.data.email,
      name: data.data.name,
      accessToken: data.data.access_token,
    });

    if (nextAuthRes?.error) {
      throw new Error("Email atau password salah");
    }

    return res;
  };

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: loginService,
    onError: (e: AxiosError<ILoginResponse>) => {
      toast.error(e.response?.data?.message ?? e.message ?? "Something Wrong");
    },
    onSuccess: () => {
      reset();
      toast.success("Berhasil login");
      router.push("/dashboard");
    },
  });

  const handleLogin = (data: LoginSchema) => mutateLogin(data);

  return {
    register,
    handleSubmit,
    errors,
    reset,
    handleLogin,
    isPendingLogin,
  };
};

export default useLogin;
