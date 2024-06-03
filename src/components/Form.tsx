import React, { useState, useEffect } from 'react';
import {
  Input,
  Select,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';

// Errorオブジェクトの型を定義
type Errors = {
  studentNumber?: string;
  name?: string;
  email?: string;
  grade?: string;
  department?: string;
};

// Formコンポーネントを作成
function Form() {
  const [studentNumber, setStudentNumber] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [grade, setGrade] = useState('');
  const [department, setDepartment] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // フォームの入力値を検証する関数
  const validate = (field: string, value: string | null) => {
    let isValid = true;
    let errorsCopy: Errors = { ...errors };

    // 学籍番号のバリデーション
    if (field === 'studentNumber' || field === 'all') {
      const studentNumberPattern = /^[0-9A-Z]*$/;
      if (value && !studentNumberPattern.test(value)) {
        errorsCopy.studentNumber = '学籍番号は半角数字および大文字アルファベットのみ使用できます。';
        isValid = false;
      } else {
        errorsCopy.studentNumber = '';
      }
    }

    // 氏名のバリデーション
    if (field === 'name' || field === 'all') {
      const namePattern = /^[^\s\u3000]*$/; // 半角および全角スペース禁止
      if (value && !namePattern.test(value)) {
        errorsCopy.name = '氏名には半角および全角スペースを含めることはできません。';
        isValid = false;
      } else {
        errorsCopy.name = '';
      }
    }

    // メールアドレスのバリデーション
    if (field === 'email' || field === 'all') {
      if (value && !/\S+@\S+\.\S+/.test(value)) {
        errorsCopy.email = '全学メールアドレスを入力してください。';
        isValid = false;
      } else {
        errorsCopy.email = '';
      }
    }

    // 学年のバリデーション
    if (field === 'grade' || field === 'all') {
      if (value === '') {
        errorsCopy.grade = '学年を選択してください。';
        isValid = false;
      } else {
        errorsCopy.grade = '';
      }
    }

    // 所属部門のバリデーション
    if (field === 'department' || field === 'all') {
      if (value === '') {
        errorsCopy.department = '所属部門を選択してください。';
        isValid = false;
      } else {
        errorsCopy.department = '';
      }
    }

    setErrors(errorsCopy);
    return isValid;
  };

  useEffect(() => {
    const formIsValid =
      studentNumber && name && email && grade && department &&
      !errors.studentNumber && !errors.name && !errors.email && !errors.grade && !errors.department;
    setIsButtonDisabled(!formIsValid);
  }, [studentNumber, name, email, grade, department, errors]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validate('all', null)) {
      const formData = {
        studentNumber,
        name,
        email,
        grade,
        department,
      };
      console.log(JSON.stringify(formData, null, 2));
    }
  };

  return (
    <div className="register-page">
      <h1>メンバー登録ページ</h1>
      <form onSubmit={handleSubmit}>
        <FormControl isInvalid={!!errors.studentNumber} isRequired>
          <FormLabel>学籍番号</FormLabel>
          <Input
            placeholder="学籍番号"
            value={studentNumber}
            onChange={(e) => {
              setStudentNumber(e.target.value);
              validate('studentNumber', e.target.value);
            }}
          />
          <FormErrorMessage>{errors.studentNumber}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.name} isRequired>
          <FormLabel>氏名</FormLabel>
          <Input
            placeholder="氏名"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              validate('name', e.target.value);
            }}
          />
          <FormErrorMessage>{errors.name}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.email} isRequired>
          <FormLabel>全学メールアドレス</FormLabel>
          <Input
            type="email"
            placeholder="全学メールアドレス"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validate('email', e.target.value);
            }}
          />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.grade} isRequired>
          <FormLabel>学年</FormLabel>
          <Select
            placeholder="学年を選択してください"
            value={grade}
            onChange={(e) => {
              setGrade(e.target.value);
              validate('grade', e.target.value);
            }}
          >
            <option value="1年">1年</option>
            <option value="2年">2年</option>
            <option value="3年">3年</option>
            <option value="4年">4年</option>
          </Select>
          <FormErrorMessage>{errors.grade}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.department} isRequired>
          <FormLabel>所属部門</FormLabel>
          <Select
            placeholder="部門を選択してください"
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              validate('department', e.target.value);
            }}
          >
            <option value="Technology部門">Technology部門</option>
            <option value="Marketing部門">Marketing部門</option>
            <option value="Event部門">Event部門</option>
          </Select>
          <FormErrorMessage>{errors.department}</FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          disabled={isButtonDisabled}
          bg={isButtonDisabled ? 'gray.400' : 'blue.500'}
          color="white"
          _hover={{ bg: isButtonDisabled ? 'gray.400' : 'blue.600' }}
          _disabled={{ cursor: 'not-allowed' }}
          cursor={isButtonDisabled ? 'not-allowed' : 'pointer'}
        >
          登録
        </Button>
      </form>
    </div>
  );
}

export default Form;
