import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
} from "@chakra-ui/react";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [studentId, setStudentId] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await login(fullName, studentId);
  };

  return (
    <Box maxW="400px" mx="auto" mt="100px" p="20px" borderWidth="1px" borderRadius="md">
      <Heading mb="4">ログイン</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb="3">
          <FormLabel>本名</FormLabel>
          <Input
            type="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </FormControl>
        <FormControl mb="3">
          <FormLabel>学籍番号</FormLabel>
          <Input
            type="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" width="100%">
          ログイン
        </Button>
      </form>
    </Box>
  );
};

export default Login;
