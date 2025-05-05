import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputType } from "../Input-controller";
import { DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";

const CheckBoxFactory = ({
  control,
  name,
  label,
  des,
  checkLP = "left",
}: InputType) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex  items-center gap-2">
            {checkLP === "left" && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <DropdownMenuCheckboxItem
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            {checkLP === "right" && <FormLabel>{label}</FormLabel>}
          </div>

          {des && <FormDescription>{des}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CheckBoxFactory;
