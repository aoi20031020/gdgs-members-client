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
  padding: 70px 0px 40px 0px;
`;

const Wrapper = styled.div`
  max-width: 600px;
  margin-left:auto ;
  margin-right: auto;
`;

const Buttoncenter=styled.div`
text-align:center;
`

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
            <Input
              type="text"
              pattern="^[a-zA-Z0-9]+$"
              maxLength={11}
              minLength={11}
              onChange={(e) => setStudentNumber(e.target.value)}
              background='#dbdbdb'
              required
              value={studentNumber}
            />
        </FormControl>

        <FormControl>
          <FormLabel>氏名</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                background='#dbdbdb'
              />
        </FormControl>

        <FormControl>
          <FormLabel>全学メールアドレス</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            background='#dbdbdb'
          />
        </FormControl>

        <FormControl>
          <FormLabel>学年</FormLabel>
          <Select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            background='#dbdbdb'
            required
          >
            <option disabled selected></option>
            <option value="1年">1年</option>
            <option value="2年">2年</option>
            <option value="3年">3年</option>
            <option value="4年">4年</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>所属部門</FormLabel>
          <Select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            background='#dbdbdb'
            required
          >
            <option disabled selected></option>
            <option value="Technology部門">Technology部門</option>
            <option value="Marketing部門">Marketing部門</option>
            <option value="Event部門">Event部門</option>
          </Select>
        </FormControl>

        <Buttoncenter>
          <div>
          <Button
            background='#b3afaf'
            color='#ffffff'
            width='180px'
            type="submit"
            margin='50px'
            fontWeight='bold'
            >
            完了
          </Button>
          </div>
        </Buttoncenter>

      </form>
    </div>
    </Wrapper>
  );
}

export default Form;