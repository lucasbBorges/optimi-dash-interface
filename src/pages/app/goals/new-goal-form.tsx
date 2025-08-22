// components/GoalsDialogForm.tsx
"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { getActiveAreas, Praca } from "@/api/get-areas"
import { useCreateMeta } from "@/hooks/new-goal"
import { toast } from "sonner"

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 2035 - currentYear + 1 }, (_, i) => String(currentYear + i))
const months = Array.from({ length: 12 }, (_, i) => String(i + 1))
const SUPERVISORES = ["RS1", "SC1", "TO"] as const

const schema = z.object({
  ano: z.preprocess((v) => parseInt(String(v), 10),
    z.number().int().min(currentYear, { message: `Mínimo ${currentYear}` }).max(2035)
  ),
  mes: z.preprocess((v) => parseInt(String(v), 10),
    z.number().int().min(1).max(12)
  ),
  supervisor: z.enum(SUPERVISORES, { required_error: "Selecione um supervisor" }),
  praca: z.string().min(1, "Selecione uma praça"),
  codfornec: z.preprocess((v) => parseInt(String(v), 10),
    z.number({ invalid_type_error: "Informe um inteiro" }).int("Somente inteiro").positive("Deve ser > 0")
  ),
  meta: z
    .string()
    .min(1, "Informe a meta")
    .regex(/^\d+(\.\d{1,2})?$/, "Use no máximo 2 casas decimais")
    .transform((v) => Number(v)),
})
type FormValues = z.infer<typeof schema>

export default function GoalsDialogForm() {
  const [open, setOpen] = React.useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  })

  const {
    data: pracas,
    isLoading: loadingPracas,
    isError: isErrorPracas,
    error: errorPracas,
    refetch: refetchPracas,
  } = useQuery({
    queryKey: ["pracas-ativas"],
    queryFn: getActiveAreas,
    enabled: open,              
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  })

  const { mutate, isPending } = useCreateMeta()

  function onSubmit(values: FormValues) {
    mutate(values, {
      onSuccess: () => {
        toast.success("Meta criada com sucesso")
        form.reset()        
        setOpen(false)
      },
      // onError: (err: any) => {
      //   const status = err?.response?.status
      //   const msg = status === 409
      //     ? "Já existe meta para esse período/local/fornecedor."
      //     : "Falha ao criar meta."
      //   toast({ title: "Erro", description: msg, variant: "destructive" })
      // },
    })
  }

  const onCancel = () => {
    form.reset()
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (next) refetchPracas()
      }}
    >
      <DialogTrigger asChild>
        <Button>Cadastrar nova meta</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>Cadastrar meta</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Ano */}
            <FormField
              control={form.control}
              name="ano"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ano</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value ? String(field.value) : ""}
                      onValueChange={(v) => field.onChange(v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o ano" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((y) => (
                          <SelectItem key={y} value={y}>{y}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Mês */}
            <FormField
              control={form.control}
              name="mes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mês</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value ? String(field.value) : ""}
                      onValueChange={(v) => field.onChange(v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="1 a 12" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((m) => (
                          <SelectItem key={m} value={m}>{m}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Supervisor */}
            <FormField
              control={form.control}
              name="supervisor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supervisor</FormLabel>
                  <FormControl>
                    <Select value={field.value ?? ""} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o supervisor" />
                      </SelectTrigger>
                      <SelectContent>
                        {SUPERVISORES.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Praça (carregada via React Query) */}
            <FormField
              control={form.control}
              name="praca"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Praça</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value ?? ""}
                      onValueChange={field.onChange}
                      disabled={loadingPracas || isErrorPracas}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            loadingPracas
                              ? "Carregando..."
                              : isErrorPracas
                              ? "Erro ao carregar"
                              : "Selecione a praça"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {(pracas ?? []).map((p: Praca) => (
                          <SelectItem key={p.praca} value={p.praca}>{p.praca}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                  {isErrorPracas ? (
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-destructive">
                        {(errorPracas as Error)?.message ?? "Erro ao carregar praças"}
                      </p>
                      <Button type="button" variant="outline" size="sm" onClick={() => refetchPracas()}>
                        Tentar novamente
                      </Button>
                    </div>
                  ) : null}
                </FormItem>
              )}
            />

            {/* Código do fornecedor */}
            <FormField
              control={form.control}
              name="codfornec"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código do fornecedor</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="numeric"
                      placeholder="Ex.: 12345"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Meta (2 casas) */}
            <FormField
              control={form.control}
              name="meta"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="Ex.: 1000.00"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                      onBlur={(e) => {
                        const v = e.target.value
                        if (v && /^\d+(\.\d{1,2})?$/.test(v)) {
                          field.onChange(Number(v).toFixed(2))
                        }
                        field.onBlur()
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Ações */}
            <div className="col-span-1 md:col-span-2 flex items-center gap-2 pt-2">
              <Button type="submit" disabled={isPending}>{isPending ? "Salvando…" : "Salvar"}</Button>
              <Button type="button" variant="secondary" onClick={onCancel} disabled={isPending}>
                Cancelar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
