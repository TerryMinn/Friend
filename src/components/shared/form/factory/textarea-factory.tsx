import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputType } from "../Input-controller";
import { Textarea } from "@/components/ui/textarea";

const TextareaFactory = ({
  control,
  name,
  placeholder,
  label,
  des,
  row = 3,
}: InputType) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea rows={row} placeholder={placeholder} {...field} />
          </FormControl>
          {des && <FormDescription>{des}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextareaFactory;
