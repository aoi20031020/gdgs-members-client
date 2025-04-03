import { useCallback } from "react";
import { API_BASE_URL } from "../config";
import { Member, ApiMember } from "../tepes/members";

export function useMembers() {
  const getMembers = useCallback(async () => {
    try {
      // sessionStorage からトークンを取得
      const token = sessionStorage.getItem("authToken");

      // トークンがない場合はエラーをスロー
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${API_BASE_URL}/users`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Authorization ヘッダーにトークンを追加
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
      }));

      return members || []; // 'members' プロパティがあることを想定
    } catch (error) {
      console.error("Error fetching members:", error);
      throw error;
    }
  }, []);

  return { getMembers };
}
