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
import { FormEventHandler, useState } from "react";
import SingleUploadImage from "./SingleUploadImage";
import toast from "react-hot-toast";
import { API } from "@/services/api";
import { useRouter } from "next/navigation";

export function NewGameCard() {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    url: "",
    image: null as any,
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (!inputs.image) {
      toast.error("Please select cover photo");
      return;
    }
    const form = new FormData();

    form.set("title", inputs.title);
    form.set("description", inputs.description);
    form.set("url", inputs.url);
    form.set("image", inputs.image);

    setLoading(true);
    API.postGame(form)
      .then(({ id }) => {
        toast.success("New game posted");
        router.push("/game/" + id);
      })
      .catch((er) => {
        console.error(er);
        toast.error("Failed to post game, try again");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Flex
      maxW="600px"
      gap={4}
      w="full"
      mx="auto"
      as={"form"}
      flexDir={"column"}
      onSubmit={handleSubmit}
    >
      <Heading>New Game</Heading>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input
          name="title"
          isRequired
          minLength={3}
          placeholder="Enter title of the game"
          variant={"ghost"}
          bg="hsl(60 28% 86% / 1)"
          value={inputs.title}
          onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea
          isRequired
          minLength={3}
          name="description"
          placeholder="Enter brief description of the game"
          rows={4}
          variant={"ghost"}
          bg="hsl(60 28% 86% / 1)"
          value={inputs.description}
          onChange={(e) =>
            setInputs({ ...inputs, description: e.target.value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>URL</FormLabel>
        <Input
          isRequired
          minLength={3}
          type="url"
          name="url"
          placeholder="Enter URL for the game such as store URL"
          variant={"ghost"}
          bg="hsl(60 28% 86% / 1)"
          value={inputs.url}
          onChange={(e) => setInputs({ ...inputs, url: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Cover Image</FormLabel>

        <SingleUploadImage
          onUpdateFile={(file) => {
            setInputs({ ...inputs, image: file });
          }}
        />
      </FormControl>
      <Button type="submit" colorScheme="blackAlpha" bg="black">
        Submit
      </Button>
    </Flex>
  );
}
