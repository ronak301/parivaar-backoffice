import React from "react";
import { Box, Button, Text as Head } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Phone from "../formComponents/Phone";
import Text from "../formComponents/Text";
import Date from "../formComponents/Date";

import Select0 from "../formComponents/Select0";

const EditUserForm = ({ field }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "100%" }}
        display={"flex"}
        alignItems={"flex-start"}
      >
        <Head
          style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            marginBottom: "2rem",
          }}
        >
          Edit User
        </Head>
        {field.map((item, index) => (
          <>
            <Box style={{ padding: "0.11rem" }}>
              {item.type === "text" && (
                <Text
                  text={item.text}
                  errors={errors}
                  req={item.req || false}
                  register={register}
                />
              )}
            </Box>
            <Box style={{ padding: "0.11rem" }}>
              {item.type === "phone" && (
                <Phone text={item.text} errors={errors} register={register} />
              )}
            </Box>
            <Box style={{ padding: "0.11rem" }}>
              {item.type === "date" && (
                <Date text={item.text} register={register} />
              )}
            </Box>
            <Box style={{ padding: "0.11rem" }}>
              {item.type === "select" && (
                <Select0
                  register={register}
                  text={item.text}
                  options={item.options}
                />
              )}
            </Box>
          </>
        ))}
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Button
            style={{
              borderRadius: "1rem",
              border: "1px solid #0777FF",
              backgroundColor: "#0777FF",
              width: "100%",
              p: "1rem",
              marginTop: "1rem",
              color: "white",
            }}
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
};

export default EditUserForm;
