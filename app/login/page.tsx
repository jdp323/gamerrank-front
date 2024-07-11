"use client";
import { API } from "@/services/api";
import { Button, Divider, Flex, Heading, Input } from "@chakra-ui/react";

import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import axios, { isAxiosError } from "axios";
import Link from "next/link";
import { FormEventHandler, useState } from "react";
import toast from "react-hot-toast";
import { PiGameControllerFill } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
export default function LoginPage() {
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const user = useUser();
  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const { token } = await API.loginUser(inputs.username, inputs.password);
      localStorage.setItem("token", token);
      toast.success("Login successful");
      router.replace("/");
      user.refetch();
    } catch (er) {
      console.log(er);
      if (isAxiosError(er) && er.response?.data.error) {
        toast.error(er.response?.data.error);
      } else toast.error("Failed to login, try again");
    } finally {
      setLoading(false);
    }

    return false;
  };

  return (
    <Flex
      w="100%"
      h="100vh"
      justify={"center"}
      align={"center"}
      flexDir={"column"}
    >
      <Flex
        p="30px"
        w="full"
        maxW={"460px"}
        borderRadius={"8px"}
        flexDir={"column"}
        gap={5}
      >
        <Flex
          w="full"
          justify={"center"}
          align={"center"}
          flexDir={"column"}
          gap={2}
        >
          <Link href="/">
            <PiGameControllerFill size={50} color={"black"} />
          </Link>
          <Heading fontWeight={"600"} fontSize="lg">
            Gamerrank Login
          </Heading>
        </Flex>
        <Flex as={"form"} flexDir={"column"} gap={3} onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              isRequired
              minLength={3}
              type="username"
              variant={"ghost"}
              bg="hsl(60 28% 86% / 1)"
              placeholder="Enter username"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
            <FormErrorMessage>Error</FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              isRequired
              minLength={3}
              type="password"
              variant={"ghost"}
              bg="hsl(60 28% 86% / 1)"
              placeholder="Enter password"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
            <FormErrorMessage>Error</FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            bg="black"
            variant={"blackAlpha"}
            color="white"
            mt={4}
            isLoading={loading}
          >
            Login
          </Button>
          <Divider></Divider>

          <Button
            disabled={loading}
            as={Link}
            href="/register"
            variant={"ghost"}
          >
            Create new account
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
