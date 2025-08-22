// src/components/meta/EditMetaDialog.tsx
import { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MetaAlterInput } from "@/api/put-goal";
import { useUpdateMetaValor } from "@/hooks/alter-goal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { MetaDto } from "@/api/get-goals";

function brlToNumber(v: unknown): number {
  if (typeof v === "number") return v;
  if (typeof v !== "string") return NaN;
  const normalized = v.replace(/\./g, "").replace(",", ".").trim();
  return Number(normalized);
}

export const metaValorSchema = z.object({
  meta: z.preprocess(brlToNumber, z.number().positive("Informe um valor > 0")),
});

export type MetaValorForm = z.infer<typeof metaValorSchema>;

export function EditMetaDialog({
  open,
  onOpenChange,
  registro,            // meta selecionada
  onSuccess,           // fechar modal + toasts no pai
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  registro: MetaDto | null;
  onSuccess?: () => void;
}) {
  const form = useForm<MetaValorForm>({
    resolver: zodResolver(metaValorSchema),
    defaultValues: { meta: undefined as any },
  });

  useEffect(() => {
    if (registro) {
      const brl = (registro.meta ?? 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
      form.reset({ meta: brl as unknown as number });
    } else {
      form.reset({ meta: undefined as any });
    }
  }, [registro, form]);

  const { mutate, isPending } = useUpdateMetaValor();

  function submit(values: MetaValorForm) {
    if (!registro) return;
    mutate(
      { id: registro.id, body: { value: values.meta } },
      {
        onSuccess: () => {
          onSuccess?.();
          onOpenChange(false);
        },
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={(o) => { onOpenChange(o); if (!o) form.reset(); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Alterar meta</DialogTitle>
          <DialogDescription>
            Apenas o <b>valor</b> da meta será atualizado.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 py-2 text-sm text-muted-foreground">
          <div>Supervisor: <b>{registro?.supervisor ?? "—"}</b></div>
          <div>Praça: <b>{registro?.praca ?? "—"}</b></div>
          <div>Período: <b>{registro ? `${registro.mes}/${registro.ano}` : "—"}</b></div>
          <div>Fornecedor: <b>{registro?.codfornec}</b> • {registro?.fantasia}</div>
        </div>

        <form onSubmit={form.handleSubmit(submit)} className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Meta (R$)</label>
            <Input
              placeholder="0,00"
              {...form.register("meta" as const)}
              inputMode="decimal"
            />
            {form.formState.errors.meta && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.meta.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Salvando…" : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
