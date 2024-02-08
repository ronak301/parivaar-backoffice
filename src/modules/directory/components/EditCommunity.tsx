import React from "react";
import { Box, Text as Head, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Phone from "../formComponents/Phone";
import Text from "../formComponents/Text";
import Date from "../formComponents/Date";

import Select0 from "../formComponents/Select0";
import { useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { updateCommunity } from "../../../api/directoryApi";

import Loading from "../../../components/Loading";

const EditCommunity = ({ field, onClose }) => {
  const toast = useToast();
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

  const { id } = useParams();
  const onSubmit = async (data) => {
    try {
      const formData = {
        name: data?.name,
        description: data?.description,
        type: data?.type,
        subType: data?.subtype,
      };
      if (isDirty) {
        console.log(formData);
        console.log(id);
        const res = await updateCommunity(id, formData);

        if (res) {
          toast({
            title: "Edit Community",
            description: "Community was successfully Edited",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          onClose();
        }
      } else {
        onClose();
        toast({
          title: "Edit Community",
          description: "Community was successfully Edited",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Edit Community Error",
        description: "There was an error editing the community",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      onClose();
    }
  };

  const [loading, setLoading] = React.useState(false);
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: "100%",
          marginTop: "1rem",
          marginBottom: "1rem",
        }}
      >
        <Head
          style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            marginBottom: "2rem",
          }}
        >
          Edit Community
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
                  onChange={item.onChange}
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
              position: "sticky",
              marginTop: "4rem",
              width: "95%",

              color: "white",
            }}
            type="submit"
          >
            Edit Community
          </Button>
        </Box>
      </form>
    </>
  );
};

export default EditCommunity;
