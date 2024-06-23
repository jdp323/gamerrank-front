import { Flex, Text } from "@chakra-ui/react";
import { PiGameControllerFill } from "react-icons/pi";

export default function Logo({ color }: { color?: string }) {
  return (
    <Flex gap={1} flexShrink={0}>
      <PiGameControllerFill size={25} color={color || "white"} />
      <Text textColor={color || "white"} fontWeight={"700"}>
        Gamerrank
      </Text>
    </Flex>
  );
}
