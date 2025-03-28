import React, { useState, useEffect, useCallback } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  TableCaption,
  TableContainer,
  Button,
  useDisclosure,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import styled from "styled-components";
import { useMembers } from "../hooks/useMembers";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Member } from "../tepes/members";

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
  text-align: left;
  padding: 20px;
  border-bottom: 1px solid #ddd;
`;

const StyledTableTeam = styled(StyledTableCell)`
  text-align: center;
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

const StyledButtonBox = styled.div`
  display: flex;
  justify-content: center; /* 中央揃え */
  align-items: center;
  gap: 12px; /* ボタン間の間隔 */
`;

const StyledBoxTextCenter = styled.div`
  text-align: center;
`;

function Members() {
  const { getMembers, getMemberById, deleteMember } = useMembers();
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated, checkSessionToken } = useAuth();
  const navigate = useNavigate();

  const handleError = useCallback(
    (error: unknown, customMessage: string) => {
      let errorMessage: string;
      if (error instanceof Error) {
        errorMessage = error.message;
        console.error(customMessage, errorMessage);
        if (errorMessage.includes("No session token available")) {
          navigate("/login");
        }
      } else {
        errorMessage = `An unknown error occurred: ${customMessage}`;
        console.error(errorMessage, error);
      }
      setError(errorMessage);
    },
    [navigate]
  );

  const fetchMembersData = useCallback(async () => {
    try {
      setIsLoading(true);
      const data: Member[] = await getMembers();
      console.log(data);
      await setMembers(data || null); // データがnullの場合は空配列を設定
      setError(null);
    } catch (error: unknown) {
      handleError(error, "Error fetching members:");
      setMembers([]); // エラー時は空配列を設定
    } finally {
      setIsLoading(false);
    }
  }, [getMembers, handleError]);

  useEffect(() => {
    const token = checkSessionToken();
    console.log(
      "Authentication state:",
      isAuthenticated,
      "Session token:",
      token
    );
    // if (!token) {
    //   console.log("No token, redirecting to login");
    //   navigate("/login");
    //   return;
    // }

    fetchMembersData();
  }, [checkSessionToken, isAuthenticated, navigate, fetchMembersData]);

  const handleRowClick = async (member: Member) => {
    console.log(member);
    try {
      setIsLoading(true);
      // const memberData = await getMemberById(member);
      setSelectedMember(member);
      onOpen();
    } catch (error) {
      handleError(error, "Error fetching member details:");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMember = async (id: string) => {
    try {
      await deleteMember(id);
      await fetchMembersData(); // Refresh the member list
    } catch (error) {
      handleError(error, "Error deleting member:");
    }
  };

  if (isLoading) {
    return (
      <StyledMembers>
        <Spinner />
        <p>Loading members...</p>
      </StyledMembers>
    );
  }

  if (error) {
    return (
      <StyledMembers>
        <p>{error}</p>
      </StyledMembers>
    );
  }

  return (
    <StyledMembers>
      <StyledTable>
        <TableContainer>
          <Table colorScheme="gray">
            <TableCaption>メンバー一覧</TableCaption>
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
                <StyledTableHeader>操作</StyledTableHeader>
              </Tr>
            </Thead>
            <Tbody>
              {members.length > 0 ? (
                members.map((member, index) => (
                  <Tr key={member.id}>
                    <StyledTableCell>
                      <StyledBoxTextCenter>{member.id}</StyledBoxTextCenter>
                    </StyledTableCell>
                    <StyledTableCell>{member.student_id}</StyledTableCell>
                    <StyledTableCell>{member.name}</StyledTableCell>
                    <StyledTableCell>{member.email}</StyledTableCell>
                    <StyledTableCell>
                      <StyledBoxTextCenter>{member.year}</StyledBoxTextCenter>
                    </StyledTableCell>
                    <StyledTableTeam>
                      {member.team_technology ? "○" : "×"}
                    </StyledTableTeam>
                    <StyledTableTeam>
                      {member.team_marketing ? "○" : "×"}
                    </StyledTableTeam>
                    <StyledTableTeam>
                      {member.team_event ? "○" : "×"}
                    </StyledTableTeam>
                    <StyledTableCell>
                      <StyledButtonBox>
                        <Button onClick={() => handleRowClick(member)}>
                          詳細
                        </Button>
                        {/* <Button
                          colorScheme="red"
                          onClick={() => handleDeleteMember(member.id)}
                        >
                          削除
                        </Button> */}
                      </StyledButtonBox>
                    </StyledTableCell>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <StyledTableCell colSpan={9}>
                    No members found
                  </StyledTableCell>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </StyledTable>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>メンバー詳細</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedMember && (
              <>
                <p>学籍番号: {selectedMember.student_id}</p>
                <p>氏名: {selectedMember.name}</p>
                <p>メール: {selectedMember.email}</p>
                <p>学年: {selectedMember.year}</p>
                <p>
                  Technology: {selectedMember.team_technology ? "Yes" : "No"}
                </p>
                <p>Marketing: {selectedMember.team_marketing ? "Yes" : "No"}</p>
                <p>Event: {selectedMember.team_event ? "Yes" : "No"}</p>
              </>
            )}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </StyledMembers>
  );
}

export default Members;
