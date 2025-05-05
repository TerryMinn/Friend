import { ActionState } from "@/type";
import { SignInResponse } from "next-auth/react";
import { useEffect } from "react";
import { toast } from "sonner";

interface ToastProps {
  state: ActionState;
}

/**
 * Custom hook for displaying toast notifications based on action state
 * @param {Object} props - The props object
 * @param {ActionState} props.state - The action state containing message and condition
 * @returns {void} This hook doesn't return anything
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const state = { message: "Operation completed", con: true };
 *   useToast({ state });
 *   return <div>...</div>;
 * };
 * ```
 */

const useToast = ({ state }: ToastProps): void => {
  useEffect(() => {
    if (!state || !state.message || state.message.length === 0) {
      return;
    }

    const toastConfig = {
      description: state.message,
    };

    if (state.con) {
      toast.success("Success", toastConfig);
    } else {
      toast.error("Error", toastConfig);
    }
  }, [state]);
};

export default useToast;
