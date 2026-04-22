import { TOKENS } from "../data/tokens";

/* =========================
   VERIFY TOKEN (CORE LOGIN)
========================= */
export function verifyToken(inputToken: string) {
  const found = TOKENS.find(t => t.token === inputToken);

  if (!found) return null;

  sessionStorage.setItem("medinova_token", found.token);
  sessionStorage.setItem("medinova_role", found.role);
  sessionStorage.setItem("medinova_hospital_id", found.hospitalId);
  sessionStorage.setItem("medinova_hospital_name", found.hospitalName);

  return found;
}

/* =========================
   GET USER SESSION
========================= */
export function getUser() {
  return {
    token: sessionStorage.getItem("medinova_token"),
    role: sessionStorage.getItem("medinova_role"),
    hospitalId: sessionStorage.getItem("medinova_hospital_id"),
    hospitalName: sessionStorage.getItem("medinova_hospital_name"),
  };
}

/* =========================
   SIMPLE AUTH CHECK (CORE ONLY)
========================= */
export function isLoggedIn() {
  return !!sessionStorage.getItem("medinova_token");
}

/* =========================
   LOGOUT
========================= */
export function logout() {
  sessionStorage.clear();
}