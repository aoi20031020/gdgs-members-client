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

export interface ApiMember {
  id: string;
  studentId: string;
  name: string;
  email: string;
  year: number;
  teamTechnology: boolean;
  teamMarketing: boolean;
  teamEvent: boolean;
  role: string;
}
