export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      diagnosticos_arquivos: {
        Row: {
          arquivo_url: string
          created_at: string
          diagnostico_id: string
          id: string
          nome_arquivo: string
          tipo_arquivo: string
        }
        Insert: {
          arquivo_url: string
          created_at?: string
          diagnostico_id: string
          id?: string
          nome_arquivo: string
          tipo_arquivo: string
        }
        Update: {
          arquivo_url?: string
          created_at?: string
          diagnostico_id?: string
          id?: string
          nome_arquivo?: string
          tipo_arquivo?: string
        }
        Relationships: [
          {
            foreignKeyName: "diagnosticos_arquivos_diagnostico_id_fkey"
            columns: ["diagnostico_id"]
            isOneToOne: false
            referencedRelation: "diagnosticos_frota"
            referencedColumns: ["id"]
          },
        ]
      }
      diagnosticos_frota: {
        Row: {
          bancos_usados: string | null
          cnpj: string
          created_at: string
          email_responsavel: string
          estado: string
          faturamento: string | null
          financiamentos_ativos: string | null
          id: string
          idade_media: string | null
          km_mes: string | null
          marcas_atuais: string | null
          margem: string | null
          modelos_desejados: string | null
          nome_responsavel: string
          operacao: string | null
          prazo: string | null
          qtd_desejada: string | null
          qtd_veiculos: string | null
          razao_social: string
          segmento: string
          telefone: string | null
          telefone_whatsapp: string
          tipos_veiculos: string | null
          updated_at: string
          urgencia: string | null
          uso_operacional: string | null
        }
        Insert: {
          bancos_usados?: string | null
          cnpj: string
          created_at?: string
          email_responsavel: string
          estado: string
          faturamento?: string | null
          financiamentos_ativos?: string | null
          id?: string
          idade_media?: string | null
          km_mes?: string | null
          marcas_atuais?: string | null
          margem?: string | null
          modelos_desejados?: string | null
          nome_responsavel: string
          operacao?: string | null
          prazo?: string | null
          qtd_desejada?: string | null
          qtd_veiculos?: string | null
          razao_social: string
          segmento: string
          telefone?: string | null
          telefone_whatsapp: string
          tipos_veiculos?: string | null
          updated_at?: string
          urgencia?: string | null
          uso_operacional?: string | null
        }
        Update: {
          bancos_usados?: string | null
          cnpj?: string
          created_at?: string
          email_responsavel?: string
          estado?: string
          faturamento?: string | null
          financiamentos_ativos?: string | null
          id?: string
          idade_media?: string | null
          km_mes?: string | null
          marcas_atuais?: string | null
          margem?: string | null
          modelos_desejados?: string | null
          nome_responsavel?: string
          operacao?: string | null
          prazo?: string | null
          qtd_desejada?: string | null
          qtd_veiculos?: string | null
          razao_social?: string
          segmento?: string
          telefone?: string | null
          telefone_whatsapp?: string
          tipos_veiculos?: string | null
          updated_at?: string
          urgencia?: string | null
          uso_operacional?: string | null
        }
        Relationships: []
      }
      pedidos_faturamento: {
        Row: {
          bairro: string | null
          cep: string | null
          cidade: string | null
          cnpj: string
          created_at: string
          data: string
          email_responsavel: string | null
          entrada: number | null
          estado: string | null
          faturamento_tipo: string
          financiamento_forma: string
          financiamento_forma_outros: string | null
          id: string
          ie_rg: string | null
          local: string | null
          nome_cliente: string
          nome_instituicao: string | null
          nome_vendedor: string
          numero: string | null
          numero_pedido: string
          observacoes: string | null
          produtos: Json
          responsavel_frota: string | null
          rua: string | null
          telefone_cliente: string | null
          updated_at: string
          valor_total_produtos: number
        }
        Insert: {
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          cnpj: string
          created_at?: string
          data: string
          email_responsavel?: string | null
          entrada?: number | null
          estado?: string | null
          faturamento_tipo: string
          financiamento_forma: string
          financiamento_forma_outros?: string | null
          id?: string
          ie_rg?: string | null
          local?: string | null
          nome_cliente: string
          nome_instituicao?: string | null
          nome_vendedor: string
          numero?: string | null
          numero_pedido: string
          observacoes?: string | null
          produtos: Json
          responsavel_frota?: string | null
          rua?: string | null
          telefone_cliente?: string | null
          updated_at?: string
          valor_total_produtos: number
        }
        Update: {
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          cnpj?: string
          created_at?: string
          data?: string
          email_responsavel?: string | null
          entrada?: number | null
          estado?: string | null
          faturamento_tipo?: string
          financiamento_forma?: string
          financiamento_forma_outros?: string | null
          id?: string
          ie_rg?: string | null
          local?: string | null
          nome_cliente?: string
          nome_instituicao?: string | null
          nome_vendedor?: string
          numero?: string | null
          numero_pedido?: string
          observacoes?: string | null
          produtos?: Json
          responsavel_frota?: string | null
          rua?: string | null
          telefone_cliente?: string | null
          updated_at?: string
          valor_total_produtos?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      propostas_comerciais: {
        Row: {
          cidade: string | null
          cnpj: string
          created_at: string
          data: string
          estado: string | null
          faturamento_tipo: string
          id: string
          local: string | null
          nome_cliente: string
          nome_vendedor: string
          numero_proposta: string
          observacoes: string | null
          pagamento_outros: string | null
          pagamento_tipo: string
          prazo_entrega: number | null
          produtos: Json
          tributacao: string | null
          updated_at: string
          valor_entrada: number | null
          valor_frete: number | null
          valor_total: number
        }
        Insert: {
          cidade?: string | null
          cnpj: string
          created_at?: string
          data?: string
          estado?: string | null
          faturamento_tipo: string
          id?: string
          local?: string | null
          nome_cliente: string
          nome_vendedor: string
          numero_proposta: string
          observacoes?: string | null
          pagamento_outros?: string | null
          pagamento_tipo: string
          prazo_entrega?: number | null
          produtos?: Json
          tributacao?: string | null
          updated_at?: string
          valor_entrada?: number | null
          valor_frete?: number | null
          valor_total?: number
        }
        Update: {
          cidade?: string | null
          cnpj?: string
          created_at?: string
          data?: string
          estado?: string | null
          faturamento_tipo?: string
          id?: string
          local?: string | null
          nome_cliente?: string
          nome_vendedor?: string
          numero_proposta?: string
          observacoes?: string | null
          pagamento_outros?: string | null
          pagamento_tipo?: string
          prazo_entrega?: number | null
          produtos?: Json
          tributacao?: string | null
          updated_at?: string
          valor_entrada?: number | null
          valor_frete?: number | null
          valor_total?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      gerar_numero_proposta: { Args: never; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user" | "vendedor" | "financeiro"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user", "vendedor", "financeiro"],
    },
  },
} as const
