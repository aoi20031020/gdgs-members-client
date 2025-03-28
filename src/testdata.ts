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

export const students: Member[] = [
  {
    id: "1",
    student_id: "21G1101001L",
    name: "小野 潤一",
    email: "a21.aaaa@g.chuo-u.ac.jp",
    year: 4,
    team_technology: true,
    team_marketing: false,
    team_event: false,
  },
];
