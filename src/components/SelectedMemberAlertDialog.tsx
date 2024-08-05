import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { Member } from "../services/memberService";

type Props = {
  isOpen: boolean;
  leastDestructiveRef: React.RefObject<HTMLButtonElement>;
  onClose: () => void;
  selectedMember: Member | null;
};
function SelectedMemberAlertDialog({
  isOpen,
  leastDestructiveRef,
  onClose,
  selectedMember,
}: Props) {
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={leastDestructiveRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            学生情報
          </AlertDialogHeader>
          <AlertDialogBody>
            <p>
              <strong>学籍番号:</strong> {selectedMember?.student_id}
            </p>
            <p>
              <strong>氏名:</strong> {selectedMember?.name}
            </p>
            <p>
              <strong>メール:</strong> {selectedMember?.email}
            </p>
            <p>
              <strong>学年:</strong> {selectedMember?.year}
            </p>
            <p>
              <strong>Technology:</strong>{" "}
              {selectedMember?.team_technology ? "○" : "×"}
            </p>
            <p>
              <strong>Marketing:</strong>{" "}
              {selectedMember?.team_marketing ? "○" : "×"}
            </p>
            <p>
              <strong>Event:</strong> {selectedMember?.team_event ? "○" : "×"}
            </p>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={leastDestructiveRef} onClick={onClose}>
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default SelectedMemberAlertDialog;
