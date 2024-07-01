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
export function DetailedGameCard() {
  return (
    <Flex maxW={"100%"}>
      <Flex gap={3}>
        <Image
          src="https://cdn.vox-cdn.com/thumbor/UOkQJMoGf-yJzYHDX88vLs172Qs=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/8975721/bg_01.jpg"
          w={"330px"}
          h={"330px"}
          overflow={"hidden"}
          objectFit={"cover"}
          flexShrink={0}
        />
        <Flex flexDir={"column"}>
          <Heading size={"md"} fontWeight={"600"} color="gray.600">
            Dota 2
          </Heading>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel facilis
            earum cum saepe, dignissimos fuga official.
          </Text>

          <Flex gap="10" marginTop={"auto"}>
            <Flex flexDir={"column"} my="2">
              <Heading as="h3" size="sm">
                URL
              </Heading>
              <ChakraLink href="/">https://steam.game.com</ChakraLink>
            </Flex>

            <Flex flexDir={"column"} my="2">
              <Heading as="h3" size="sm">
                Posted by
              </Heading>
              <Text>dotafan</Text>
            </Flex>
          </Flex>
          <Divider my={2} />
          <Flex gap={2} alignItems={"center"}>
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
    </Flex>
  );
}
