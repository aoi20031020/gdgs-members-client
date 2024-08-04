import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  TableCaption,
  TableContainer,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import students from "./testdata";
import styled from "styled-components";

const StyledMembers = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const StyledTable = styled.div`
  width: 100%;
`;

const StyledTableCell = styled.td`
  text-align: center;
  padding: 20px;
  border-bottom: 1px solid #ddd;
`;

const StyledTableTeam = styled(StyledTableCell)`
  width: 120px;
`;

const StyledTableHeader = styled.th`
  color: #64748b;
  padding: 20px;
  font-family: "manrope";
  font-size: 15px;
  border-bottom: 1px solid #ddd;
`;

const StyledTableHeaderTeam = styled(StyledTableHeader)`
  width: 120px;
`;

interface Student {
  name: string;
  email: string;
  grade: string;
  technology: string;
  marketing: string;
  event: string;
}

function Members() {
  const [data, setData] = useState<{ [key: string]: Student }>({});
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

  useEffect(() => {
    setData(students);
  }, []);

  const handleRowClick = (student: Student) => {
    setSelectedStudent(student);
    onOpen();
  };

  return (
    <>
      <StyledMembers>
        <StyledTable>
          <TableContainer>
            <Table colorScheme="gray">
              <TableCaption>連想配列の表示</TableCaption>
              <Thead>
                <Tr>
                  <StyledTableHeader>No</StyledTableHeader>
                  <StyledTableHeader>学籍番号</StyledTableHeader>
                  <StyledTableHeader>氏名</StyledTableHeader>
                  <StyledTableHeader>全学メール</StyledTableHeader>
                  <StyledTableHeader>学年</StyledTableHeader>
                  <StyledTableHeaderTeam>Technology</StyledTableHeaderTeam>
                  <StyledTableHeaderTeam>Marketing</StyledTableHeaderTeam>
                  <StyledTableHeaderTeam>Event</StyledTableHeaderTeam>
                </Tr>
              </Thead>
              <Tbody>
                {Object.keys(data).map((key, index) => (
                  <Tr
                    key={index}
                    onClick={() => handleRowClick(data[key])}
                    style={{ cursor: "pointer" }}
                  >
                    <StyledTableCell>{index + 1}</StyledTableCell>
                    <StyledTableCell>{key}</StyledTableCell>
                    <StyledTableCell>{data[key].name}</StyledTableCell>
                    <StyledTableCell>{data[key].email}</StyledTableCell>
                    <StyledTableCell>{data[key].grade}</StyledTableCell>
                    <StyledTableTeam>
                      {data[key].technology === "1" ? "○" : "×"}
                    </StyledTableTeam>
                    <StyledTableTeam>
                      {data[key].marketing === "1" ? "○" : "×"}
                    </StyledTableTeam>
                    <StyledTableTeam>
                      {data[key].event === "1" ? "○" : "×"}
                    </StyledTableTeam>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </StyledTable>

        {selectedStudent && (
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  学生情報
                </AlertDialogHeader>
                <AlertDialogBody>
                  <p>
                    <strong>Name:</strong> {selectedStudent.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedStudent.email}
                  </p>
                  <p>
                    <strong>Grade:</strong> {selectedStudent.grade}
                  </p>
                  <p>
                    <strong>Technology:</strong>{" "}
                    {selectedStudent.technology === "1" ? "○" : "×"}
                  </p>
                  <p>
                    <strong>Marketing:</strong>{" "}
                    {selectedStudent.marketing === "1" ? "○" : "×"}
                  </p>
                  <p>
                    <strong>Event:</strong>{" "}
                    {selectedStudent.event === "1" ? "○" : "×"}
                  </p>
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Close
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        )}
      </StyledMembers>
    </>
  );
}

export default Members;
