import * as React from 'react'

// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'
import { Input } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'

function Register() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
         <div className="register-page">
     <h1>メンバー登録ページ</h1>
     <form>

       <FormControl>
        <FormLabel>学籍番号</FormLabel>
        <Input type='email' />
      </FormControl>

       <FormControl>
        <FormLabel>氏名</FormLabel>
        <Input type='email' />
      </FormControl>

      <FormControl>
        <FormLabel>全学メールアドレス</FormLabel>
        <Input type='email' />
      </FormControl>

      <FormControl>
      <FormLabel>学年</FormLabel>
      <Select placeholder='学年を選択してください'>
        <option>1年</option>
        <option>2年</option>
        <option>3年</option>
        <option>4年</option>
        <option>5年以上</option>
      </Select>
    </FormControl>

    <FormControl>
    <FormLabel>所属部門</FormLabel>
    <Select placeholder='部門を選択してください'>
      <option>Technology</option>
      <option>Marketing</option>
    </Select>
  </FormControl>


  <Button colorScheme="teal" type="submit">
  登録
  </Button>

     </form>
   </div>

    </ChakraProvider>
  )
}

export default Register;
