"use client";
import { useUser } from "@/contexts/UserContext";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import {
  MdAddCircle,
  MdExplore,
  MdGamepad,
  MdOutlineCreate,
  MdPerson,
  MdScanner,
  MdTravelExplore,
} from "react-icons/md";
import { PiGameControllerFill } from "react-icons/pi";

export default function Hero() {
  const user = useUser();
  return (
    <Flex
      background={"orange.300"}
      w="100%"
      alignItems={"center"}
      flexDir={"column"}
      minH={"360px"}
      justifyContent={"center"}
      position={"relative"}
      borderTop={"4px solid #000"}
      gap={8}
    >
      <Image
        src="/cover.jpeg"
        position={"absolute"}
        left={0}
        top={0}
        width="100%"
        height="100%"
        objectFit={"cover"}
        zIndex={0}
      ></Image>
      <Box
        pos={"absolute"}
        left={0}
        top={0}
        width="100%"
        height="100%"
        bg="blackAlpha.300"
        backdropFilter="blur(2px)"
      ></Box>
      <Flex
        pos={"absolute"}
        left={0}
        top={0}
        width="100%"
        h="40px"
        alignItems={"center"}
        justifyContent={"space-between"}
        pt="10px"
        px="20px"
      >
        <Flex gap={1}>
          <PiGameControllerFill size={25} color="white" />
          <Text textColor={"white"} fontWeight={"700"}>
            Gamerrank
          </Text>
        </Flex>

        <Flex gap={1} alignContent={"center"}>
          {!user.user ? (
            <>
              {" "}
              <Button
                as={Link}
                href="/login"
                variant={"ghost"}
                colorScheme="whiteAlpha"
                color="white"
                size="sm"
              >
                Login
              </Button>
              <Button
                as={Link}
                href="/register"
                variant={"outline"}
                colorScheme="whiteAlpha"
                color="white"
                size={"sm"}
              >
                Get Started
              </Button>
            </>
          ) : (
            <>
              <Button
                leftIcon={<MdPerson />}
                variant={"ghost"}
                colorScheme="whiteAlpha"
                color="white"
                size="sm"
              >
                {user.user.username}
              </Button>

              <Button
                variant={"ghost"}
                colorScheme="whiteAlpha"
                color="white"
                size="sm"
                onClick={() => {
                  localStorage.removeItem("token");
                  user.refetch();
                }}
              >
                Logout
              </Button>
            </>
          )}
        </Flex>
      </Flex>

      <Flex
        zIndex={1}
        flexDir={"column"}
        color="black"
        justify={"center"}
        alignItems={"center"}
        gap={2}
      >
        <Text
          fontWeight={"400"}
          letterSpacing={"2px"}
          fontSize={"xx-large"}
          color="white"
        >
          Discover on Gamerrank
        </Text>
        <Text fontSize={"md"} color="white" maxW="600px" textAlign={"center"}>
          Explore new titles, discover hidden gems, cast your vote, write
          reviews, and share your favorite games with a community of passionate
          gamers.
        </Text>
      </Flex>
      <Flex gap={1}>
        {user.user?.type == "REVIEWER" ? (
          <Button
            as={Link}
            href="/new"
            colorScheme="whiteAlpha"
            variant={"outline"}
            color="white"
            leftIcon={<MdGamepad />}
          >
            New Game
          </Button>
        ) : (
          <Button
            colorScheme="whiteAlpha"
            variant={"outline"}
            color="white"
            leftIcon={<MdTravelExplore />}
          >
            Explore
          </Button>
        )}
      </Flex>
    </Flex>
  );
}
