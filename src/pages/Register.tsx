import * as React from 'react'

// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'
import { Input } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import Form from '../components/Form'

function Register() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
   <Form />
  )
}

export default Register;