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
  return (
    <Flex maxW={"100%"}>
      <Flex gap={3}>
        <Image
          src={props.image}
          w={"330px"}
          h={"330px"}
          overflow={"hidden"}
          objectFit={"cover"}
          flexShrink={0}
        />
        <Flex flexDir={"column"}>
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
          <Flex gap={2} alignItems={"center"}>
            <Button
              variant={"outline"}
              size={"xs"}
              leftIcon={<MdOutlineThumbUp size={16} />}
            >
              {props.votes}
            </Button>
            <Button
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
