export function isStrongPassword(password: string): boolean {
  const regex = /^(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/;
  return regex.test(password);
}
