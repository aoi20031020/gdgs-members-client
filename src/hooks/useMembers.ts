// hooks/useMembers.ts
import { useState, useCallback, useEffect } from "react";
import { useAuth } from "./useAuth";
import { API_BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";

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
  const { isAuthenticated, sessionToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !sessionToken) {
      navigate("/login");
    }
  }, [isAuthenticated, sessionToken, navigate]);

  const getMembers = useCallback(async (): Promise<Member[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/members`, {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch members");
      return await response.json();
    } catch (error) {
      console.error("Error fetching members:", error);
      throw error;
    }
  }, [sessionToken]);

  const getMemberById = useCallback(
    async (id: string): Promise<Member> => {
      try {
        const response = await fetch(`${API_BASE_URL}/members/${id}`, {
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch member");
        return await response.json();
      } catch (error) {
        console.error("Error fetching member:", error);
        throw error;
      }
    },
    [sessionToken]
  );

  const addMember = useCallback(
    async (newMember: NewMember): Promise<{ id: string }> => {
      try {
        const response = await fetch(`${API_BASE_URL}/members`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionToken}`,
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
    [sessionToken]
  );

  const deleteMember = useCallback(
    async (id: string): Promise<void> => {
      try {
        const response = await fetch(`${API_BASE_URL}/members/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        });
        if (!response.ok) throw new Error("Failed to delete member");
      } catch (error) {
        console.error("Error deleting member:", error);
        throw error;
      }
    },
    [sessionToken]
  );

  return { getMembers, getMemberById, addMember, deleteMember };
}
