import { api } from "@/lib/axios";

export interface GetProfileResponde {
  id: string,
  name: string,
  email: string,
  phone: string | null,
  role: "manager" | "customer",
  createdAt: Date | null,
  updatedAt: Date | null,
}

export async function getProfile() {
  const response = await api.get<GetProfileResponde>('/me')

  return  response.data
}