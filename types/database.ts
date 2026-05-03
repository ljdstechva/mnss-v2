export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

type MnssBaseRow = {
  id: string
  sort_order: number
  is_active: boolean
  metadata: Json
  created_at: string
  updated_at: string
}

type MnssBaseInsert = {
  id?: string
  sort_order?: number
  is_active?: boolean
  metadata?: Json
  created_at?: string
  updated_at?: string
}

type MnssBaseUpdate = Partial<MnssBaseInsert>

export type Database = {
  public: {
    Tables: {
      mnss_admin_users: {
        Row: MnssBaseRow & {
          user_id: string
          email: string
          role: 'owner' | 'admin' | 'editor'
        }
        Insert: MnssBaseInsert & {
          user_id: string
          email: string
          role?: 'owner' | 'admin' | 'editor'
        }
        Update: MnssBaseUpdate & {
          user_id?: string
          email?: string
          role?: 'owner' | 'admin' | 'editor'
        }
        Relationships: []
      }
      mnss_hero_sections: {
        Row: MnssBaseRow & {
          slug: string
          eyebrow: string | null
          headline: string
          highlighted_text: string | null
          body: string | null
          primary_cta_label: string | null
          primary_cta_href: string | null
          secondary_cta_label: string | null
          secondary_cta_href: string | null
          image_url: string | null
        }
        Insert: MnssBaseInsert & {
          slug: string
          eyebrow?: string | null
          headline: string
          highlighted_text?: string | null
          body?: string | null
          primary_cta_label?: string | null
          primary_cta_href?: string | null
          secondary_cta_label?: string | null
          secondary_cta_href?: string | null
          image_url?: string | null
        }
        Update: MnssBaseUpdate & {
          slug?: string
          eyebrow?: string | null
          headline?: string
          highlighted_text?: string | null
          body?: string | null
          primary_cta_label?: string | null
          primary_cta_href?: string | null
          secondary_cta_label?: string | null
          secondary_cta_href?: string | null
          image_url?: string | null
        }
        Relationships: []
      }
      mnss_site_information: {
        Row: MnssBaseRow & {
          section_key: string
          title: string
          body: string | null
        }
        Insert: MnssBaseInsert & {
          section_key: string
          title: string
          body?: string | null
        }
        Update: MnssBaseUpdate & {
          section_key?: string
          title?: string
          body?: string | null
        }
        Relationships: []
      }
      mnss_projects: {
        Row: MnssBaseRow & {
          title: string
          slug: string
          category: string | null
          summary: string | null
          client_name: string | null
          location: string | null
          service_type: string | null
          project_year: number | null
          capacity: string | null
          status: 'draft' | 'review' | 'published' | 'archived'
          source_url: string | null
          image_url: string | null
          is_featured: boolean
        }
        Insert: MnssBaseInsert & {
          title: string
          slug: string
          category?: string | null
          summary?: string | null
          client_name?: string | null
          location?: string | null
          service_type?: string | null
          project_year?: number | null
          capacity?: string | null
          status?: 'draft' | 'review' | 'published' | 'archived'
          source_url?: string | null
          image_url?: string | null
          is_featured?: boolean
        }
        Update: MnssBaseUpdate & {
          title?: string
          slug?: string
          category?: string | null
          summary?: string | null
          client_name?: string | null
          location?: string | null
          service_type?: string | null
          project_year?: number | null
          capacity?: string | null
          status?: 'draft' | 'review' | 'published' | 'archived'
          source_url?: string | null
          image_url?: string | null
          is_featured?: boolean
        }
        Relationships: []
      }
      mnss_certifications: {
        Row: MnssBaseRow & {
          title: string
          issuer: string | null
          credential_holder: string | null
          credential_id: string | null
          issue_date: string | null
          expiry_date: string | null
          status: 'active' | 'expired' | 'pending' | 'archived'
          document_url: string | null
          image_url: string | null
        }
        Insert: MnssBaseInsert & {
          title: string
          issuer?: string | null
          credential_holder?: string | null
          credential_id?: string | null
          issue_date?: string | null
          expiry_date?: string | null
          status?: 'active' | 'expired' | 'pending' | 'archived'
          document_url?: string | null
          image_url?: string | null
        }
        Update: MnssBaseUpdate & {
          title?: string
          issuer?: string | null
          credential_holder?: string | null
          credential_id?: string | null
          issue_date?: string | null
          expiry_date?: string | null
          status?: 'active' | 'expired' | 'pending' | 'archived'
          document_url?: string | null
          image_url?: string | null
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: {
      mnss_has_active_admin: {
        Args: Record<string, never>
        Returns: boolean
      }
      mnss_is_admin: {
        Args: Record<string, never>
        Returns: boolean
      }
    }
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

export type MnssHeroSection = Database['public']['Tables']['mnss_hero_sections']['Row']
export type MnssSiteInformation = Database['public']['Tables']['mnss_site_information']['Row']
export type MnssProject = Database['public']['Tables']['mnss_projects']['Row']
export type MnssCertification = Database['public']['Tables']['mnss_certifications']['Row']
