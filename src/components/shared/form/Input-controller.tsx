import { Control, FieldValues } from "react-hook-form";
import { Input, Password, CheckBox, Textarea } from "./factory";

export type InputType<T extends FieldValues = FieldValues> = {
  type?: "email" | "password" | "text" | "checkbox" | "textarea";
  label?: string;
  placeholder?: string;
  control: Control<T>;
  name: keyof T;
  des?: string;
  checkLP?: "left" | "right";
  row?: number;
};

const InputController = <T extends FieldValues>({
  type,
  ...props
}: InputType<T>) => {
  const renderInput = ({ type, control, name, ...props }: InputType<T>) => {
    switch (type) {
      case "email":
        return (
          <Input
            {...props}
            control={control as Control<FieldValues>}
            name={name as string}
          />
        );
      case "password":
        return (
          <Password
            {...props}
            control={control as Control<FieldValues>}
            name={name as string}
          />
        );
      case "checkbox":
        return (
          <CheckBox
            {...props}
            control={control as Control<FieldValues>}
            name={name as string}
          />
        );
      case "textarea":
        return (
          <Textarea
            {...props}
            control={control as Control<FieldValues>}
            name={name as string}
          />
        );
      default:
        return (
          <Input
            {...props}
            control={control as Control<FieldValues>}
            name={name as string}
          />
        );
    }
  };

  return <>{renderInput({ type, ...props })}</>;
};

export default InputController;
