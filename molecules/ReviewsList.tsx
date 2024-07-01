import {
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { MdReviews } from "react-icons/md";

export default function ReviewsList() {
  return (
    <Flex flexDir={"column"} gap="3" w="full">
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
      <Flex flexDir={"column"} gap="4">
        <Review />
        <Review />
        <Review />
      </Flex>
    </Flex>
  );
}

export function Review() {
  return (
    <Flex
      flexDir={"column"}
      bg="hsl(60 58% 95% / 1)"
      p="10"
      border="1px solid"
      borderColor={"gray.300"}
    >
      <Text whiteSpace={"preserve"}>
        {`For three or four days now, I have played nothing but "This War of Mine". I am a veteran of Iraq and I remember all too well the hardships it brought upon the civilians, especially in the beginning of the war. I remember being heartbroken at the sight of children crying and begging for food on the side of the road.

This "game" puts you square in the middle of the experiences of those civilians. It is a brutal, kill or be killed world - where an act of unimaginable violence may let you live another day, but it can also break your heart and soul. Some days, you are offered a chance at compassion - and if you take that chance, risking your own safety and resources for others, you may find you feel a bit better about yourself.

Then there are the times where you are stuck between a rock and a hard place. You are unarmed, scavenging for anything to save your friends, and you peep through a keyhole and see a soldier brutally beating - and possible worse - a woman. He has an AK-47, you have a lockpick and a rumbling stomach. So you sit there and watch - afraid that any noise may turn his violent attention upon you. When it is all done, you hide until he leaves and then, shamefully, pick over the bloodied body of the woman for anything she may have scavenged before the soldier got to her.

This is "This War of Mine" - a dark, beautiful, haunting, exhilerating, and horrible tale.

What's that tagline, "The first casualty of war is innocence"? It applies here - in a way you would have never imagined coming from a computer game.`}
      </Text>
      <Divider borderColor={"black.700"} maxW="50px" mt="10px" />
      <Text fontWeight={"500"}>dotafan</Text>
    </Flex>
  );
}
