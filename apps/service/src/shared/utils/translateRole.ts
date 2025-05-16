export function translateRole(role: string): string {
  const roleMap: Record<string, string> = {
    GENERAL: "부원",
    CHAIRMAN: "회장",
    VICE_CHAIRMAN: "부회장",
    EXECUTIVE: "임원",
    ADMINISTRATOR: "관리자",
  };

  return roleMap[role] || "알 수 없음";
}
