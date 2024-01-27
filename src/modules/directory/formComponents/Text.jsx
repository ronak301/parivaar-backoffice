import React from "react";
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";

const Text = ({ text, register, errors, req = "false", field }) => {
  return (
    <FormControl isRequired={req} isInvalid={errors.text}>
      <FormLabel color={"black"}>{text}</FormLabel>
      <Input
        {...register(
          field,
          req && {
            required: `${text} is required`,
          }
        )}
        width={"100%"}
        type="text"
        p={2}
        
        borderRadius={"0.375rem"}
        backgroundColor={"#F5F7F9"}
        border={"0.6px solid #F0F0F0"}
      />
      <FormErrorMessage>
        {!!errors.field && errors.field.message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default Text;
