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
import { useNavigate } from "react-router-dom";
import { Member } from "../tepes/members";

import { useAuth } from "../hooks/useAuth";

const StyledMembers = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: center;
`;

const StyledTable = styled.div`
  width: 100%;
  padding-bottom: 30px; /* PaginationButtonContainer の高さ＋余白分 */
  @media (max-width: 768px) {
    padding-bottom: 0px;
  }
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
  color: white;
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

const StyledBoxTextLeft = styled.div`
  text-align: left;
  color: white;
`;

const PaginationButtonContainer = styled.div<{ footerHeight: string }>`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  min-height: ${({ footerHeight }) => footerHeight}; // 動的に高さを設定
  padding: 12px 20px;
  background: white;
  z-index: 999;
  display: flex;
  justify-content: end;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  background-color: #c0c0c0;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    padding: 8px 10px;
    gap: 8px;
    justify-content: center;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 画面全体を覆う */
`;

function Members() {
  // const { getMembers, getMemberById, deleteMember } = useMembers();
  const { getMembers } = useMembers();
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated, checkSessionToken } = useAuth();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // 1ページあたりのアイテム数
  const totalPages = Math.ceil(members.length / itemsPerPage);
  const currentMembers = members.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const [tableHeight, setTableHeight] = useState("100vh"); // 初期値として100vhを設定
  const [footerHeight, setFooterHeight] = useState("0px"); // フッターの高さを初期化

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
    fetchMembersData();
  }, [checkSessionToken, isAuthenticated, navigate, fetchMembersData]);

  const handleRowClick = async (member: Member) => {
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

  useEffect(() => {
    const calculateHeight = () => {
      const headerHeight = document.querySelector("header")?.clientHeight || 0;
      const footer = document.querySelector("footer")?.clientHeight || 0;
      const paginationHeight =
        document.querySelector(".pagination")?.clientHeight || 0;

      const availableHeight = `calc(100vh - ${
        headerHeight + paginationHeight
      }px)`;
      setTableHeight(availableHeight);
      setFooterHeight(`${footer}px`);
    };

    // ページのロード時とウィンドウリサイズ時に高さを再計算
    calculateHeight();
    window.addEventListener("resize", calculateHeight);

    return () => {
      window.removeEventListener("resize", calculateHeight);
    };
  }, []); // マウント時にのみ実行

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // const handleDeleteMember = async (id: string) => {
  //   try {
  //     await deleteMember(id);
  //     await fetchMembersData(); // Refresh the member list
  //   } catch (error) {
  //     handleError(error, "Error deleting member:");
  //   }
  // };

  if (isLoading) {
    return (
      <LoadingContainer>
        <StyledMembers>
          <Spinner />
          <h1>Loading members...</h1>
        </StyledMembers>
      </LoadingContainer>
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
    <>
      <StyledMembers>
        <StyledTable>
          <TableContainer maxH={tableHeight} overflowY="auto">
            <Table colorScheme="gray" variant="simple" size="md">
              <Thead position="sticky" top={0} zIndex="docked" bg="#c0c0c0">
                <Tr>
                  <StyledTableHeader>
                    <StyledBoxTextLeft>学籍番号</StyledBoxTextLeft>
                  </StyledTableHeader>
                  <StyledTableHeader>
                    <StyledBoxTextLeft>氏名</StyledBoxTextLeft>
                  </StyledTableHeader>
                  <StyledTableHeader>
                    <StyledBoxTextLeft>全学メール</StyledBoxTextLeft>
                  </StyledTableHeader>
                  <StyledTableHeader>学年</StyledTableHeader>
                  <StyledTableHeaderTeam>Technology</StyledTableHeaderTeam>
                  <StyledTableHeaderTeam>Marketing</StyledTableHeaderTeam>
                  <StyledTableHeaderTeam>Event</StyledTableHeaderTeam>
                  {/* <StyledTableHeader></StyledTableHeader> */}
                </Tr>
              </Thead>
              <Tbody>
                {currentMembers.length > 0 ? (
                  currentMembers.map((member, index) => (
                    <Tr key={member.id} onClick={() => handleRowClick(member)}>
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
                      {/* <StyledTableCell>
                      <StyledButtonBox>
                        <Button onClick={() => handleRowClick(member)}>
                          詳細
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={() => handleDeleteMember(member.id)}
                        >
                          削除
                        </Button>
                      </StyledButtonBox>
                    </StyledTableCell> */}
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
                  <p>
                    Marketing: {selectedMember.team_marketing ? "Yes" : "No"}
                  </p>
                  <p>Event: {selectedMember.team_event ? "Yes" : "No"}</p>
                </>
              )}
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </StyledMembers>
      <PaginationButtonContainer
        className="pagination"
        footerHeight={footerHeight}
      >
        <StyledButtonBox>
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            isDisabled={currentPage === 1}
          >
            前へ
          </Button>
          {[...Array(totalPages)].map((_, index) => (
            <Button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              colorScheme={currentPage === index + 1 ? "blue" : "gray"}
            >
              {index + 1}
            </Button>
          ))}
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            isDisabled={currentPage === totalPages}
          >
            次へ
          </Button>
        </StyledButtonBox>
      </PaginationButtonContainer>
    </>
  );
}

export default Members;
