import React from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Switch,
  Text,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Spacer,
  Flex,
} from "@chakra-ui/react";
import { Member } from "../tepe/members";
import { useAuth } from "../hooks/useAuth";
import { useMembers } from "../hooks/useMembers";
import { useRef, useState } from "react";

interface MemberDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMember: Member | null;
  setSelectedMember: (member: Member) => void;
  onUpdate: () => void;
}

const MemberDrawer: React.FC<MemberDrawerProps> = ({
  isOpen,
  onClose,
  selectedMember,
  setSelectedMember,
  onUpdate,
}) => {
  const { user } = useAuth(); // ロール確認用
  const { updateMember, deleteMember } = useMembers();
  const toast = useToast();
  const cancelRef = useRef(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  /*
  編集可能かどうかのフラグ
  DEVELOPERとADMINのみ編集可能
  CORE_MEMBERは閲覧のみ
  */
  const isEditable = user?.role === "DEVELOPER" || user?.role === "ADMIN";

  //更新処理
  const handleSubmit = async () => {
    if (!selectedMember) return;

    try {
      await updateMember(selectedMember.student_id, {
        name: selectedMember.name,
        email: selectedMember.email,
        year: selectedMember.year,
        teamTechnology: selectedMember.team_technology,
        teamMarketing: selectedMember.team_marketing,
        teamEvent: selectedMember.team_event,
        role: selectedMember.role,
      });

      toast({
        title: "更新完了",
        description: "メンバー情報が正常に更新されました。",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
      onUpdate(); // 🔽 ここで再取得
      onClose();
    } catch (error) {
      toast({
        title: "更新失敗",
        description:
          error instanceof Error
            ? error.message
            : "更新中にエラーが発生しました。",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  // 削除処理
  const handleDelete = async () => {
    if (!selectedMember) return;
    try {
      await deleteMember(selectedMember.student_id);
      toast({
        title: "削除完了",
        description: "メンバーを削除しました。",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
      setIsDeleteDialogOpen(false);
      onUpdate(); // リスト再取得
      onClose(); // Drawerも閉じる
    } catch (error) {
      toast({
        title: "削除失敗",
        description:
          error instanceof Error
            ? error.message
            : "削除中にエラーが発生しました。",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  if (!selectedMember) return null;
  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>メンバー詳細</DrawerHeader>
          <DrawerBody>
            {selectedMember && (
              <form>
                <FormControl mb={4}>
                  <FormLabel>学籍番号</FormLabel>
                  <Input
                    isDisabled={true} // 学籍番号は編集不可
                    bg="gray.100"
                    _disabled={{ opacity: 1 }}
                    value={selectedMember.student_id}
                    onChange={(e) =>
                      setSelectedMember({
                        ...selectedMember,
                        student_id: e.target.value,
                      })
                    }
                  />
                </FormControl>

                <FormControl mb={4}>
                  <FormLabel>氏名</FormLabel>
                  <Input
                    isDisabled={!isEditable}
                    _disabled={{ opacity: 1 }}
                    value={selectedMember.name}
                    onChange={(e) =>
                      setSelectedMember({
                        ...selectedMember,
                        name: e.target.value,
                      })
                    }
                  />
                </FormControl>

                <FormControl mb={4}>
                  <FormLabel>メール</FormLabel>
                  <Input
                    isDisabled={!isEditable}
                    _disabled={{ opacity: 1 }}
                    value={selectedMember.email}
                    onChange={(e) =>
                      setSelectedMember({
                        ...selectedMember,
                        email: e.target.value,
                      })
                    }
                  />
                </FormControl>

                <FormControl mb={4}>
                  <FormLabel>学年</FormLabel>
                  <Select
                    isDisabled={!isEditable}
                    _disabled={{ opacity: 1 }}
                    value={selectedMember.year}
                    onChange={(e) =>
                      setSelectedMember({
                        ...selectedMember,
                        year: Number(e.target.value),
                      })
                    }
                  >
                    <option value="">選択してください</option>
                    <option value="1">1年</option>
                    <option value="2">2年</option>
                    <option value="3">3年</option>
                    <option value="4">4年</option>
                  </Select>
                </FormControl>

                <FormControl display="flex" alignItems="center" mb={4}>
                  <FormLabel htmlFor="tech-switch" mb="0" minW="120px">
                    Technology
                  </FormLabel>
                  <Switch
                    isDisabled={!isEditable}
                    _disabled={{ opacity: 1 }}
                    id="tech-switch"
                    isChecked={selectedMember.team_technology}
                    onChange={(e) =>
                      setSelectedMember({
                        ...selectedMember,
                        team_technology: e.target.checked,
                      })
                    }
                  />
                </FormControl>

                <FormControl display="flex" alignItems="center" mb={4}>
                  <FormLabel htmlFor="marketing-switch" mb="0" minW="120px">
                    Marketing
                  </FormLabel>
                  <Switch
                    isDisabled={!isEditable}
                    _disabled={{ opacity: 1 }}
                    id="marketing-switch"
                    isChecked={selectedMember.team_marketing}
                    onChange={(e) =>
                      setSelectedMember({
                        ...selectedMember,
                        team_marketing: e.target.checked,
                      })
                    }
                  />
                </FormControl>

                <FormControl display="flex" alignItems="center" mb={4}>
                  <FormLabel htmlFor="event-switch" mb="0" minW="120px">
                    Event
                  </FormLabel>
                  <Switch
                    isDisabled={!isEditable}
                    _disabled={{ opacity: 1 }}
                    id="event-switch"
                    isChecked={selectedMember.team_event}
                    onChange={(e) =>
                      setSelectedMember({
                        ...selectedMember,
                        team_event: e.target.checked,
                      })
                    }
                  />
                </FormControl>

                <FormControl mb={4}>
                  <FormLabel>ROLE</FormLabel>
                  <Select
                    isDisabled={!isEditable}
                    _disabled={{ opacity: 1 }}
                    value={selectedMember.role}
                    onChange={(e) =>
                      setSelectedMember({
                        ...selectedMember,
                        role: e.target.value,
                      })
                    }
                  >
                    <option value="">選択してください</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="DEVELOPER">DEVELOPER</option>
                    <option value="MEMBER">MEMBER</option>
                    <option value="CORE_MEMBER">CORE_MEMBER</option>
                  </Select>
                </FormControl>

                {!isEditable && (
                  <Text color="red.500" mt={4}>
                    編集はADMINのみできます
                  </Text>
                )}
              </form>
            )}
          </DrawerBody>
          <DrawerFooter>
            <Flex w="100%" align="center">
              <Button colorScheme="blue" size="lg" onClick={onClose}>
                閉じる
              </Button>
              <Spacer />
              {isEditable && (
                <>
                  <Button
                    colorScheme="green"
                    size="lg"
                    ml={5}
                    onClick={handleSubmit}
                  >
                    保存
                  </Button>
                  <Button
                    colorScheme="red"
                    size="lg"
                    ml={5}
                    onClick={() => setIsDeleteDialogOpen(true)}
                  >
                    削除
                  </Button>
                </>
              )}
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <AlertDialog
        isOpen={isDeleteDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>本当に削除しますか？</AlertDialogHeader>
            <AlertDialogBody>
              この操作は取り消せません。<br></br>本当に「{selectedMember?.name}
              」を削除しますか？
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                キャンセル
              </Button>
              <Button
                colorScheme="red"
                onClick={async () => {
                  handleDelete();
                }}
                ml={3}
              >
                削除する
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default MemberDrawer;
