"use client";
import { API_URL } from "@/constants";
import { GameCard } from "@/molecules/GameCard";
import Hero from "@/molecules/Hero";
import { API } from "@/services/api";
import { Flex, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";

export default function Home() {
  const query = useQuery({
    queryKey: ["timeline"],
    queryFn: API.fetchTimeline,
  });

  return (
    <Flex
      margin={"0 auto"}
      bg="rgb(246, 246, 239)"
      gap={5}
      flexDir={"column"}
      alignItems={"center"}
      maxW={"1100px"}
      mb="10"
    >
      <title>Homepage | Gamerrank</title>
      <Hero />
      <Flex flexDir={"column"} gap={10} w="full" id="games-list">
        {(!query.data || query.data.length == 0) && (
          <Flex
            border="1px solid gray"
            w="full"
            h="40px"
            justify={"center"}
            alignItems={"center"}
            borderRadius={"8px"}
          >
            <Text fontWeight={"500"} color="gray.600">
              Posts will appear here
            </Text>
          </Flex>
        )}
        {query.data?.map((i) => (
          <GameCard
            key={i.id}
            id={i.id}
            author={i.createdBy.username}
            desc={i.description}
            image={API_URL + i.imageUrl}
            reviews={i._count.reviews}
            votes={i._count.votes}
            title={i.title}
            date={new Date(i.createdAt).toLocaleString()}
          />
        ))}
      </Flex>
    </Flex>
  );
}
