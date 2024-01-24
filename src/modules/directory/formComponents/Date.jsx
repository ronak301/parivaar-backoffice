import React from "react";
import { Input, FormControl, FormLabel } from "@chakra-ui/react";
const Date = ({ text, register, field }) => {
  return (
    <FormControl>
      <FormLabel fontSize={"18px"} color={"black"}>
        {text}
      </FormLabel>
      <Input
        {...register(field)}
        width={"100%"}
        fontSize={"1rem"}
        fontWeight={"500"}
        p={1}
        borderRadius={"0.375rem"}
        backgroundColor={"#F5F7F9"}
        border={"0.6px solid #F0F0F0"}
      />
    </FormControl>
  );
};

export default Date;
