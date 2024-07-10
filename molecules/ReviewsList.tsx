"use client";

import { useUser } from "@/contexts/UserContext";
import {
  Button,
  Divider,
  Flex,
  Heading,
  Text,
  Textarea,
} from "@chakra-ui/react";

export default function ReviewsList(props: {
  reviews: Array<{
    id: number;
    text: string;
    author: string;
    date: string;
  }>;
}) {
  const user = useUser();
  return (
    <Flex flexDir={"column"} gap="3" w="full">
      {!user.user ? (
        <Text mx="auto" color="red.500">
          Users must be logged in to review.
        </Text>
      ) : user.user.type != "REVIEWER" ? (
        <Text color="gray.500">Only reviewers can post reviews.</Text>
      ) : (
        <>
          <Heading size="md" fontWeight={"500"}>
            Write Your Review
          </Heading>
          <Flex as="form" flexDir={"column"} gap="2">
            <Textarea
              rows={6}
              placeholder="Write your review here..."
              bg="gray.50"
            ></Textarea>
            <Button type="submit" colorScheme={"blue"}>
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
