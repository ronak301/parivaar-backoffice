import React from "react";
import { Input, FormControl, FormLabel } from "@chakra-ui/react";
const DateInput = ({ text, register, field }) => {
  return (
    <FormControl>
      <FormLabel color={"black"}>{text}</FormLabel>
      <Input
        {...register(field)}
        type="date"
        data-date-format="YYYY-MM-DD"
        width={"100%"}
        p={1.5}
        borderRadius={"0.375rem"}
        backgroundColor={"#F5F7F9"}
        border={"0.6px solid #F0F0F0"}
      />
    </FormControl>
  );
};

export default DateInput;
