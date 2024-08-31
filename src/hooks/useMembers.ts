// hooks/useMembers.ts
import { useCallback } from "react";
import { useAuth } from "./useAuth";
import { API_BASE_URL } from "../config";

export interface Member {
  id: string;
  student_id: string;
  name: string;
  email: string;
  year: number;
  team_technology: boolean;
  team_marketing: boolean;
  team_event: boolean;
}

export interface NewMember {
  student_id: string;
  name: string;
  email: string;
  year: number;
  team_technology: boolean;
  team_marketing: boolean;
  team_event: boolean;
}

export function useMembers() {
  const { checkSessionToken } = useAuth();

  const getMembers = useCallback(async () => {
    const token = checkSessionToken();
    console.log("Session token in useMembers:", token);
    if (!token) {
      throw new Error("No session token available. Please log in.");
    }

    try {
      const response = await fetch(`${API_BASE_URL}/members`, {
        headers: {
          Authorization: `Session ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch members: ${response.statusText}`);
      }
      const data = await response.json();
      return data.members || []; // サーバーからの応答に 'members' プロパティがあると仮定
    } catch (error) {
      console.error("Error fetching members:", error);
      throw error;
    }
  }, [checkSessionToken]);

  const getMemberById = useCallback(
    async (id: string): Promise<Member> => {
      try {
        const response = await fetch(`${API_BASE_URL}/members/${id}`, {
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
        const response = await fetch(`${API_BASE_URL}/members/${id}`, {
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
