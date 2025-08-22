import { signIn } from "@/api/sign-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useMutation } from "@tanstack/react-query";

import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from 'zod'

const signInForm = z.object({
    email: z.string().email(),
    password: z.string()
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignInForm>()

    const { mutateAsync: authenticate } = useMutation({
        mutationFn: signIn,
        onSuccess: () => navigate("/")
    })

    async function handleAuthenticate({ email, password }: SignInForm) {
    try {
      await authenticate({ email, password })

      toast.success("Usuário autenticado")
    } catch (err) {
      toast.error('Email ou senha inválidos')
    }
  }

    return (
        <div className="p-8">
            <div className="w-[350px] flex flex-col justify-center gap-6">
                <div className="flex flex-col gap-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Acessar Painel
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Acompanhe suas vendas por aqui!
                    </p>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit(handleAuthenticate)}>
                    <div className="space-y-3">
                        <div className="space-y-2">
                            <Label htmlFor="email">Seu e-mail</Label>
                            <Input id="email" type="email" {...register('email')} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="">Sua senha</Label>
                            <Input id="password" type="password" {...register('password')} />
                        </div>
                    </div>
                    <Button className="w-full" type="submit" disabled={isSubmitting}>Acessar Painel</Button>
                </form>
            </div>
        </div>
    )
}