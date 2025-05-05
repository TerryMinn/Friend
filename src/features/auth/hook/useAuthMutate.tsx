import { signIn, SignInResponse } from "next-auth/react";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { LoginT, RegisterT } from "../type";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, RegisterSchema } from "../schema/auth.schema";
import { DEFAULT_REDIRECT } from "@/constants/route";
import useToast from "@/hook/useToast";
import { RegisterUser } from "@/actions/user.action";

const InitialValue = {
  email: "",
  password: "",
};

const LoginAction = async (
  state: SignInResponse | undefined,
  payload: { email: string; password: string }
) => {
  try {
    return await signIn("credentials", {
      email: payload.email,
      password: payload.password,
      redirect: false,
    });
  } catch (e) {
    console.log(e);
  }
};

export const useLoginMutate = () => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(LoginAction, undefined);

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
    if (state?.ok === true) {
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
