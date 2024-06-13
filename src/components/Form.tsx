import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Input,
  Select,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Checkbox,
  Stack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

const Title = styled.h1`
  text-align: center;
  font-size: 2em;
  font-weight: bold;
  padding: 30px 0px 30px 0px;
`;

const Wrapper = styled.div`
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const Buttoncenter = styled.div`
  text-align: center;
`;

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
  const [studentNumber, setStudentNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [grade, setGrade] = useState("");
  const [departments, setDepartments] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const cancelRef = React.useRef(null);

  // フォームの入力値を検証する関数
  const validate = (field: string, value: string | null) => {
    let isValid = true;
    let errorsCopy: Errors = { ...errors };

    // 学籍番号のバリデーション
    if (field === "studentNumber" || field === "all") {
      const studentNumberPattern = /^[0-9A-Z]*$/;
      if (value && !studentNumberPattern.test(value)) {
        errorsCopy.studentNumber =
          "学籍番号は半角数字および大文字アルファベットのみ使用できます。";
        isValid = false;
      } else {
        errorsCopy.studentNumber = "";
      }
    }

    // 氏名のバリデーション
    if (field === "name" || field === "all") {
      const namePattern = /^[^\s\u3000]*$/; // 半角および全角スペース禁止
      if (value && !namePattern.test(value)) {
        errorsCopy.name =
          "氏名には半角および全角スペースを含めることはできません。";
        isValid = false;
      } else {
        errorsCopy.name = "";
      }
    }

    // メールアドレスのバリデーション
    if (field === "email" || field === "all") {
      if (value && !/\S+@\S+\.\S+/.test(value)) {
        errorsCopy.email = "全学メールアドレスを入力してください。";
        isValid = false;
      } else {
        errorsCopy.email = "";
      }
    }

    // 学年のバリデーション
    if (field === "grade" || field === "all") {
      if (value === "") {
        errorsCopy.grade = "学年を選択してください。";
        isValid = false;
      } else {
        errorsCopy.grade = "";
      }
    }

    // 所属部門のバリデーション
    if (field === "department" || field === "all") {
      if (departments.length === 0) {
        errorsCopy.department = "所属部門を選択してください。";
        isValid = false;
      } else {
        errorsCopy.department = "";
      }
    }
    setErrors(errorsCopy);
    return isValid;
  };

  useEffect(() => {
    const formIsValid =
      studentNumber &&
      name &&
      email &&
      grade &&
      departments.length > 0 &&
      !errors.studentNumber &&
      !errors.name &&
      !errors.email &&
      !errors.grade &&
      !errors.department;
    setIsButtonDisabled(!formIsValid);
  }, [studentNumber, name, email, grade, departments, errors]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validate("all", null)) {
      setIsAlertOpen(true);
    }
  };

  const handleConfirm = () => {
    setIsAlertOpen(false);
    const formData = {
      studentNumber,
      name,
      email,
      grade,
      department: departments,
    };
    console.log(JSON.stringify(formData, null, 2));
    // ここで送信処理を行う
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setDepartments((prev) => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter((department) => department !== value);
      }
    });
  };

  return (
    <Wrapper>
      <div className="register-page">
        <Title>
          <h1>メンバーを登録する</h1>
        </Title>
        <form onSubmit={handleSubmit}>
          <FormControl isInvalid={!!errors.studentNumber} isRequired>
            <FormLabel>学籍番号</FormLabel>
            <Input
              placeholder="学籍番号"
              value={studentNumber}
              onChange={(e) => {
                setStudentNumber(e.target.value);
                validate("studentNumber", e.target.value);
              }}
              background="#dbdbdb"
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
                validate("name", e.target.value);
              }}
              background="#dbdbdb"
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
                validate("email", e.target.value);
              }}
              background="#dbdbdb"
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
                validate("grade", e.target.value);
              }}
              background="#dbdbdb"
            >
              <option value="1年">1年</option>
              <option value="2年">2年</option>
              <option value="3年">3年</option>
              <option value="4年">4年</option>
            </Select>
            <FormErrorMessage>{errors.grade}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.department}>
            <FormLabel>所属部門</FormLabel>
            <Stack spacing={2} background="#dbdbdb">
              <Checkbox value="Technology部門" onChange={handleCheckboxChange}>
                Technology部門
              </Checkbox>
              <Checkbox value="Marketing部門" onChange={handleCheckboxChange}>
                Marketing部門
              </Checkbox>
              <Checkbox value="Event部門" onChange={handleCheckboxChange}>
                Event部門
              </Checkbox>
            </Stack>
            <FormErrorMessage>{errors.department}</FormErrorMessage>
          </FormControl>
          <Buttoncenter>
            <div>
              <Button
                background="#b3afaf"
                color="#ffffff"
                width="180px"
                type="submit"
                margin="50px"
                fontWeight="bold"
              >
                完了
              </Button>
            </div>
          </Buttoncenter>
        </form>
        <AlertDialog
          isOpen={isAlertOpen}
          leastDestructiveRef={cancelRef}
          onClose={() => setIsAlertOpen(false)}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                確認
              </AlertDialogHeader>
              <AlertDialogBody>
                {`学籍番号: ${studentNumber}\n氏名: ${name}\n全学メールアドレス: ${email}\n学年: ${grade}\n所属部門: ${departments.join(
                  ", "
                )}`}
                この内容で本当に送信して良いですか？
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={() => setIsAlertOpen(false)}>
                  キャンセル
                </Button>
                <Button colorScheme="blue" onClick={handleConfirm} ml={3}>
                  送信
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </div>
    </Wrapper>
  );
}

export default Form;
