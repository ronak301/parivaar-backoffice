import React from "react";
import { Box, Text as Head, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Phone from "../../formComponents/Phone";
import Text from "../../formComponents/Text";
import Date from "../../formComponents/Date";
import { updateUser } from "../../../../api/authApi";
import Select0 from "../../formComponents/Select0";
import { useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
const Personal = React.forwardRef(({ field }, ref) => {
  const toast = useToast();

  const { communityId, memberId } = useParams();
  const defaultValues = field.reduce((acc, field) => {
    acc[field.field.replace(/\s+/g, "_")] = field.value;
    return acc;
  }, {});

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: defaultValues,
  });

  const onSubmit = (data) => {
    if (isDirty) {
      const updatingUser = async () => {
        try {
          await updateUser(memberId, data);
          toast({
            title: "Updated User success",
            description: "Successfully updated the user profile",
            status: "success",
            duration: 1100,
            isClosable: true,
          });
        } catch (error) {
          console.log(error);
        }
      };
      updatingUser();
    } else {
      //
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: "100%",
          marginTop: "1rem",
          marginBottom: "1rem",
        }}
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
          Personal Information
        </Head>
        {field.map((item, index) => (
          <>
            <Box style={{ padding: "0.11rem" }}>
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
            <Box style={{ padding: "0.11rem" }}>
              {item.type === "phone" && (
                <Phone
                  text={item.text}
                  field={item.field}
                  errors={errors}
                  register={register}
                />
              )}
            </Box>
            <Box style={{ padding: "0.11rem" }}>
              {item.type === "date" && (
                <Date text={item.text} field={item.field} register={register} />
              )}
            </Box>
            <Box style={{ padding: "0.11rem" }}>
              {item.type === "select" && (
                <Select0
                  register={register}
                  field={item.field}
                  text={item.text}
                  options={item.options}
                />
              )}
            </Box>
          </>
        ))}

        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Button
            ref={ref}
            style={{
              borderRadius: "1rem",
              border: "1px solid #0777FF",
              backgroundColor: "#0777FF",
              width: "100%",
              p: "1rem",
              marginTop: "1rem",
              color: "white",
              opacity: 0,
              height: "0",
            }}
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
});

export default Personal;
