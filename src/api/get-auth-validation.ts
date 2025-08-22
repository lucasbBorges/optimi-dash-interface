import { api } from "@/lib/axios";

export async function validateToken () {
    await api.get('/auth/test')
}