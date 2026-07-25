import { delay } from "@/lib/mockDb";

/**
 * Demo auth — no backend. A single hard-coded account:
 *   email:    admin@gmail.com
 *   password: adminpass
 * The "session" is just a user object kept in localStorage.
 */

const STORAGE_KEY = "lumen-auth-user";
export const DEMO_EMAIL = "admin@gmail.com";
export const DEMO_PASSWORD = "adminpass";

export interface AuthUser {
  id: string;
  email: string;
  role: "authenticated";
  user_metadata: { full_name: string; avatar_url: string };
}

const DEFAULT_USER: AuthUser = {
  id: "demo-admin",
  email: DEMO_EMAIL,
  role: "authenticated",
  user_metadata: { full_name: "Negin Rivera", avatar_url: "" },
};

function readStored(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

function persist(user: AuthUser) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  await delay(null, 500);
  const ok =
    email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD;
  if (!ok) throw new Error("Incorrect email or password");
  const user = readStored() ?? DEFAULT_USER;
  persist(user);
  return { user };
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  await delay(null, 150);
  return readStored();
}

export async function logout() {
  await delay(null, 200);
  localStorage.removeItem(STORAGE_KEY);
}

export interface UpdateUserParams {
  password?: string;
  fullName?: string;
  avatar?: File | null;
}

export async function updateCurrentUser({
  fullName,
  avatar,
}: UpdateUserParams) {
  await delay(null, 500);
  const user = readStored() ?? DEFAULT_USER;
  if (fullName) user.user_metadata.full_name = fullName;
  if (avatar) user.user_metadata.avatar_url = await fileToDataUrl(avatar);
  // password is accepted but not stored in this demo.
  persist(user);
  return { user };
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
