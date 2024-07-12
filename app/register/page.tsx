"use client";
import { useUser } from "@/contexts/UserContext";
import { API } from "@/services/api";
import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { isAxiosError } from "axios";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useState, FormEventHandler } from "react";
import toast from "react-hot-toast";
import { PiGameControllerFill } from "react-icons/pi";

export default function RegisterPage() {
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    type: "GAMER",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const user = useUser();
  const [error, setError] = useState("");
  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    setError("");
    if (inputs.password != inputs.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    if (/^[a-zA-Z0-9]+$/.test(inputs.username) == false) {
      setError("Username can only contain letters and numbers");
      return;
    }

    setLoading(true);
    try {
      const { token } = await API.registerUser(
        inputs.username,
        inputs.password,
        inputs.name,
        inputs.type
      );
      localStorage.setItem("token", token);
      toast.success("Registration successful");
      router.replace("/");
      user.refetch();
    } catch (er) {
      console.log(er);
      if (isAxiosError(er) && er.response?.data.error) {
        setError(er.response?.data.error);
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
      <title>Register | Gamerrank</title>
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
            Gamerrank Registration
          </Heading>
        </Flex>
        <Flex as={"form"} flexDir={"column"} gap={3} onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              variant={"ghost"}
              bg="hsl(60 28% 86% / 1)"
              placeholder="Enter your full name"
              type="text"
              minLength={3}
              isRequired
              value={inputs.name}
              onChange={(e) => {
                setInputs({ ...inputs, name: e.target.value });
              }}
            />
            <FormErrorMessage>Error</FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              variant={"ghost"}
              bg="hsl(60 28% 86% / 1)"
              placeholder="Chosoe a username"
              minLength={3}
              type="username"
              isRequired
              value={inputs.username}
              onChange={(e) => {
                setInputs({ ...inputs, username: e.target.value });
              }}
            />
            <FormErrorMessage>Error</FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              variant={"ghost"}
              bg="hsl(60 28% 86% / 1)"
              placeholder="Enter a password"
              minLength={5}
              type="password"
              isRequired
              value={inputs.password}
              onChange={(e) => {
                setInputs({ ...inputs, password: e.target.value });
              }}
            />
            <FormErrorMessage>Error</FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              variant={"ghost"}
              bg="hsl(60 28% 86% / 1)"
              placeholder="Confirm password"
              minLength={5}
              type="password"
              isRequired
              value={inputs.confirmPassword}
              onChange={(e) => {
                setInputs({ ...inputs, confirmPassword: e.target.value });
              }}
            />
            <FormErrorMessage>Error</FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel>Type</FormLabel>
            <RadioGroup
              colorScheme="yellow"
              onChange={(v) => setInputs({ ...inputs, type: v })}
              value={inputs.type}
            >
              <Stack direction="row">
                <Radio value="GAMER">Gamer</Radio>
                <Radio value="REVIEWER">Reviewer</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <Text color="red.600">{error}</Text>
          <Button
            type="submit"
            variant={"blackAlpha"}
            bg={"black"}
            color="white"
            isLoading={loading}
          >
            Register
          </Button>
          <Divider></Divider>

          <Button as={Link} disabled={loading} href="/login" variant={"ghost"}>
            Login to existing account
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
