import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import { MdExplore, MdScanner, MdTravelExplore } from "react-icons/md";
import { PiGameControllerFill } from "react-icons/pi";

export default function Hero() {
  return (
    <Flex
      background={"blue.600"}
      w="100%"
      alignItems={"center"}
      flexDir={"column"}
      minH={"360px"}
      justifyContent={"center"}
      position={"relative"}
      borderTop={"4px solid black"}
      gap={8}
    >
      <Image
        src="https://wallpaper.forfun.com/fetch/e8/e8913c1c351d042f96f9881866904cdf.jpeg?download=video_game-dota_2-shadow_fiend_dota_2-349002.jpeg"
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
        px="10px"
      >
        <Flex gap={1}>
          <PiGameControllerFill size={25} color="white" />
          <Text textColor={"white"} fontWeight={"700"}>
            Gamerrank
          </Text>
        </Flex>

        <Flex gap={1}>
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
        <Button
          colorScheme="whiteAlpha"
          variant={"outline"}
          color="white"
          leftIcon={<MdTravelExplore />}
        >
          Explore
        </Button>
      </Flex>
    </Flex>
  );
}
