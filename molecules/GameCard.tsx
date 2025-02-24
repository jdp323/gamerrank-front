import {
  Container,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Text,
  Link as ChakraLink,
  Divider,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdThumbUp,
  MdOutlineThumbUpAlt,
  MdOutlineThumbUp,
  MdOutlineComment,
  MdOutlineRateReview,
} from "react-icons/md";
export function GameCard(props: {
  id: number;
  title: string;
  desc: string;
  image: string;
  author: string;
  votes: number;
  reviews: number;
  date: string;
}) {
  return (
    <Flex w={"100%"}>
      <Flex gap={3} w="full">
        <Image
          src={props.image}
          w={"120px"}
          h={"120px"}
          overflow={"hidden"}
          objectFit={"cover"}
          objectPosition={"center"}
          flexShrink={0}
        />
        <Flex flexDir={"column"} w="full">
          <ChakraLink as={Link} href={"/game/" + props.id}>
            <Heading size={"md"} fontWeight={"600"} color="gray.600">
              {props.title}
            </Heading>
          </ChakraLink>
          <Text>{props.desc}</Text>
          <Divider my={2} marginTop={"auto"} />
          <Flex gap={2} alignItems={"center"} w="full">
            <Text fontSize="xs" textColor={"gray.500"}>
              by {props.author}
            </Text>
            <Divider orientation="vertical" borderColor="primary" />
            <Button
              cursor={"default"}
              variant={"outline"}
              size={"xs"}
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
