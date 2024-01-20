import { InputGroup, InputLeftAddon } from "@chakra-ui/react";
import React from "react";

export default function Input({ name, required }) {
  return (
    <InputGroup size="lg" mt={6}>
      <InputLeftAddon>+91</InputLeftAddon>
      <Input
        {...register(name, {
          required: required ? "This is required" : null,
          minLength: {
            value: 10,
            message: "Minimum length should be 10",
          },
        })}
        placeholder="Enter 10 digit mobile number"
      />
    </InputGroup>
  );
}
