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
} from "@chakra-ui/react";
import { PiGameControllerFill } from "react-icons/pi";

export default function RegisterPage() {
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
            Gamerrank Registration
          </Heading>
        </Flex>
        <Flex as={"form"} flexDir={"column"} gap={3}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input type="text" />
            <FormErrorMessage>Error</FormErrorMessage>
          </FormControl>
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
          <FormControl>
            <FormLabel>Confirm Password</FormLabel>
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
            Register
          </Button>
          <Divider></Divider>

          <Button as={Link} href="/login" variant={"ghost"}>
            Login to existing account
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
