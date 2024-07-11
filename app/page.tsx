"use client";
import { API_URL } from "@/constants";
import { GameCard } from "@/molecules/GameCard";
import Hero from "@/molecules/Hero";
import { API } from "@/services/api";
import { Flex } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const query = useQuery({
    queryKey: ["timeline"],
    queryFn: API.fetchTimeline,
  });

  console.log(query.data);

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
      <Hero />
      <Flex flexDir={"column"} gap={10}>
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
