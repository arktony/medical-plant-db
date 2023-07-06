import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Image,
  Text,
  HStack,
  VStack,
} from "@chakra-ui/react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { IPlant } from "../hooks/usePlants";

const ReadMore = () => {
  const params = useParams();

  const [plant, setPlant] = useState<IPlant>();

  useEffect(() => {
    const singlePlantUrl = `http://142.93.175.111/api/v1/plants/${params.id}`;
    fetch(singlePlantUrl)
      .then((response) => response.json())
      .then((json) => setPlant(json));
  }, [params]);

  return (
    <>
      <Navbar />
      <Stack padding={10}>
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
        >
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "45%" }}
            maxH={80}
            src={`data:` + plant?.type + `;base64,` + plant?.picByte}
            alt="Plant Image"
          />

          <Stack>
            <CardBody>
              <HStack>
                <Heading size="sm">Family:</Heading>
                <Heading size="sm" color={"blue.600"} fontStyle="italic">
                  {plant?.family}
                </Heading>
              </HStack>
              <HStack marginTop={4}>
                <Heading size="sm">English Name:</Heading>
                <Heading size="sm" color={"blue.600"} fontStyle="italic">
                  {plant?.englishName}
                </Heading>
              </HStack>
              <HStack marginTop={4}>
                <Heading size="sm">Botanical Name:</Heading>
                <Heading size="sm" color={"blue.600"} fontStyle="italic">
                  {plant?.scientificName}
                </Heading>
              </HStack>
              <HStack marginTop={4}>
                <Heading size="sm">Genus:</Heading>
                <Heading size="sm" color={"blue.600"} fontStyle="italic">
                  {plant?.genus}
                </Heading>
              </HStack>
              <HStack marginTop={4} marginBottom={4}>
                <Heading size="sm">Local Names:</Heading>
                <Heading size="sm" color={"blue.600"} fontStyle="italic">
                  {plant?.localName}
                </Heading>
              </HStack>
              <hr />
              <Heading size="md" marginTop={4}>
                Diseases it can cure.
              </Heading>
              <Text py="2">{plant?.disease}</Text>
              <hr />
              <Heading size="md" marginTop={4}>
                Narration.
              </Heading>
              <Text py="2">{plant?.narration}</Text>
            </CardBody>

            <CardFooter>
              <Button variant="solid" colorScheme="blue">
                Edit Plant
              </Button>
            </CardFooter>
          </Stack>
        </Card>
      </Stack>
    </>
  );
};

export default ReadMore;
