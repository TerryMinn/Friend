import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputType } from "../Input-controller";

import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const PasswordFactory = ({
  control,
  name,
  placeholder,
  des,
  label,
}: InputType) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="mt-3">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div
              tabIndex={0}
              className="flex justify-between items-center group focus-within:ring-1 focus-within:ring-ring border border-input rounded-md  shadow-sm pr-2 dark:bg-input/30"
            >
              <Input
                className="border-none focus-within:bg-transparent dark:bg-transparent outline-none shadow-none focus-visible:ring-0 focus-within:ring-0"
                type={show ? "text" : "password"}
                placeholder={placeholder}
                {...field}
              />
              {show ? (
                <EyeClosedIcon
                  className="text-muted-foreground group-focus-within:text-ring cursor-pointer"
                  size={18}
                  onClick={() => setShow(false)}
                />
              ) : (
                <EyeIcon
                  className="text-muted-foreground group-focus-within:text-ring cursor-pointer"
                  size={18}
                  onClick={() => setShow(true)}
                />
              )}
            </div>
          </FormControl>
          {des && <FormDescription>{des}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PasswordFactory;
