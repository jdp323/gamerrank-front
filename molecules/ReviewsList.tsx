"use client";

import { useUser } from "@/contexts/UserContext";
import { API } from "@/services/api";
import {
  Button,
  Divider,
  Flex,
  Heading,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FormEventHandler, useState } from "react";

export default function ReviewsList(props: {
  gameId: number;
  reviews: Array<{
    id: number;
    text: string;
    author: string;
    date: string;
  }>;
}) {
  const user = useUser();

  const [text, setText] = useState("");
  const reviewPosted = useQuery({
    queryKey: ["reviewd", props.gameId],
    queryFn: () => API.fetchReviewStatus(props.gameId),
  });
  const postReview = useMutation({
    mutationKey: ["post-review", props.gameId],
    mutationFn: async () => {
      await API.postReview(props.gameId, text);
    },
  });
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    postReview.mutate();
  };
  return (
    <Flex flexDir={"column"} gap="3" w="full">
      {!user.user ? (
        <Text mx="auto" color="red.500">
          Users must be logged in to review.
        </Text>
      ) : user.user.type != "REVIEWER" ? (
        <Text color="gray.500">Only reviewers can post reviews.</Text>
      ) : reviewPosted.data ? (
        <Text color="gray.500">You've already posted your review</Text>
      ) : (
        <>
          <Heading size="md" fontWeight={"500"}>
            Write Your Review
          </Heading>
          <Flex as="form" flexDir={"column"} gap="2" onSubmit={handleSubmit}>
            <Textarea
              isRequired
              minLength={5}
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={6}
              placeholder="Write your review here..."
              bg="gray.50"
            ></Textarea>
            <Button
              type="submit"
              colorScheme={"yellow"}
              isLoading={postReview.isPending}
            >
              Submit
            </Button>
          </Flex>
        </>
      )}
      <Flex flexDir={"column"} gap="4">
        {props.reviews.length == 0 && (
          <Text
            p="2"
            border="1px solid"
            mx="auto"
            w="full"
            textAlign={"center"}
            borderRadius={"8"}
            color="yellow.600"
            mt="10"
            fontWeight={"500"}
          >
            No Reviews posted yet
          </Text>
        )}
        {props.reviews.map((r) => (
          <Review
            key={r.id}
            author={r.author}
            date={new Date(r.date).toLocaleString()}
            text={r.text}
          />
        ))}
      </Flex>
    </Flex>
  );
}

export function Review(props: { text: string; author: string; date: string }) {
  return (
    <Flex
      flexDir={"column"}
      bg="hsl(60 58% 95% / 1)"
      p="10"
      border="1px solid"
      borderColor={"gray.300"}
    >
      <Text whiteSpace={"preserve"}>{props.text}</Text>
      <Divider borderColor={"gray.300"} mt="10px" mb="10px" />
      <Flex gap={5}>
        <Text fontWeight={"500"}>{props.author}</Text>
        <Text fontWeight={"400"}>{props.date}</Text>
      </Flex>
    </Flex>
  );
}
