import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Center,
} from "@chakra-ui/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { FormEvent, useState } from "react";
const Admin = () => {
  const { register, handleSubmit } = useForm();

  const [family, setFamily] = useState("");
  const [englishName, setEnglishName] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [localName, setLocalName] = useState("");
  const [genus, setGenus] = useState("");
  const [disease, setDisease] = useState("");
  const [narration, setNarration] = useState("");
  const [file, setFile] = useState<File>();
  const [message, setMessage] = useState();

  const DATA_URL = "http://localhost:8080/api/v1/addNewPlant";
  const { auth }: any = useAuth();
  const authorizer = "Bearer " + auth?.jwt;

  const putImageContest = (files: FileList | null) => {
    if (files) {
      const fileRef = files[0] || null;
      setFile(fileRef);
      console.log(fileRef);
    }
  };

  const onSubmit = async () => {
    try {
      const response = await axios
        .post(
          DATA_URL,
          {
            file,
            family,
            englishName,
            scientificName,
            localName,
            genus,
            disease,
            narration,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data; charset=utf-8;",
              "Access-Control-Allow-Origin": "*",
              Authorization: authorizer,
            },
          }
        )
        .then((response) => {
          setMessage(response.data.message);
        });
      console.log(response);
    } catch (error) {}
  };

  return (
    <>
      <Box backgroundColor="green.300">
        <Text fontWeight="bold">{message}</Text>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Stack spacing={8} mx={"auto"} maxW={"xlg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"} textAlign={"center"}>
                Add New Medicinal Plant.
              </Heading>
              <Text fontSize={"lg"} color={"gray.600"}>
                Note: All fields are mandatory.
              </Text>
            </Stack>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <FormControl id="family" isRequired>
                  <FormLabel>Plant Family</FormLabel>
                  <Input
                    // {...register("family", { required: true })}
                    onChange={(e) => setFamily(e.target.value)}
                    type="text"
                  />
                </FormControl>
                <HStack>
                  <Box>
                    <FormControl id="engName" isRequired>
                      <FormLabel>English Name</FormLabel>
                      <Input
                        // {...register("englishName", { required: true })}
                        onChange={(e) => setEnglishName(e.target.value)}
                        type="text"
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="sciName" isRequired>
                      <FormLabel>Scientific Name</FormLabel>
                      <Input
                        // {...register("scientificName", { required: true })}
                        onChange={(e) => setScientificName(e.target.value)}
                        type="text"
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="localName" isRequired>
                      <FormLabel>Local Name</FormLabel>
                      <Input
                        // {...register("localName", { required: true })}
                        onChange={(e) => setLocalName(e.target.value)}
                        type="text"
                      />
                    </FormControl>
                  </Box>
                </HStack>
                <HStack>
                  <Box>
                    <FormControl id="genus" isRequired>
                      <FormLabel>Genus</FormLabel>
                      <Input
                        // {...register("genus", { required: true })}
                        onChange={(e) => setGenus(e.target.value)}
                        type="text"
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="disease" isRequired>
                      <FormLabel>Diseases Cured</FormLabel>
                      <Input
                        // {...register("disease", { required: true })}
                        onChange={(e) => setDisease(e.target.value)}
                        placeholder="Seperate with comma,"
                        type="text"
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="narration" isRequired>
                      <FormLabel>Narration</FormLabel>
                      <Input
                        // {...register("narration", { required: true })}
                        onChange={(e) => setNarration(e.target.value)}
                        type="text"
                      />
                    </FormControl>
                  </Box>
                </HStack>
                <Box>
                  <FormControl id="image" isRequired>
                    <FormLabel>Plant Image</FormLabel>
                    <Input
                      // {...register("imageFile", { required: true })}
                      type="file"
                      onChange={(e) => putImageContest(e.target.files)}
                    />
                  </FormControl>
                </Box>

                <Stack spacing={10} pt={2}>
                  <Button
                    type="submit"
                    loadingText="Uploading"
                    size="lg"
                    bg={"green.400"}
                    color={"white"}
                    _hover={{
                      bg: "green.500",
                    }}
                  >
                    Upload
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </form>
    </>
  );
};

export default Admin;
