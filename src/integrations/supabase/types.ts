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
      atividades: {
        Row: {
          created_at: string
          created_by: string | null
          data_hora: string
          id: string
          negociacao_id: string
          nota: string | null
          tipo: string
          titulo: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          data_hora?: string
          id?: string
          negociacao_id: string
          nota?: string | null
          tipo?: string
          titulo?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          data_hora?: string
          id?: string
          negociacao_id?: string
          nota?: string | null
          tipo?: string
          titulo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "atividades_negociacao_id_fkey"
            columns: ["negociacao_id"]
            isOneToOne: false
            referencedRelation: "negociacoes"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_log: {
        Row: {
          acao: string
          created_at: string
          dados_anteriores: Json | null
          dados_novos: Json | null
          id: string
          registro_id: string
          tabela: string
          user_id: string | null
        }
        Insert: {
          acao: string
          created_at?: string
          dados_anteriores?: Json | null
          dados_novos?: Json | null
          id?: string
          registro_id: string
          tabela: string
          user_id?: string | null
        }
        Update: {
          acao?: string
          created_at?: string
          dados_anteriores?: Json | null
          dados_novos?: Json | null
          id?: string
          registro_id?: string
          tabela?: string
          user_id?: string | null
        }
        Relationships: []
      }
      clientes: {
        Row: {
          ativo: boolean | null
          bairro: string | null
          cep: string | null
          cidade: string | null
          complemento: string | null
          consultor_responsavel: string | null
          cpf_cnpj: string
          created_at: string
          created_by: string | null
          email: string | null
          endereco: string | null
          estado: string | null
          id: string
          nome_fantasia: string | null
          numero: string | null
          observacoes: string | null
          razao_social: string
          responsavel: string | null
          telefone: string | null
          tipo: string
          updated_at: string
          vendedor_responsavel: string | null
        }
        Insert: {
          ativo?: boolean | null
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          complemento?: string | null
          consultor_responsavel?: string | null
          cpf_cnpj: string
          created_at?: string
          created_by?: string | null
          email?: string | null
          endereco?: string | null
          estado?: string | null
          id?: string
          nome_fantasia?: string | null
          numero?: string | null
          observacoes?: string | null
          razao_social: string
          responsavel?: string | null
          telefone?: string | null
          tipo: string
          updated_at?: string
          vendedor_responsavel?: string | null
        }
        Update: {
          ativo?: boolean | null
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          complemento?: string | null
          consultor_responsavel?: string | null
          cpf_cnpj?: string
          created_at?: string
          created_by?: string | null
          email?: string | null
          endereco?: string | null
          estado?: string | null
          id?: string
          nome_fantasia?: string | null
          numero?: string | null
          observacoes?: string | null
          razao_social?: string
          responsavel?: string | null
          telefone?: string | null
          tipo?: string
          updated_at?: string
          vendedor_responsavel?: string | null
        }
        Relationships: []
      }
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
      metas_mensais: {
        Row: {
          ano: number
          created_at: string
          created_by: string | null
          id: string
          mes: number
          updated_at: string
          valor_meta: number
          vendedor_id: string | null
        }
        Insert: {
          ano: number
          created_at?: string
          created_by?: string | null
          id?: string
          mes: number
          updated_at?: string
          valor_meta?: number
          vendedor_id?: string | null
        }
        Update: {
          ano?: number
          created_at?: string
          created_by?: string | null
          id?: string
          mes?: number
          updated_at?: string
          valor_meta?: number
          vendedor_id?: string | null
        }
        Relationships: []
      }
      negociacoes: {
        Row: {
          cliente_id: string
          created_at: string
          created_by: string | null
          data_fechamento: string | null
          data_proximo_passo: string | null
          id: string
          motivo_perda: string | null
          numero_negociacao: string
          observacoes: string | null
          origem_lead: string
          owner_user_id: string
          probabilidade: number | null
          produto_principal: string | null
          produtos: Json | null
          proximo_passo: string | null
          status: string
          tipo_venda: string | null
          ultima_atualizacao: string
          updated_at: string
          valor_estimado: number | null
        }
        Insert: {
          cliente_id: string
          created_at?: string
          created_by?: string | null
          data_fechamento?: string | null
          data_proximo_passo?: string | null
          id?: string
          motivo_perda?: string | null
          numero_negociacao: string
          observacoes?: string | null
          origem_lead?: string
          owner_user_id: string
          probabilidade?: number | null
          produto_principal?: string | null
          produtos?: Json | null
          proximo_passo?: string | null
          status?: string
          tipo_venda?: string | null
          ultima_atualizacao?: string
          updated_at?: string
          valor_estimado?: number | null
        }
        Update: {
          cliente_id?: string
          created_at?: string
          created_by?: string | null
          data_fechamento?: string | null
          data_proximo_passo?: string | null
          id?: string
          motivo_perda?: string | null
          numero_negociacao?: string
          observacoes?: string | null
          origem_lead?: string
          owner_user_id?: string
          probabilidade?: number | null
          produto_principal?: string | null
          produtos?: Json | null
          proximo_passo?: string | null
          status?: string
          tipo_venda?: string | null
          ultima_atualizacao?: string
          updated_at?: string
          valor_estimado?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "negociacoes_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "negociacoes_owner_user_id_profiles_fkey"
            columns: ["owner_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pedidos_faturamento: {
        Row: {
          bairro: string | null
          cep: string | null
          cidade: string | null
          cliente_id: string | null
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
          importado: boolean | null
          local: string | null
          negociacao_id: string | null
          nome_cliente: string
          nome_instituicao: string | null
          nome_vendedor: string
          numero: string | null
          numero_pedido: string
          observacoes: string | null
          produtos: Json
          proposta_origem_id: string | null
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
          cliente_id?: string | null
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
          importado?: boolean | null
          local?: string | null
          negociacao_id?: string | null
          nome_cliente: string
          nome_instituicao?: string | null
          nome_vendedor: string
          numero?: string | null
          numero_pedido: string
          observacoes?: string | null
          produtos: Json
          proposta_origem_id?: string | null
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
          cliente_id?: string | null
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
          importado?: boolean | null
          local?: string | null
          negociacao_id?: string | null
          nome_cliente?: string
          nome_instituicao?: string | null
          nome_vendedor?: string
          numero?: string | null
          numero_pedido?: string
          observacoes?: string | null
          produtos?: Json
          proposta_origem_id?: string | null
          responsavel_frota?: string | null
          rua?: string | null
          telefone_cliente?: string | null
          updated_at?: string
          valor_total_produtos?: number
        }
        Relationships: [
          {
            foreignKeyName: "pedidos_faturamento_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedidos_faturamento_negociacao_id_fkey"
            columns: ["negociacao_id"]
            isOneToOne: false
            referencedRelation: "negociacoes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedidos_faturamento_proposta_origem_id_fkey"
            columns: ["proposta_origem_id"]
            isOneToOne: false
            referencedRelation: "propostas_comerciais"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          ativo: boolean | null
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          nome_exibicao: string | null
          telefone: string | null
          updated_at: string
        }
        Insert: {
          ativo?: boolean | null
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          nome_exibicao?: string | null
          telefone?: string | null
          updated_at?: string
        }
        Update: {
          ativo?: boolean | null
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          nome_exibicao?: string | null
          telefone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      propostas_comerciais: {
        Row: {
          cidade: string | null
          cliente_id: string | null
          cnpj: string
          created_at: string
          data: string
          estado: string | null
          faturamento_tipo: string
          id: string
          importado: boolean | null
          local: string | null
          negociacao_id: string | null
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
          cliente_id?: string | null
          cnpj: string
          created_at?: string
          data?: string
          estado?: string | null
          faturamento_tipo: string
          id?: string
          importado?: boolean | null
          local?: string | null
          negociacao_id?: string | null
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
          cliente_id?: string | null
          cnpj?: string
          created_at?: string
          data?: string
          estado?: string | null
          faturamento_tipo?: string
          id?: string
          importado?: boolean | null
          local?: string | null
          negociacao_id?: string | null
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
        Relationships: [
          {
            foreignKeyName: "propostas_comerciais_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "propostas_comerciais_negociacao_id_fkey"
            columns: ["negociacao_id"]
            isOneToOne: false
            referencedRelation: "negociacoes"
            referencedColumns: ["id"]
          },
        ]
      }
      solicitacoes_acesso_cliente: {
        Row: {
          aprovado_por: string | null
          cliente_id: string | null
          cnpj_solicitado: string
          created_at: string
          id: string
          motivo_rejeicao: string | null
          razao_social_encontrada: string | null
          status: string
          updated_at: string
          vendedor_atual_id: string | null
          vendedor_id: string
        }
        Insert: {
          aprovado_por?: string | null
          cliente_id?: string | null
          cnpj_solicitado: string
          created_at?: string
          id?: string
          motivo_rejeicao?: string | null
          razao_social_encontrada?: string | null
          status?: string
          updated_at?: string
          vendedor_atual_id?: string | null
          vendedor_id: string
        }
        Update: {
          aprovado_por?: string | null
          cliente_id?: string | null
          cnpj_solicitado?: string
          created_at?: string
          id?: string
          motivo_rejeicao?: string | null
          razao_social_encontrada?: string | null
          status?: string
          updated_at?: string
          vendedor_atual_id?: string | null
          vendedor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "solicitacoes_acesso_cliente_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
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
      buscar_cliente_por_cnpj: {
        Args: { p_cnpj: string }
        Returns: {
          id: string
          razao_social: string
          vendedor_responsavel: string
        }[]
      }
      gerar_numero_negociacao: { Args: never; Returns: string }
      gerar_numero_proposta: { Args: never; Returns: string }
      get_user_role: { Args: never; Returns: string }
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
      origem_lead:
        | "site"
        | "whatsapp"
        | "indicacao"
        | "trafego_pago"
        | "telefone"
        | "visita_loja"
        | "evento"
        | "outro"
      status_negociacao:
        | "lead_novo"
        | "proposta_enviada"
        | "negociacao"
        | "credito_analise"
        | "aprovado"
        | "faturado"
        | "perdido"
      tipo_atividade:
        | "ligacao"
        | "whatsapp"
        | "reuniao"
        | "proposta"
        | "documento"
        | "email"
        | "visita"
        | "outro"
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
      origem_lead: [
        "site",
        "whatsapp",
        "indicacao",
        "trafego_pago",
        "telefone",
        "visita_loja",
        "evento",
        "outro",
      ],
      status_negociacao: [
        "lead_novo",
        "proposta_enviada",
        "negociacao",
        "credito_analise",
        "aprovado",
        "faturado",
        "perdido",
      ],
      tipo_atividade: [
        "ligacao",
        "whatsapp",
        "reuniao",
        "proposta",
        "documento",
        "email",
        "visita",
        "outro",
      ],
    },
  },
} as const
