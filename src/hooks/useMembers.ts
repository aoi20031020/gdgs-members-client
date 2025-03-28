// hooks/useMembers.ts
import { useCallback } from "react";
import { useAuth } from "./useAuth";
import { API_BASE_URL } from "../config";
import { Member, NewMember, ApiMember } from "../tepes/members";

export function useMembers() {
  const { checkSessionToken } = useAuth();

  const getMembers = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      if (!response.ok) {
        throw new Error(`Failed to fetch members: ${response.statusText}`);
      }
      const data: ApiMember[] = await response.json();
      console.log(data);
      const members: Member[] = data.map((element) => ({
        id: element.id,
        student_id: element.studentId,
        name: element.name,
        email: element.email,
        year: element.year,
        team_technology: element.teamTechnology,
        team_marketing: element.teamMarketing,
        team_event: element.teamEvent,
      }));
      return members || []; // 'members' プロパティがあることを想定
    } catch (error) {
      console.error("Error fetching members:", error);
      throw error;
    }
  }, []);

  const getMemberById = useCallback(
    async (id: string): Promise<Member> => {
      try {
        const response = await fetch(`${API_BASE_URL}/users/${id}`, {
          headers: {
            Authorization: `Bearer ${checkSessionToken}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch member");
        return await response.json();
      } catch (error) {
        console.error("Error fetching member:", error);
        throw error;
      }
    },
    [checkSessionToken]
  );

  const addMember = useCallback(
    async (newMember: NewMember): Promise<{ id: string }> => {
      try {
        const response = await fetch(`${API_BASE_URL}/members`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${checkSessionToken}`,
          },
          body: JSON.stringify(newMember),
        });
        if (!response.ok) throw new Error("Failed to add member");
        return await response.json();
      } catch (error) {
        console.error("Error adding member:", error);
        throw error;
      }
    },
    [checkSessionToken]
  );

  const deleteMember = useCallback(
    async (id: string): Promise<void> => {
      try {
        const response = await fetch(`${API_BASE_URL}/users/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${checkSessionToken}`,
          },
        });
        if (!response.ok) throw new Error("Failed to delete member");
      } catch (error) {
        console.error("Error deleting member:", error);
        throw error;
      }
    },
    [checkSessionToken]
  );

  return { getMembers, getMemberById, addMember, deleteMember };
}
