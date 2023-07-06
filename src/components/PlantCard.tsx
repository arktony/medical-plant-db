import { IPlant } from "../hooks/usePlants";
import { Navigate, Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
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
    <>
      <Card borderRadius={8} overflow="hidden">
        <Link to={`/plant/${plant.id}`}>
          <Image src={`data:` + plant.type + `;base64,` + plant.picByte} />
          <CardBody>
            <Stack mt="3" spacing="3">
              <Heading size="md">
                {plant.englishName + " / " + plant.scientificName}
              </Heading>

              <Text>{plant.narration}</Text>
            </Stack>
          </CardBody>
        </Link>
      </Card>
    </>
  );
};

export default PlantCard;
