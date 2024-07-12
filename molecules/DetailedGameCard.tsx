import { useUser } from "@/contexts/UserContext";
import { API, IGame } from "@/services/api";
import {
  Button,
  Link as ChakraLink,
  Divider,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import toast from "react-hot-toast";
import { MdOutlineRateReview, MdOutlineThumbUp } from "react-icons/md";
export function DetailedGameCard(props: {
  id: number;
  title: string;
  desc: string;
  url: string;
  image: string;
  author: string;
  votes: number;
  reviews: number;
  date: string;
}) {
  const user = useUser();
  const data = useQuery({
    queryKey: ["vote", props.id],
    queryFn: () => API.fetchVoteStatus(props.id),
  });
  const client = useQueryClient();

  const vote = useMutation({
    mutationKey: ["mt-vote", props.id],
    mutationFn: async (status: boolean) => {
      await API.updateVoteStatus(props.id, status);
    },
    onSuccess(data, status, context) {
      client.setQueryData(["vote", props.id], () => status);

      client.setQueryData(["game", props.id], (old: IGame) => {
        return {
          ...old,
          _count: {
            reviews: old._count.reviews,
            votes: old._count.votes + (status ? 1 : -1),
          },
        };
      });
      toast.success(status ? "Upvoted game" : "Vote removed");
    },
  });

  function handleVote() {
    vote.mutate(!data.data);
  }

  return (
    <Flex w={"100%"}>
      <Flex gap={3} w="full">
        <Image
          src={props.image}
          w={"330px"}
          h={"330px"}
          overflow={"hidden"}
          objectFit={"cover"}
          flexShrink={0}
        />
        <Flex flexDir={"column"} w="full">
          <Heading size={"md"} fontWeight={"600"} color="gray.600">
            {props.title}
          </Heading>
          <Text>{props.desc}</Text>

          <Flex gap="10" marginTop={"auto"}>
            <Flex flexDir={"column"} my="2">
              <Heading as="h3" size="sm">
                URL
              </Heading>
              <ChakraLink href={props.url} target="_blank">
                {props.url}
              </ChakraLink>
            </Flex>

            <Flex flexDir={"column"} my="2">
              <Heading as="h3" size="sm">
                Posted by
              </Heading>
              <Text>{props.author}</Text>
            </Flex>
          </Flex>
          <Divider my={2} />
          <Flex gap={2} alignItems={"center"} w="full">
            {user.user?.type == "GAMER" ? (
              <Button
                variant={data.data ? "solid" : "ghost"}
                colorScheme="yellow"
                size={"xs"}
                borderColor="gray.800"
                leftIcon={<MdOutlineThumbUp size={16} />}
                onClick={handleVote}
                isLoading={data.isLoading || vote.isPending}
              >
                {data.data ? "Voted" : "Up Vote"}
              </Button>
            ) : user.user ? (
              <Text fontSize={"xs"} color="gray.600">
                Only gamers can vote
              </Text>
            ) : (
              <Text
                as={Link}
                _hover={{ textDecor: "underline" }}
                href="/login"
                fontSize={"xs"}
                color="gray.600"
              >
                Login to vote
              </Text>
            )}
            <Button
              cursor={"default"}
              variant={"outline"}
              size={"xs"}
              border="none"
              leftIcon={<MdOutlineThumbUp size={16} />}
            >
              {props.votes}
            </Button>
            <Button
              cursor={"default"}
              variant={"ghost"}
              size={"xs"}
              leftIcon={<MdOutlineRateReview size={16} />}
            >
              {props.reviews}
            </Button>
            <Text marginLeft={"auto"} fontSize={"small"} color="gray.500">
              {props.date}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
