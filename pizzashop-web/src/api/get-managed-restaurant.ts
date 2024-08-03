import { api } from "@/lib/axios";

export interface GetManagerRestaurantResponde {
  id: string,
  name: string,
  createdAt: Date | null,
  updatedAt: Date | null,
  description: string | null,
  managerId: string | null
}

export async function getManagerRestaurant() {
  const response = await api.get<GetManagerRestaurantResponde>('/managed-restaurant')

  return  response.data
}