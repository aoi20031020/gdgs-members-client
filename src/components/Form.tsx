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
  padding: 70px;
`;

const Wrapper = styled.div`
  max-width: 600px;
  margin-left:auto ;
  margin-right: auto;
`;

const Box =styled.div`
  background:lightgray;
`;

const Buttoncss = styled.button`
  text-align:center;
  width:50px;
  margin-top: 40px;
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
              <Input
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
          </Box>
        </FormControl>

        <FormControl>
          <FormLabel>全学メールアドレス</FormLabel>
          <Box>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </Box>
        </FormControl>

        <FormControl>
          <FormLabel>学年</FormLabel>
          <Box>
          <Select
            placeholder=" "
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          >
            <option value="1年">1年</option>
            <option value="2年">2年</option>
            <option value="3年">3年</option>
            <option value="4年">4年</option>
          </Select>
          </Box>
        </FormControl>

        <FormControl>
          <FormLabel>所属部門</FormLabel>
          <Box>
          <Select
            placeholder=" "
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="Technology部門">Technology部門</option>
            <option value="Marketing部門">Marketing部門</option>
            <option value="Event部門">Event部門</option>
          </Select>
          </Box>
        </FormControl>

      <Buttoncss>
          <Button colorScheme='teal' type="submit">
            完了
          </Button>
      </Buttoncss>

      </form>
    </div>
    </Wrapper>
  );
}

export default Form;
