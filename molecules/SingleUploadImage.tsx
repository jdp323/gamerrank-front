import { AddIcon } from "@chakra-ui/icons";
import {
  Center,
  Image,
  ScaleFade,
  Text,
  VStack,
  chakra,
} from "@chakra-ui/react";
import React, { useState } from "react";

/**
 * SingleUploadImage Component
 *
 * This component provides a user-friendly interface for uploading a single image.
 * It includes an option to preview the selected image and supports customization for size and rounding.
 *
 * @component
 *
 * @props {string} [size='100px'] - Specifies the dimensions of the upload area.
 * @props {string} [rounded='full'] - Defines the border-radius for the upload area, creating rounded corners.
 * @props {function} onUpdateFile (Required) - A callback function invoked when a new image is selected.
 *                                              It receives the selected image file as a parameter.
 *
 * @example
 * // Usage Example
 * <SingleUploadImage
 *   size="150px"
 *   rounded="md"
 *   onUpdateFile={handleFileUpdate}
 * />
 *
 * @example
 * // Import Example
 * import { SingleUploadImage } from './path-to-components';
 *
 * const YourComponent = () => {
 *   const handleFileUpdate = (file) => {
 *     // Handle the selected file (e.g., upload to server, update state)
 *     console.log('Selected File:', file);
 *   };
 *
 *   return (
 *     <SingleUploadImage
 *       size="150px"
 *       rounded="md"
 *       onUpdateFile={handleFileUpdate}
 *     />
 *   );
 * };
 */

const SingleUploadImage = ({
  size = "160px",
  rounded = "10%",
  onUpdateFile,
}: {
  size?: string;
  rounded?: string;
  onUpdateFile: (File: File) => void;
}) => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setUploadedFile(file);
    onUpdateFile(file);
  };

  return (
    <Center
      w={size}
      h={size}
      as={chakra.label}
      htmlFor="file"
      bg="whiteAlpha.500"
      border="1px dashed gray"
      rounded={rounded}
      cursor="pointer"
      overflow="hidden"
      position="relative"
    >
      <Center
        position="absolute"
        w="100%"
        h="100%"
        _hover={{ bg: "blackAlpha.300" }}
      >
        <VStack>
          <AddIcon />
          <Text>Upload</Text>
        </VStack>
      </Center>

      {uploadedFile && (
        <ScaleFade initialScale={0.9} in={uploadedFile !== null}>
          <Image
            w="100%"
            h={"100%"}
            src={URL.createObjectURL(uploadedFile)}
            alt="Uploaded"
            rounded={rounded}
          />
        </ScaleFade>
      )}

      <chakra.input
        required
        style={{ display: "none" }}
        type="file"
        id="file"
        name="file"
        onChange={handleFileChange}
      />
    </Center>
  );
};

export default SingleUploadImage;
