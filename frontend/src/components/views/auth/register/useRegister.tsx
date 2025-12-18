"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { registerSchema, RegisterSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import instance from "@/lib/axios";
import { IRegisterFieldError } from "@/types/auth/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

const useRegister = () => {
  const BASE = "/register";

  const ENDPOINT = {
    register: `${BASE}`,
  };

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const registerService = async (payload: RegisterSchema) => {
    const res = await instance.post(ENDPOINT.register, {
      username: payload.username,
      name: payload.fullname,
      email: payload.email,
      password: payload.password,
      password_confirmation: payload.password_confirmation,
    });

    return res;
  };

  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: registerService,
    onError: (e: AxiosError<IRegisterFieldError>) => {
      toast.error(e.response?.data?.message ?? e.message ?? "Something Wrong");
    },
    onSuccess: () => {
      reset();
      toast.success("Register successfull please login");
      router.push("/login");
    },
  });

  const handleRegister = (data: RegisterSchema) => mutateRegister(data);

  return {
    register,
    handleSubmit,
    errors,
    reset,
    handleRegister,
    isPendingRegister,
  };
};

export default useRegister;
