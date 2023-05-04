import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
import axios from "axios";
import { FormEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
// import axios from "../services/api-client";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const business = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    phone: phone,
  };

  const REGISTER_URL = "http://localhost:8080/api/register/signup";

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    console.log(business);

    try {
      const response = await axios.post(REGISTER_URL, business, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      console.log(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"3xl"} textAlign={"center"}>
              Create Account
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              To enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      ref={firstNameRef}
                      type="text"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      ref={lastNameRef}
                      type="text"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="phone" isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  ref={phoneRef}
                  type="number"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </FormControl>

              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  ref={emailRef}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    ref={passwordRef}
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link to="/login" color={"blue.400"}>
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
  );
};

export default SignUp;
