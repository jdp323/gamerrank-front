"use client";
import { API_URL } from "@/constants";
import { DetailedGameCard } from "@/molecules/DetailedGameCard";
import { GameCard } from "@/molecules/GameCard";
import ReviewsList from "@/molecules/ReviewsList";
import { API } from "@/services/api";
import { Button, Container, Flex } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { MdArrowBack } from "react-icons/md";

export default function GamePage() {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["game", id],
    queryFn: () => API.fetchGame(Number(id)),
  });

  return (
    <Flex flexDir={"column"} my={4} gap="3" alignItems={"flex-start"}>
      <Button
        as={Link}
        href="/"
        leftIcon={<MdArrowBack />}
        variant={"ghost"}
        colorScheme="blackAlpha"
      >
        Homepage
      </Button>
      {data && (
        <>
          <DetailedGameCard
            date={new Date(data.createdAt).toLocaleString()}
            author={data.createdBy.username}
            desc={data.description}
            id={data.id}
            image={API_URL + data.imageUrl}
            reviews={data._count.reviews}
            votes={data._count.votes}
            title={data.title}
            url={data.url}
          />

          <ReviewsList
            reviews={data.reviews.map((r) => ({
              author: r.createdBy.username,
              date: r.createdAt,
              id: r.id,
              text: r.text,
            }))}
          />
        </>
      )}
    </Flex>
  );
}
