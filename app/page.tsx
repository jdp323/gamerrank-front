import { GameCard } from "@/molecules/GameCard";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import { SlGameController } from "react-icons/sl";
import { IoGameController } from "react-icons/io5";
import { PiGameControllerFill } from "react-icons/pi";
import Hero from "@/molecules/Hero";

export default function Home() {
  return (
    <Flex
      margin={"0 auto"}
      bg="rgb(246, 246, 239)"
      gap={5}
      flexDir={"column"}
      alignItems={"center"}
      maxW={"1100px"}
    >
      <Hero />
      <Flex flexDir={"column"} gap={10}>
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
      </Flex>
    </Flex>
  );
}
