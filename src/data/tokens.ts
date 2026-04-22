export type Role = "learner" | "care" | "supervisor" | "admin";

export type TokenData = {
  token: string;
  role: Role;
  hospitalId: string;
  hospitalName: string;
};

export const TOKENS: TokenData[] = [
  {
    token: "LEARNER-123",
    role: "learner",
    hospitalId: "hosp-1",
    hospitalName: "MediNova Teaching Hospital",
  },
  {
    token: "CARE-123",
    role: "care",
    hospitalId: "hosp-1",
    hospitalName: "MediNova Teaching Hospital",
  },
  {
    token: "SUP-123",
    role: "supervisor",
    hospitalId: "hosp-1",
    hospitalName: "MediNova Teaching Hospital",
  },
  {
    token: "ADMIN-123",
    role: "admin",
    hospitalId: "main",
    hospitalName: "MediNova Global",
  },
];