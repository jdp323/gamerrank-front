import { Button, Divider, Flex, Heading, Input } from "@chakra-ui/react";

import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import Link from "next/link";
import { PiGameControllerFill } from "react-icons/pi";

export default function LoginPage() {
  return (
    <Flex
      w="100vw"
      h="100vh"
      justify={"center"}
      align={"center"}
      flexDir={"column"}
    >
      <Flex
        p="30px"
        w="full"
        maxW={"460px"}
        bg="gray.50"
        boxShadow={"1px 1px 3px 3px #3332"}
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
        <Flex as={"form"} flexDir={"column"} gap={3}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input type="username" />
            <FormErrorMessage>Error</FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" />
            <FormErrorMessage>Error</FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            variant={"blackAlpha"}
            bg={"black"}
            color="white"
            mt={4}
          >
            Login
          </Button>
          <Divider></Divider>

          <Button as={Link} href="/register" variant={"ghost"}>
            Create new account
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
