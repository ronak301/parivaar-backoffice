import React from "react";
import { Box, Text as Head, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Phone from "../../formComponents/Phone";
import Text from "../../formComponents/Text";
import Date from "../../formComponents/Date";
import Select0 from "../../formComponents/Select0";
import { useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { updateAddress } from "../../../../api/directoryApi";
const AddressForm = React.forwardRef(({ field, id }, ref) => {
  const defaultValues = field.reduce((acc, field) => {
    acc[field.field.replace(/\s+/g, "_")] = field.value;
    return acc;
  }, {});
  console.log("defaultValues in address", defaultValues);
  const { communityId, memberId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: defaultValues,
  });
  const toast = useToast();
  console.log("address id is", id);
  const handleFormSubmit = (data) => {
    if (isDirty) {
      const updatingUser = async () => {
        try {
          if (id) {
            await updateAddress(id, data);
            toast({
              title: "Updated Address User success",
              description: "Successfully updated the user address",
              status: "success",
              duration: 1100,
              isClosable: true,
            });
          } else {
            toast({
              title: "Address does not exist",
              description: "address not found",
              status: "error",
              duration: 1100,
              isClosable: true,
            });
          }
        } catch (error) {
          console.log(error);
        }
      };
      updatingUser();
    } else {
      // console.log("Form data not modified. API not called.");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
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
          Address Information
        </Head>
        {field.map((item, index) => (
          <>
            <Box style={{ padding: "0.11rem" }}>
              {item.type === "text" && (
                <Text
                  text={item.text}
                  field={item.field}
                  errors={errors}
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
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          height={0}
        >
          <Button
            ref={ref}
            style={{
              borderRadius: "1rem",
              border: "1px solid #0777FF",
              backgroundColor: "#0777FF",
              width: "100%",
              p: "1rem",
              marginTop: "1rem",
              height: "0",
              color: "white",
              opacity: 0,
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

export default AddressForm;
