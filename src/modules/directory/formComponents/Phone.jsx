import React from "react";
import { Input, FormControl, FormLabel } from "@chakra-ui/react";

const Phone = ({ text, register, errors, field, req }) => {
  return (
    <FormControl style={{ width: "95%" }}>
      <FormLabel color={"black"}>{text}</FormLabel>
      <Input
        {...register(field, {
          required: req && `${text} is required`,
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
        type="number"
        p={1.5}
        borderRadius={"0.375rem"}
        backgroundColor={"#F5F7F9"}
        border={"0.6px solid #F0F0F0"}
      />
      <span style={{ color: "red" }}>{errors[field]?.message}</span>
    </FormControl>
  );
};

export default Phone;
