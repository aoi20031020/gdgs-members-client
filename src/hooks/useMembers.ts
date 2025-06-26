import { useCallback } from "react";
import { API_BASE_URL } from "../config";
import { Member, ApiMember } from "../tepe/members";

export function useMembers() {
  // メンバー一覧取得
  const getMembers = useCallback(async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("No authentication token found");

      const response = await fetch(`${API_BASE_URL}/users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch members: ${response.statusText}`);
      }

      const data: ApiMember[] = await response.json();
      const members: Member[] = data.map((element) => ({
        id: element.id,
        student_id: element.studentId,
        name: element.name,
        email: element.email,
        year: element.year,
        team_technology: element.teamTechnology,
        team_marketing: element.teamMarketing,
        team_event: element.teamEvent,
        role: element.role,
      }));

      return members || [];
    } catch (error) {
      console.error("Error fetching members:", error);
      throw error;
    }
  }, []);

  // メンバー登録
  const addMember = useCallback(
    async (formData: Omit<ApiMember, "id" | "role">) => {
      try {
        const token = sessionStorage.getItem("authToken");
        if (!token) throw new Error("No authentication token found");

        const response = await fetch(`${API_BASE_URL}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "メンバー登録に失敗しました");
        }

        return await response.json(); // 成功したら登録済みデータを返す
      } catch (error) {
        console.error("Error adding member:", error);
        throw error;
      }
    },
    []
  );

  // メンバー更新
  const updateMember = useCallback(
    async (id: string, data: Partial<ApiMember>) => {
      try {
        const token = sessionStorage.getItem("authToken");
        if (!token) throw new Error("No authentication token found");

        const response = await fetch(`${API_BASE_URL}/users/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "メンバーの更新に失敗しました");
        }

        return await response.json(); // 更新後のデータを返す
      } catch (error) {
        console.error("Error updating member:", error);
        throw error;
      }
    },
    []
  );

  // メンバー削除
  const deleteMember = useCallback(async (id: string) => {
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("No authentication token found");

      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "メンバーの削除に失敗しました");
      }

      return true; // 成功時は true を返す
    } catch (error) {
      console.error("Error deleting member:", error);
      throw error;
    }
  }, []);

  return { getMembers, addMember, updateMember, deleteMember };
}
