import React, { useState, useEffect, useRef } from "react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
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
    Divider
} from "@chakra-ui/react";
import students from "./testdata";
import styled from "styled-components";

const StyledMembers = styled.div`
    width: 100%;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
`;

const StyledTable = styled.td`
    text-align: center;
    padding: 20px;
    width: 100%;
    border-bottom: 1px solid #ddd;
`;
const StyledTableHeader = styled.th`
    color: #64748b;
    padding: 20px;
    fontfamily: 'manrope';
    font-size: 15px;
    border-bottom: 1px solid #ddd;
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

    //     useEffect(() => {
    //     fetchData();
    // }, []);

    // const fetchData = async () => {
    //     try {
    //         const response = await fetch(students); // 正しいパスに変更してください
    //         const result = await response.json();
    //         setData(result);
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //     }
    // };


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
                                    <StyledTableHeader>Technology</StyledTableHeader>
                                    <StyledTableHeader>Marketing</StyledTableHeader>
                                    <StyledTableHeader>Event</StyledTableHeader>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {Object.keys(data).map((key, index) => (
                                    <>
                                        <Tr key={index} onClick={() => handleRowClick(data[key])} style={{ cursor: 'pointer' }}>
                                            <StyledTable>{index + 1}</StyledTable>
                                            <StyledTable>{key}</StyledTable>
                                            <StyledTable>{data[key].name}</StyledTable>
                                            <StyledTable>{data[key].email}</StyledTable>
                                            <StyledTable>{data[key].grade}</StyledTable>
                                            <StyledTable>{data[key].technology}</StyledTable>
                                            <StyledTable>{data[key].marketing}</StyledTable>
                                            <StyledTable>{data[key].event}</StyledTable>
                                        </Tr>
                                        {/* <Divider 
                                            borderWidth= {5}
                                            height= {4}
                                        /> */}
                                    </>
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
                                    <p><strong>Name:</strong> {selectedStudent.name}</p>
                                    <p><strong>Email:</strong> {selectedStudent.email}</p>
                                    <p><strong>Grade:</strong> {selectedStudent.grade}</p>
                                    <p><strong>Technology:</strong> {selectedStudent.technology}</p>
                                    <p><strong>Marketing:</strong> {selectedStudent.marketing}</p>
                                    <p><strong>Event:</strong> {selectedStudent.event}</p>
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
