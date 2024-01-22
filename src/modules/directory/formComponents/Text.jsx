import React from "react";
import { Input, FormControl, FormLabel } from "@chakra-ui/react";

const Text = ({ text, register, errors, req = "false" }) => {
  return (
    <FormControl>
      <FormLabel fontSize={"18px"} color={"black"}>
        {text}
      </FormLabel>
      <Input
        {...register(
          text,
          req && {
            required: `${text} is required`,
          }
        )}
        width={"100%"}
        fontSize={"1rem"}
        type="text"
        fontWeight={"500"}
        p={1}
        borderRadius={"0.375rem"}
        backgroundColor={"#F5F7F9"}
        border={"0.6px solid #F0F0F0"}
      />
      <span style={{ color: "red" }}>{errors[text]?.message}</span>
    </FormControl>
  );
};

export default Text;
