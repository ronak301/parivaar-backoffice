import React from "react";
import { Input, FormControl, FormLabel } from "@chakra-ui/react";

const Phone = ({ text, register, errors }) => {
  return (
    <FormControl>
      <FormLabel fontSize={"18px"} color={"black"}>
        {text}
      </FormLabel>
      <Input
        {...register(text, {
          required: `${text} is required`,
          maxLength: {
            value: 10,
            message: `${text} should be 10 digits`,
          },
          pattern: {
            value: /^[0-9]{10}$/,
            message: `Invalid ${text} format`,
          },
        })}
        width={"100%"}
        fontSize={"1rem"}
        fontWeight={"500"}
        type="number"
        p={1}
        borderRadius={"0.375rem"}
        backgroundColor={"#F5F7F9"}
        border={"0.6px solid #F0F0F0"}
      />
      <span style={{ color: "red" }}>{errors[text]?.message}</span>
    </FormControl>
  );
};

export default Phone;
