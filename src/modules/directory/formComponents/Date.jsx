import React from "react";
import { Input, FormControl, FormLabel } from "@chakra-ui/react";
const Date = ({ text, register, field }) => {
  return (
    <FormControl>
      <FormLabel color={"black"}>{text}</FormLabel>
      <Input
        {...register(field)}
        width={"100%"}
        p={2}
        borderRadius={"0.375rem"}
        backgroundColor={"#F5F7F9"}
        border={"0.6px solid #F0F0F0"}
      />
    </FormControl>
  );
};

export default Date;
