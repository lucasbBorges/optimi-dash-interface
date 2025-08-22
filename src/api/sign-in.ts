import { api } from '@/lib/axios'

export interface SignInRequest {
  email: string
  password: string
}

export async function signIn({ email, password }: SignInRequest) {
  const response = await api.post('/auth/login', { email, password })
  localStorage.setItem("token", response.data.token)
}
