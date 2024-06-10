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
    useDisclosure
} from "@chakra-ui/react";
import students from "./testdata";

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
            <TableContainer>
                <Table variant="striped" colorScheme="teal">
                    <TableCaption>連想配列の表示</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>No</Th>
                            <Th>学籍番号</Th>
                            <Th>Name</Th>
                            <Th>Email</Th>
                            <Th>Grade</Th>
                            <Th>Technology</Th>
                            <Th>Marketing</Th>
                            <Th>Event</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {Object.keys(data).map((key, index) => (
                            <Tr key={index} onClick={() => handleRowClick(data[key])} style={{ cursor: 'pointer' }}>
                                <Td>{index + 1}</Td>
                                <Td>{key}</Td>
                                <Td>{data[key].name}</Td>
                                <Td>{data[key].email}</Td>
                                <Td>{data[key].grade}</Td>
                                <Td>{data[key].technology}</Td>
                                <Td>{data[key].marketing}</Td>
                                <Td>{data[key].event}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>

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
        </>
    );
}

export default Members