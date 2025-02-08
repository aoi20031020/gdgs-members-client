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
  useToast,
} from "@chakra-ui/react";
import { API_BASE_URL } from "../config";

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

type Errors = {
  studentNumber?: string;
  name?: string;
  email?: string;
  grade?: string;
  department?: string;
};

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
  const toast = useToast();

  const validate = (field: string, value: string | null) => {
    let isValid = true;
    let errorsCopy: Errors = { ...errors };

    if (field === "studentNumber" || field === "all") {
      if (!value) {
        errorsCopy.studentNumber = "学籍番号は必須です。";
        isValid = false;
      } else if (!/^[0-9A-Z]*$/.test(value)) {
        errorsCopy.studentNumber =
          "学籍番号は半角数字および大文字アルファベットのみ使用できます。";
        isValid = false;
      } else {
        errorsCopy.studentNumber = "";
      }
    }

    if (field === "name" || field === "all") {
      if (!value) {
        errorsCopy.name = "氏名は必須です。";
        isValid = false;
      } else if (/[\s\u3000]/.test(value)) {
        errorsCopy.name =
          "氏名には半角および全角スペースを含めることはできません。";
        isValid = false;
      } else {
        errorsCopy.name = "";
      }
    }

    if (field === "email" || field === "all") {
      if (!value) {
        errorsCopy.email = "メールアドレスは必須です。";
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        errorsCopy.email = "有効な全学メールアドレスを入力してください。";
        isValid = false;
      } else {
        errorsCopy.email = "";
      }
    }

    if (field === "grade" || field === "all") {
      if (!value) {
        errorsCopy.grade = "学年を選択してください。";
        isValid = false;
      } else {
        errorsCopy.grade = "";
      }
    }

    if (field === "department" || field === "all") {
      if (departments.length === 0) {
        errorsCopy.department = "少なくとも1つの所属部門を選択してください。";
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

  const handleConfirm = async () => {
    setIsAlertOpen(false);
    const formData = {
      name,
      studentId: studentNumber,
      email,
      year: parseInt(grade),
      teamTechnology: departments.includes("Technology"),
      teamMarketing: departments.includes("Marketing"),
      teamEvent: departments.includes("Event"),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "メンバー登録に失敗しました");
      }

      const result = await response.json();
      console.log("メンバーが正常に登録されました。ID:", result.id);
      // フォームをリセットする処理を追加
      setStudentNumber("");
      setName("");
      setEmail("");
      setGrade("");
      setDepartments([]);
      // 成功メッセージを表示する処理を追加
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("エラー:", error.message);
        // エラーメッセージを表示する処理を追加
      } else {
        console.error("不明なエラーが発生しました:", error);
      }
    }
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
      <Title>メンバーを登録する</Title>
      <form onSubmit={handleSubmit}>
        <FormControl isInvalid={!!errors.studentNumber} mb={4}>
          <FormLabel>学籍番号</FormLabel>
          <Input
            value={studentNumber}
            onChange={(e) => {
              setStudentNumber(e.target.value);
              validate("studentNumber", e.target.value);
            }}
            background="#dbdbdb"
          />
          <FormErrorMessage>{errors.studentNumber}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.name} mb={4}>
          <FormLabel>氏名</FormLabel>
          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              validate("name", e.target.value);
            }}
            background="#dbdbdb"
          />
          <FormErrorMessage>{errors.name}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.email} mb={4}>
          <FormLabel>全学メールアドレス</FormLabel>
          <Input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validate("email", e.target.value);
            }}
            background="#dbdbdb"
          />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.grade} mb={4}>
          <FormLabel>学年</FormLabel>
          <Select
            value={grade}
            onChange={(e) => {
              setGrade(e.target.value);
              validate("grade", e.target.value);
            }}
            background="#dbdbdb"
          >
            <option value="">選択してください</option>
            <option value="1">1年</option>
            <option value="2">2年</option>
            <option value="3">3年</option>
            <option value="4">4年</option>
          </Select>
          <FormErrorMessage>{errors.grade}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.department} mb={4}>
          <FormLabel>所属部門</FormLabel>
          <Stack spacing={2}>
            <Checkbox value="Technology" onChange={handleCheckboxChange}>
              Technology部門
            </Checkbox>
            <Checkbox value="Marketing" onChange={handleCheckboxChange}>
              Marketing部門
            </Checkbox>
            <Checkbox value="Event" onChange={handleCheckboxChange}>
              Event部門
            </Checkbox>
          </Stack>
          <FormErrorMessage>{errors.department}</FormErrorMessage>
        </FormControl>

        <Buttoncenter>
          <Button
            type="submit"
            colorScheme="blue"
            isDisabled={isButtonDisabled}
          >
            完了
          </Button>
        </Buttoncenter>
      </form>

      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsAlertOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>確認</AlertDialogHeader>
            <AlertDialogBody>
              {`学籍番号: ${studentNumber}\n氏名: ${name}\n全学メールアドレス: ${email}\n学年: ${grade}\n所属部門: ${departments.join(
                ", "
              )}`}
              <br />
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
    </Wrapper>
  );
}

export default Form;
