import { getActiveAreas } from "@/api/get-areas";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react"
import { useEffect, useMemo, useState } from "react";

type FilterValues = {
  ano?: number
  mes?: number
  supervisor?: string
  praca?: string
};

type SelectFilterProps = {
  initial?: FilterValues;                         
  onApply: (values: FilterValues) => void;       
  onClear?: () => void;                           
};

export function SelectFilter ({ initial, onApply, onClear }: SelectFilterProps) {
  const [ano, setAno] = useState<string>(initial?.ano?.toString() ?? "");
  const [mes, setMes] = useState<string>(initial?.mes?.toString() ?? "");
  const [supervisor, setSupervisor] = useState<string>(initial?.supervisor ?? "");
  const [praca, setPraca] = useState<string>(initial?.praca ?? "");

  useEffect(() => {
    setAno(initial?.ano?.toString() ?? "");
    setMes(initial?.mes?.toString() ?? "");
    setSupervisor(initial?.supervisor ?? "");
    setPraca(initial?.praca ?? "");
  }, [initial?.ano, initial?.mes, initial?.supervisor, initial?.praca]);

  const currentYear = new Date().getFullYear();
  const years = useMemo(
    () => Array.from({ length: 4 }, (_, i) => String(currentYear + 1 - i)), // ex.: 2026..2023
    [currentYear]
  );
  const months = useMemo(
    () => Array.from({ length: 12 }, (_, i) => String(i + 1)),
    []
  );
  const SUPERVISORES = ["RS1", "SC1", "TO"] as const;

    const {
        data: pracas,
        isLoading: loadingPracas
        } = useQuery({
        queryKey: ["pracas-ativas"],
        queryFn: getActiveAreas,             
        staleTime: 0,
        refetchOnMount: "always",
        refetchOnWindowFocus: false,
    })
    function handleApply() {
    onApply({
      ano: ano ? Number(ano) : undefined,
      mes: mes ? Number(mes) : undefined,
      supervisor: supervisor || undefined,
      praca: praca || undefined,
    });
    }

    function handleClear() {
        setAno(""); setMes(""); setSupervisor(""); setPraca("");
        onClear?.();
    }

    return (
        <>
            <Select onValueChange={(v) => setAno(v)} value={ano}>
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Ano" />
                </SelectTrigger>
                <SelectContent>
                    {years.map(year => {
                        return (
                            <SelectItem value={year}>{year}</SelectItem>
                        )
                    })}
                </SelectContent>
            </Select>
            <Select onValueChange={(v) => setMes(v)} value={mes}>
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Mês" />
                </SelectTrigger>
                <SelectContent>
                    {months.map(month => {
                        return (
                            <SelectItem value={month}>{month}</SelectItem>
                        )
                    })}
                </SelectContent>
            </Select>
            <Select onValueChange={(v) => setSupervisor(v)} value={supervisor}>
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Supervisor" />
                </SelectTrigger>
                <SelectContent>
                    {SUPERVISORES.map(supervisor => {
                        return (
                            <SelectItem value={supervisor}>{supervisor}</SelectItem>
                        )
                    })}
                </SelectContent>
            </Select>
            <Select onValueChange={(v) => setPraca(v)} value={praca}>
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Praça" />
                </SelectTrigger>
                <SelectContent>
                    {loadingPracas ? "-" : pracas?.map(praca => {
                        return (
                            <SelectItem value={praca.praca}>{praca.praca}</SelectItem>
                        )
                    })}
                </SelectContent>
            </Select>
            <Button onClick={handleApply} className="flex items-center">
                Filtrar <Search className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="secondary" onClick={handleClear}>
                Limpar
            </Button>
        </>
    )
}