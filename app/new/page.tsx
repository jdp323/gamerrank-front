"use client";
import { useUser } from "@/contexts/UserContext";
import { DetailedGameCard } from "@/molecules/DetailedGameCard";
import { GameCard } from "@/molecules/GameCard";
import Hero from "@/molecules/Hero";
import { NewGameCard } from "@/molecules/NewGameCard";
import ReviewsList from "@/molecules/ReviewsList";
import { Button, Container, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { useRouter } from "next/navigation";
import Head from "next/head";
export default function GamePage() {
  const user = useUser();
  const router = useRouter();
  if (!user.user) {
    router.replace("/");
  }
  return (
    <Flex flexDir={"column"} my={4} gap="3" alignItems={"flex-start"} w="100%">
      <title>Post new game | Gamerrank</title>
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
