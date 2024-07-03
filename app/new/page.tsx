import { DetailedGameCard } from "@/molecules/DetailedGameCard";
import { GameCard } from "@/molecules/GameCard";
import { NewGameCard } from "@/molecules/NewGameCard";
import ReviewsList from "@/molecules/ReviewsList";
import { Button, Container, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

export default function GamePage() {
  return (
    <Flex flexDir={"column"} my={4} gap="3" alignItems={"flex-start"} w="100%">
      <Button
        as={Link}
        href="/"
        leftIcon={<MdArrowBack />}
        variant={"ghost"}
        colorScheme="blackAlpha"
      >
        Homepage
      </Button>
      <NewGameCard />
    </Flex>
  );
}
