import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X } from "lucide-react";

export function OrderTableFiltes() {
  return (
    <form className="flex items-center gap-2">
      <span className="text-sm font-semibold">Filtros:</span>
      <Input placeholder="Id do pedido" className="h-8 w-auto" />
      <Input placeholder="Nome do cliente" className="h-8 w-[320px]" />
      <Select defaultValue="all">
        <SelectTrigger className="h-8 w-[180px]">
          <SelectValue  />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="all">Todos status</SelectItem>
            <SelectItem value="pending">Pendente</SelectItem>
            <SelectItem value="canceled">Cancelado</SelectItem>
            <SelectItem value="processing">Em preparo</SelectItem>
            <SelectItem value="delivering">Em entrega</SelectItem>
            <SelectItem value="delivered">Entregue</SelectItem>
        </SelectContent>
      </Select>

      <Button
      type="submit"
      variant="secondary"
      size="xs"
      >
        <Search className="size-4 mr-2" />
        Filtrar resultados
      </Button>

      <Button
      type="button"
      variant="outline"
      size="xs"
      >
        <X className="size-4 mr-2" />
        Remover filtros
      </Button>
    </form>
  )
}
