import React from "react";
import { Box, Text as Head } from "@chakra-ui/react";
import Text from "../../formComponents/Text";
import Phone from "../../formComponents/Phone";
import Select0 from "../../formComponents/Select0";
import DateInput from "../../formComponents/Date";
import Pincode from "../../formComponents/Pincode";
import Email from "../../formComponents/Mail";

const FieldForm = ({ field, register, errors, header }) => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {header && (
        <Box
          width={"95%"}
          marginInline={"auto"}
          paddingBottom={"0.5rem"}
          paddingTop={"0.5rem"}
        >
          <Head
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              paddingBottom: "0.25rem",
            }}
          >
            {header}
          </Head>
        </Box>
      )}
      {field?.map((item, index) => (
        <Box>
          <Box
            style={{
              padding: "0.11rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {item.type === "text" && (
              <Text
                text={item.text}
                errors={errors}
                field={item.field}
                req={item.req || false}
                register={register}
              />
            )}
          </Box>

          <Box
            style={{
              padding: "0.11rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {item.type === "phone" && (
              <Phone
                text={item.text}
                field={item.field}
                req={item.req}
                errors={errors}
                register={register}
              />
            )}
          </Box>
          <Box
            style={{
              padding: "0.11rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {item.type === "mail" && (
              <Email
                text={item.text}
                field={item.field}
                req={item.req}
                errors={errors}
                register={register}
              />
            )}
          </Box>
          <Box
            style={{
              padding: "0.11rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {item.type === "pincode" && (
              <Pincode
                text={item.text}
                field={item.field}
                req={item.req}
                errors={errors}
                register={register}
              />
            )}
          </Box>
          <Box
            style={{
              padding: "0.11rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {item.type === "date" && (
              <DateInput
                text={item.text}
                field={item.field}
                register={register}
              />
            )}
          </Box>
          <Box
            style={{
              padding: "0.11rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {item.type === "select" && (
              <Select0
                register={register}
                errors={errors}
                required={item?.required}
                field={item?.field}
                dvalue={item?.value}
                text={item?.text}
                options={item?.options}
              />
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default FieldForm;
