// src/services/memberService.ts

import { useAuthenticatedFetch } from "../hooks/useAuthenticatedFetch";

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

const API_BASE_URL = "https://gdsc-chuo-membership-backend.vercel.app";

export const useMemberService = () => {
  const authFetch = useAuthenticatedFetch();

  const getMembers = async (): Promise<Member[]> => {
    const response = await authFetch(`${API_BASE_URL}/members`);
    if (!response.ok) {
      throw new Error("Failed to fetch members");
    }
    return await response.json();
  };

  const getMemberById = async (id: string): Promise<Member> => {
    const response = await authFetch(`${API_BASE_URL}/members/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch member");
    }
    return await response.json();
  };

  const addMember = async (newMember: NewMember): Promise<{ id: string }> => {
    const response = await authFetch(`${API_BASE_URL}/members`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMember),
    });
    if (!response.ok) {
      throw new Error("Failed to add member");
    }
    return await response.json();
  };

  const deleteMember = async (id: string): Promise<void> => {
    const response = await authFetch(`${API_BASE_URL}/members/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete member");
    }
  };

  return { getMembers, getMemberById, addMember, deleteMember };
};
