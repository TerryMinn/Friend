import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { LoginT, RegisterT } from "../type";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, RegisterSchema } from "../schema/auth.schema";
import { DEFAULT_REDIRECT } from "@/constants/route";
import useToast from "@/hook/useToast";
import { RegisterUser } from "@/actions/user.action";
import { ActionState } from "@/type";

const InitialValue = {
  email: "",
  password: "",
  name: "",
  confirmPassword: "",
};

const LoginAction = async (
  state: ActionState,
  payload: { email: string; password: string }
) => {
  try {
    const res = await signIn("credentials", {
      email: payload.email,
      password: payload.password,
      redirect: false,
    });

    if (!res?.ok) {
      throw new Error(res!.error as string);
    }

    return {
      con: true,
      message: "Login success",
    };
  } catch (e) {
    console.log(e);
    return {
      con: false,
      message: e instanceof Error ? e.message : "Something went wrong",
    };
  }
};

export const useLoginMutate = () => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(LoginAction, {
    con: false,
    message: "",
  });

  useToast({ state });

  const formData = useForm<LoginT>({
    defaultValues: InitialValue,
    resolver: zodResolver(LoginSchema),
  });

  const { control, handleSubmit, reset } = formData;

  const onSubmit = async (data: LoginT) => {
    try {
      startTransition(() => {
        formAction({
          email: data.email,
          password: data.password,
        });
      });
    } catch (e) {
      console.log(e);
    } finally {
      reset(InitialValue);
    }
  };

  useEffect(() => {
    if (state?.con === true) {
      router.replace(DEFAULT_REDIRECT);
    }
  }, [state, router]);

  return { control, handleSubmit, onSubmit, isPending, formData, state };
};

export const useRegitserMutate = () => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(RegisterUser, {
    con: false,
    message: "",
  });

  useToast({ state });

  const formData = useForm<RegisterT>({
    defaultValues: InitialValue,
    resolver: zodResolver(RegisterSchema),
  });

  const { control, handleSubmit, reset } = formData;

  const onSubmit = async (data: RegisterT) => {
    try {
      startTransition(() => {
        formAction(data);
      });
    } catch (e) {
      console.log(e);
    } finally {
      reset(InitialValue);
    }
  };

  useEffect(() => {
    if (state.con === true) {
      router.replace("/login");
    }
  }, [state, router]);

  return { control, handleSubmit, onSubmit, isPending, formData, state };
};
