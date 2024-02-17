import React from "react";
import { Box, FormLabel, Input, Image, IconButton } from "@chakra-ui/react";
import { AiOutlineUpload, AiOutlineClose } from "react-icons/ai";
import addImg from "../../../../api/836.jpg";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";

const UploadImage = ({
  setImageChange,
  imageChange,
  imageSrc,
  setImageSrc,
}) => {
  const uploadIconRef = React.useRef();
  const handleImageChange = (e) => {
    console.log("hi");
    const file = e.target.files[0];
    console.log(file);
    setImageChange(true);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        setImageSrc(imageData);
      };
      reader.readAsDataURL(file);
      e.target.value = null;
    }
  };

  const handleRemoveImage = () => {
    setImageChange(true);
    setImageSrc(null);
  };
  const handleUploadClick = () => {
    uploadIconRef.current.click();
  };
  return (
    <div>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          paddingBottom: "1.2rem",
        }}
      >
        <FormLabel color={"black"}>Profile Picture</FormLabel>
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={uploadIconRef}
          height="0%"
          width="0%"
          position="absolute"
          opacity="0"
          aria-hidden="true"
        />
        <Box
          style={{
            display: "flex",
            flexDirection: "column",

            width: "100%",
            borderRadius: "0.375rem",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <Box
            style={{
              display: "flex",
              border: "1px solid #EAEAEA",
              borderRadius: "1rem",
              margin: "0.4rem",
              width: "45%",
              alignItems: "center",
              flexDirection: "column",
              padding: "0.4rem",
            }}
          >
            <Image
              boxSize="100px"
              borderRadius="50%"
              objectFit="cover"
              src={imageSrc || addImg}
              marginBottom={"0.5rem"}
            />
            <Box
              style={{
                display: "flex",

                gap: "0.4rem",
              }}
            >
              <IconButton
                aria-label="Remove image"
                icon={<DeleteOutlined />}
                onClick={handleRemoveImage}
                variant="ghost"
                size="md"
              />
              <IconButton
                aria-label="Upload image"
                icon={<UploadOutlined />}
                onClick={handleUploadClick}
                variant="ghost"
                size="md"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default UploadImage;
