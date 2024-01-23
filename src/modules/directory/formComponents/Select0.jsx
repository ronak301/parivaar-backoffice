import React from "react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { Select as Chakraselect } from "@chakra-ui/react";
const Select0 = ({ text, register, options }) => {
  return (
    <FormControl>
      <FormLabel fontSize={"18px"} color={"black"}>
        {text}
      </FormLabel>
      <Chakraselect
        {...register(text)}
        width={"100%"}
        fontSize={"1rem"}
        fontWeight={"500"}
        p={1}
        borderRadius={"0.375rem"}
        backgroundColor={"#F5F7F9"}
        border={"0.6px solid #F0F0F0"}
      >
        {options?.map((option, key) => (
          <option key={key} value={option}>
            {option}
          </option>
        ))}
      </Chakraselect>
    </FormControl>
  );
};

export default Select0;
