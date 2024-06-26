import { Button, Flex, Heading, Input, Textarea } from "@chakra-ui/react";

export default function ReviewsList() {
  return (
    <Flex flexDir={"column"} gap="3" w="full">
      <Heading size="md">Reviews</Heading>
      <Flex as="form" flexDir={"column"} gap="2">
        <Textarea placeholder="Write your review" bg="gray.100"></Textarea>
        <Button type="submit" colorScheme={"blue"}>
          Submit
        </Button>
      </Flex>
    </Flex>
  );
}
