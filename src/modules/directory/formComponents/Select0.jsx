import React from "react";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { Select as Chakraselect } from "@chakra-ui/react";
import { mappedValue } from "../../../utils/mappLogic";

const Select0 = ({
  text,
  register,
  options,
  field,
  errors,
  dvalue,
  required,
}) => {
  let val = dvalue;

  // dvalue = mappedValue(options, dvalue);

  return (
    <FormControl
      style={{ width: "95%" }}
      isInvalid={errors[field]}
      isRequired={required}
    >
      <FormLabel color={"black"}>{text}</FormLabel>
      <Chakraselect
        {...register(field, { required: required && `${text} is required` })}
        placeholder="Select option"
        value={val}
        width={"100%"}
        borderRadius={"0.375rem"}
        backgroundColor={"#F5F7F9"}
        border={"0.6px solid #F0F0F0"}
      >
        {options?.map((option, key) => (
          <option key={key} value={option.id}>
            {option.label}
          </option>
        ))}
      </Chakraselect>
      <FormErrorMessage>
        {errors[field] && errors[field].message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default Select0;
