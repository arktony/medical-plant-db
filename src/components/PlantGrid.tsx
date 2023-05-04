import { SimpleGrid } from "@chakra-ui/react";
import PlantCard from "./PlantCard";
import usePlants from "../hooks/usePlants";

const PlantGrid = () => {
  const { plants, error } = usePlants();
  return (
    <>
      <p>{error}</p>
      <SimpleGrid
        columns={{ sm: 1, md: 3, lg: 4, xl: 4 }}
        padding="13px"
        spacing={7}
      >
        {plants!.map((plant) => (
          <PlantCard key={plant.id} plant={plant} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default PlantGrid;
