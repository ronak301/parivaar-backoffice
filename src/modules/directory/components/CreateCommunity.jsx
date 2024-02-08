import React from "react";
import { Box, Text as Head, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Phone from "../formComponents/Phone";
import Text from "../formComponents/Text";
import Date from "../formComponents/Date";

import Select0 from "../formComponents/Select0";
import { useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import Loading from "../../../components/Loading";
import { createCommunity } from "../../../api/directoryApi";

const CreateCommunity = ({ field, onClose }) => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({});

  const { communityId, memberId } = useParams();
  const onSubmit = async (data) => {
    try {
      const formData = {
        name: data?.name,
        description: data?.description,
        type: data?.type,
        subType: data?.subtype,
        status: "Inactive",
      };

      const res = await createCommunity(formData);
      if (res) {
        toast({
          title: "Created Community",
          description: "Community was successfully created",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        onClose();
      }
    } catch (error) {
      toast({
        title: "Create Community Error",
        description: "There was an error creating the community",
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
          Create Community
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
              p: "1rem",
              color: "white",
            }}
            type="submit"
          >
            Create Community
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateCommunity;
