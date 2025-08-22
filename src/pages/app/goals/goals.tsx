import {
  Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow
} from "@/components/ui/table"
import {
  Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious
} from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"
import { Trash2, Pencil } from "lucide-react"
import { SelectFilter } from "./select-filter"
import GoalsDialogForm from "./new-goal-form"
import { useMemo, useState } from "react"
import { useMetaSlice } from "@/hooks/goals-pagination"
import EditMetaDialog from "./edit-modal-goal"
import { DeleteMetaDialog } from "./confirm-delete-dialog"
import { useDeleteMeta } from "@/hooks/delete-goal"
import { MetaDto } from "@/api/get-goals"
import { toast } from "sonner"

export type Meta = {
  id: number
  supervisor: string
  praca: string
  ano: number
  mes: number
  codfornec: number
  fantasia: string
  meta: number
}

type FilterValues = {
  ano?: number
  mes?: number
  supervisor?: string
  praca?: string
}

export function Goals() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);

  const [ano, setAno] = useState<number | undefined>(undefined);
  const [mes, setMes] = useState<number | undefined>(undefined);
  const [supervisor, setSupervisor] = useState<string | undefined>(undefined);
  const [praca, setPraca] = useState<string | undefined>(undefined);

  const params = useMemo(
    () => ({ page, size, ano, mes, supervisor, praca }),
    [page, size, ano, mes, supervisor, praca]
  );

  const { data, isLoading, isFetching, isError, error } = useMetaSlice(params);

  const canPrev = !!data?.hasPrevious && !isFetching;
  const canNext = !!data?.hasNext && !isFetching;

  const goPrev = () => { if (canPrev) setPage(p => Math.max(0, p - 1)); };
  const goNext = () => { if (canNext) setPage(p => p + 1); };

  const { mutate: del, isPending } = useDeleteMeta();

  function applyFilters(vals: FilterValues) {
    setAno(vals.ano);
    setMes(vals.mes);
    setSupervisor(vals.supervisor);
    setPraca(vals.praca);
    setPage(0);
  }
  function clearFilters() {
    setAno(undefined);
    setMes(undefined);
    setSupervisor(undefined);
    setPraca(undefined);
    setPage(0);
  }

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<MetaDto | null>(null);

  const [editOpen, setEditOpen] = useState(false)
  const [metaEmEdicao, setMetaEmEdicao] = useState<Meta | null>(null)

  const total = useMemo(() => data?.content.reduce((acc, m) => acc + (m.meta ?? 0), 0), [data])

  function confirmDelete() {
    if (!selected) return;
    del(selected.id, {
      onSuccess: () => {
        toast.success("Meta deletada com sucesso");
        setOpen(false);
        setSelected(null);
      },
      onError: (err: any) => {
        const status = err?.response?.status;
        const msg =
          status === 404 ? "Meta não encontrada."
          : status === 409 ? "Não foi possível excluir (conflito)."
          : "Falha ao excluir meta.";
        toast.error("Erro ao deletar a meta");
      },
    });
  }

  function askDelete(meta: MetaDto) {
  setSelected(meta);
  setOpen(true);
  }

  // function solicitarEdicao(meta: Meta) {
  //   setMetaEmEdicao(meta)
  //   setEditOpen(true)
  // }

  // function salvarNovaMeta(novoValor: number) {
  //   if (!metaEmEdicao) return
  //   setMetas(prev =>
  //     prev.map(m => (m.id === metaEmEdicao.id ? { ...m, meta: novoValor } : m))
  //   )
  //   setMetaEmEdicao(null)
  // }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-1 justify-between">
        <GoalsDialogForm />
        <div className="flex flex-row gap-2">
          <SelectFilter
            initial={{ ano, mes, supervisor, praca }}
            onApply={applyFilters}
            onClear={clearFilters}
          />
        </div>
      </div>

      <Table>
        <TableCaption>
          <Pagination>
            <PaginationContent>
              <PaginationItem><PaginationPrevious
                onClick={goPrev}
                aria-disabled={!canPrev}
                className={!canPrev ? "pointer-events-none opacity-50" : "cursor-pointer"}
              /></PaginationItem>
              <PaginationItem><PaginationLink href="#">{page + 1}</PaginationLink></PaginationItem>
              <PaginationItem><PaginationNext
                onClick={goNext}
                aria-disabled={!canNext}
                className={!canNext ? "pointer-events-none opacity-50" : "cursor-pointer"}
              /></PaginationItem>
            </PaginationContent>
          </Pagination>
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Ano</TableHead>
            <TableHead className="w-[100px]">Mês</TableHead>
            <TableHead className="w-[100px]">Supervisor</TableHead>
            <TableHead className="w-[200px]">Praça</TableHead>
            <TableHead className="w-[100px] text-center">Codfornec</TableHead>
            <TableHead>Fantasia</TableHead>
            <TableHead className="text-right">Meta</TableHead>
            <TableHead className="w-[160px] text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.content.map(meta => (
            <TableRow key={meta.id}>
              <TableCell className="font-medium">{meta.ano}</TableCell>
              <TableCell>{meta.mes}</TableCell>
              <TableCell>{meta.supervisor}</TableCell>
              <TableCell>{meta.praca}</TableCell>
              <TableCell className="text-center">{meta.codfornec}</TableCell>
              <TableCell>{meta.fantasia}</TableCell>
              <TableCell className="text-right">
                {meta.meta.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => console.log('')}>
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <Button variant="destructive" size="sm" onClick={() => askDelete(meta)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={6}>Total</TableCell>
            <TableCell className="text-right">
              {total? total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : '-'}
            </TableCell>
            <TableCell />
          </TableRow>
        </TableFooter>
      </Table>

      <DeleteMetaDialog 
        open={open}
        onOpenChange={setOpen}
        onConfirm={confirmDelete}
        loading={isPending}
        metaLabel={
          selected
            ? `${selected.supervisor} • ${selected.praca} • ${selected.mes}/${selected.ano}`
            : undefined
        }
      />
      <EditMetaDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        registro={metaEmEdicao}
        onSave={() => console.log('salvarNovaMeta')}
      />
    </div>
  )
}
