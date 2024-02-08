import React from "react";
import { Box, Text as Head, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Phone from "../../formComponents/Phone";
import Text from "../../formComponents/Text";
import Date from "../../formComponents/Date";
import Select0 from "../../formComponents/Select0";
import { updateBusiness } from "../../../../api/directoryApi";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const BusinessForm = React.forwardRef(
  ({ field, id, setBusiness, setBusinessSubmit }, ref) => {
    const defaultValues = field.reduce((acc, field) => {
      acc[field.field.replace(/\s+/g, "_")] = field.value;
      return acc;
    }, {});
    console.log("defaultValues is ", defaultValues);
    const toast = useToast();
    const { communityId, memberId } = useParams();
    const {
      register,
      handleSubmit,
      formState: { errors, isDirty },
    } = useForm({
      defaultValues: defaultValues,
    });
    console.log("is dirty is ", isDirty);

    const handleFormSubmit = (data) => {
      if (isDirty) {
        const updatingUser = async () => {
          try {
            if (id) {
              const res = await updateBusiness(id, data);
              if (res) {
                setBusiness(true);
                setBusinessSubmit(true);
              }
            } else {
              const createBusiness = {
                ownerId: memberId,
                ...data,
              };
              console.log("createBusiness is ", createBusiness);
              const create = async () => {
                const res = await axios.post(
                  "https://api.parivaarapp.in/business/new",
                  createBusiness
                );
                if (res) {
                  setBusiness(true);
                  setBusinessSubmit(true);
                }
              };
              create();
            }
          } catch (error) {
            console.log(error);
          }
        };
        updatingUser();
      } else {
        setBusiness(true);
        setBusinessSubmit(true);
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
            Business Information
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
                  <Date
                    text={item.text}
                    field={item.field}
                    register={register}
                  />
                )}
              </Box>
              <Box style={{ padding: "0.11rem" }}>
                {item.type === "select" && (
                  <Select0
                    register={register}
                    text={item.text}
                    field={item.field}
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
  }
);

export default BusinessForm;
