import React from "react";
import { IPlant } from "../hooks/usePlants";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
interface Props {
  plant: IPlant;
}
const PlantCard = ({ plant }: Props) => {
  return (
    <Card borderRadius={8} overflow="hidden">
      <Image src={`data:` + plant.type + `;base64,` + plant.picByte} />
      <CardBody>
        <Stack mt="3" spacing="3">
          <Heading size="md">
            {plant.englishName + " / " + plant.scientificName}
          </Heading>
          <Text>{plant.narration}</Text>
        </Stack>
      </CardBody>
      <Button size="sm" variant="ghost" colorScheme="green">
        Read More...
      </Button>
    </Card>
  );
};

export default PlantCard;
