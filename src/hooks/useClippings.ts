import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Clipping {
  id: string;
  url: string;
  titulo: string;
  resumo: string | null;
  thumbnail_url: string | null;
  veiculo_nome: string | null;
  veiculo_dominio: string | null;
  tipo: "noticia" | "video";
  marca: string | null;
  data_publicacao: string | null;
  status: "pendente" | "publicado" | "rejeitado";
  fonte_descoberta: string | null;
  query_busca: string | null;
  created_at: string;
}

export function useClippings(status?: Clipping["status"]) {
  return useQuery({
    queryKey: ["clippings", status ?? "publicado"],
    queryFn: async () => {
      let q = supabase
        .from("clippings_midia")
        .select("*")
        .order("data_publicacao", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false })
        .limit(200);
      if (status) q = q.eq("status", status);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as Clipping[];
    },
  });
}
