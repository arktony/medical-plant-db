import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

import { FormEvent, useRef, useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";
// import axios from "../services/api-client";

const Login = ({ history }: any) => {
  const { setAuth }: any = useAuth();

  const navigate = useNavigate();

  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const LOGIN_URL = "http://localhost:8080/api/auth/handshake";

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef(null);

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (userRef.current !== null) userRef.current.focus();
  }, []);

  useEffect(() => {
    setErr("");
  }, [user, pwd]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      console.log(JSON.stringify(response?.data));
      // console.log(JSON.stringify(response));

      const jwt = response?.data?.jwt;
      const message = response?.data?.statusCode;
      setAuth({ user, pwd, jwt });
      navigate(from, { replace: true });

      console.log(message);

      setUser("");
      setPwd("");
    } catch (error) {
      setErr("Incorrect username or password");
      console.log(error);
    }
  };

  return (
    <>
      <section>
        <p ref={errRef}>{err}</p>
      </section>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <form onSubmit={handleSubmit}>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    ref={userRef}
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    autoComplete="off"
                    type="email"
                    required
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    type="password"
                  />
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Checkbox>Remember me</Checkbox>
                    <a color={"blue.400"}>Forgot password?</a>
                  </Stack>
                  <Button
                    type="submit"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Sign in
                  </Button>
                  <Link to="/register">Don't have account? Create one</Link>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default Login;
