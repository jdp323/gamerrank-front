import { DetailedGameCard } from "@/molecules/DetailedGameCard";
import { GameCard } from "@/molecules/GameCard";
import ReviewsList from "@/molecules/ReviewsList";
import { Button, Container, Flex } from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md";

export default function GamePage() {
  return (
    <Flex flexDir={"column"} my={4} gap="3" alignItems={"flex-start"}>
      <Button
        leftIcon={<MdArrowBack />}
        variant={"ghost"}
        colorScheme="blackAlpha"
      >
        Homepage
      </Button>
      <DetailedGameCard />
      <ReviewsList />
    </Flex>
  );
}
