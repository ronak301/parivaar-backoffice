import React from "react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { Select as Chakraselect } from "@chakra-ui/react";
const Select0 = ({ text, register, options, field, onChange }) => {
  return (
    <FormControl style={{ width: "95%" }}>
      <FormLabel color={"black"}>{text}</FormLabel>
      <Chakraselect
        {...register(field)}
        width={"100%"}
        p={2}
        borderRadius={"0.375rem"}
        backgroundColor={"#F5F7F9"}
        border={"0.6px solid #F0F0F0"}
        onChange={onChange}
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
