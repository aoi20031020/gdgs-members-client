import React, { useState } from 'react';
import styled from "styled-components";
import {
  Input,
  Select,
  Button,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

const Title =styled.h1`
  text-align:center;
  font-size: 2em;
  font-weight:bold;
`;

const Wrapper = styled.div`
  max-width: 750px;
  margin-left:auto ;
    margin-right: auto;
`;

const Box =styled.div`
  background:lightgray;
`;

function Form() {
  const [studentNumber, setStudentNumber] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [grade, setGrade] = useState('');
  const [department, setDepartment] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = {
      studentNumber,
      name,
      email,
      grade,
      department,
    };
    console.log(JSON.stringify(formData, null, 2));
  };

  return (

    <Wrapper>
    <div className="register-page">
        <Title>
          <h1>メンバーを登録する</h1>
        </Title>
          <form onSubmit={handleSubmit} >
        <FormControl>
          <FormLabel>学籍番号</FormLabel>
          <Box>
            <div>
            <Input
              placeholder="student number"
              value={studentNumber}
              onChange={(e) => setStudentNumber(e.target.value)}
            />
            </div>
          </Box>
        </FormControl>

        <FormControl>
          <FormLabel>氏名</FormLabel>
          <Box>
            <div>
              <Input
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </Box>
        </FormControl>

        <FormControl>
          <FormLabel>全学メールアドレス</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>学年</FormLabel>
          <Select
            placeholder="学年を選択してください"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          >
            <option value="1年">1年</option>
            <option value="2年">2年</option>
            <option value="3年">3年</option>
            <option value="4年">4年</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>所属部門</FormLabel>
          <Select
            placeholder="部門を選択してください"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="Technology部門">Technology部門</option>
            <option value="Marketing部門">Marketing部門</option>
            <option value="Event部門">Event部門</option>
          </Select>
        </FormControl>

        <Button colorScheme="teal" type="submit">
          登録
        </Button>
      </form>
    </div>
    </Wrapper>
  );
}

export default Form;
