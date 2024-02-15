import React from "react";
import { Box, FormLabel, Input, Image, IconButton } from "@chakra-ui/react";
import { AiOutlineUpload, AiOutlineClose } from "react-icons/ai";
import addImg from "../../../../api/836.jpg";

const UploadImage = ({
  setImageChange,
  imageChange,
  imageSrc,
  setImageSrc,
}) => {
  const uploadIconRef = React.useRef();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageChange(true);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        setImageSrc(imageData);
      };
      reader.readAsDataURL(file);
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
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {
            <Box
              position="relative"
              width="100px"
              height="100px"
              marginBottom={"1rem"}
              padding={"0.5rem"}
            >
              {imageSrc ? (
                <Image
                  boxSize="100%"
                  borderRadius="50%"
                  objectFit="cover"
                  src={imageSrc}
                  marginBottom={"0.5rem"}
                />
              ) : (
                <Image
                  boxSize="100%"
                  objectFit="cover"
                  src={addImg}
                  marginBottom={"0.5rem"}
                />
              )}
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "2rem",
                  marginBottom: "1rem",
                }}
              >
                <IconButton
                  icon={<AiOutlineClose />}
                  aria-label="Remove Image"
                  onClick={handleRemoveImage}
                  size="sm"
                  colorScheme="red"
                  variant="ghost"
                />
                <IconButton
                  icon={<AiOutlineUpload />}
                  aria-label="Upload Image"
                  size="sm"
                  variant="ghost"
                  onClick={handleUploadClick}
                />
              </Box>
            </Box>
          }
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
        </Box>
      </Box>
    </div>
  );
};

export default UploadImage;
