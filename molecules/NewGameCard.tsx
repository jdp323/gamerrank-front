"use client";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import SingleUploadImage from "./SingleUploadImage";
export function NewGameCard() {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    url: "",
    image: null as any,
  });

  return (
    <Flex
      maxW="600px"
      gap={4}
      w="full"
      mx="auto"
      as={"form"}
      flexDir={"column"}
    >
      <Heading>New Game</Heading>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input placeholder="Enter title of the game" borderColor={"black"} />
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea
          placeholder="Enter brief description of the game"
          rows={4}
          borderColor={"black"}
        />
      </FormControl>
      <FormControl>
        <FormLabel>URL</FormLabel>
        <Input
          placeholder="Enter URL for the game such as store URL"
          borderColor={"black"}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Cover Image</FormLabel>
        {/* <Input
          type="file"
          onChange={(e) => setInputs({ ...inputs, image: e.target.files![0] })}
        /> */}
        <SingleUploadImage onUpdateFile={(f) => {}} />
      </FormControl>
      <Button type="submit" colorScheme="blackAlpha" bg="black">
        Submit
      </Button>
    </Flex>
  );
}
