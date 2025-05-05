import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputType } from "../Input-controller";
import { Input } from "@/components/ui/input";

const InputFactory = ({
  control,
  name,
  placeholder,
  label,
  des,
  type,
}: InputType) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} />
          </FormControl>
          {des && <FormDescription>{des}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputFactory;
