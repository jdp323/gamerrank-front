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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormEventHandler, useState } from "react";
import toast from "react-hot-toast";

export default function ReviewsList(props: {
  gameId: number;
  reviews: Array<{
    id: number;
    text: string;
    author: string;
    authorId: number;
    date: string;
  }>;
}) {
  const user = useUser();

  const [text, setText] = useState("");
  const reviewPosted = useQuery({
    queryKey: ["reviewed", props.gameId],
    queryFn: () => API.fetchReviewStatus(props.gameId),
  });
  const client = useQueryClient();
  const postReview = useMutation({
    mutationKey: ["post-review", props.gameId],
    mutationFn: async () => {
      await API.postReview(props.gameId, text);
    },
    onSuccess(data, variables, context) {
      toast.success("Review posted!");
      client.setQueryData(["reviewed", props.gameId], () => true);
      client.invalidateQueries({ queryKey: ["game", props.gameId] });
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
          <Heading size="md" fontWeight={"500"} color="hsl(60 18% 36% / 1)">
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
            highlighted={r.authorId == user.user?.id}
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

export function Review(props: {
  text: string;
  author: string;
  date: string;
  highlighted: boolean;
}) {
  return (
    <Flex
      flexDir={"column"}
      bg="hsl(60 58% 95% / 1)"
      p="16px 20px"
      border={"1px solid"}
      borderRadius={"4px"}
      borderColor={"gray.300"}
      boxShadow={props.highlighted ? "0px 0px 2px 1px orange" : ""}
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
