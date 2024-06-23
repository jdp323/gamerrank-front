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
export function GameCard() {
  return (
    <Container maxW={"100%"}>
      <Flex gap={3}>
        <Image
          src="https://cdn.vox-cdn.com/thumbor/UOkQJMoGf-yJzYHDX88vLs172Qs=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/8975721/bg_01.jpg"
          w={"120px"}
          h={"120px"}
          overflow={"hidden"}
          objectFit={"cover"}
          flexShrink={0}
        />
        <Flex flexDir={"column"}>
          <ChakraLink as={Link} href="">
            <Heading size={"md"} fontWeight={"600"} color="gray.600">
              Dota 2
            </Heading>
          </ChakraLink>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel facilis
            earum cum saepe, dignissimos fuga official.
          </Text>
          <Divider my={2} marginTop={"auto"} />
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize="xs" textColor={"gray.500"}>
              by humayun
            </Text>
            <Divider orientation="vertical" borderColor="primary" />
            <Button
              variant={"outline"}
              size={"xs"}
              leftIcon={<MdOutlineThumbUp size={16} />}
            >
              6
            </Button>
            <Button
              variant={"ghost"}
              size={"xs"}
              leftIcon={<MdOutlineRateReview size={16} />}
            >
              6
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
}
