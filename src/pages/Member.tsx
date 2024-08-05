import React, { useState, useEffect, useRef } from "react";
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
} from "@chakra-ui/react";
import styled from "styled-components";
import { useMemberService, Member } from "../services/memberService";
import SelectedMemberAlertDialog from "../components/SelectedMemberAlertDialog";

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

function Members() {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getMembers, deleteMember } = useMemberService();
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setIsLoading(true);
      const data = await getMembers();
      setMembers(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching members:", error);
      setError("Failed to fetch members. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRowClick = (member: Member) => {
    setSelectedMember(member);
    onOpen();
  };

  const handleDeleteMember = async (id: string) => {
    try {
      await deleteMember(id);
      fetchMembers(); // Refresh the member list
    } catch (error) {
      console.error("Error deleting member:", error);
      setError("Failed to delete member. Please try again.");
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
              {members.map((member, index) => (
                <Tr key={member.id}>
                  <StyledTableCell>{index + 1}</StyledTableCell>
                  <StyledTableCell>{member.student_id}</StyledTableCell>
                  <StyledTableCell>{member.name}</StyledTableCell>
                  <StyledTableCell>{member.email}</StyledTableCell>
                  <StyledTableCell>{member.year}</StyledTableCell>
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
                    <Button onClick={() => handleRowClick(member)}>詳細</Button>
                    <Button onClick={() => handleDeleteMember(member.id)}>
                      削除
                    </Button>
                  </StyledTableCell>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </StyledTable>

      {selectedMember && (
        <SelectedMemberAlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          selectedMember={selectedMember}
        />
      )}
    </StyledMembers>
  );
}

export default Members;
