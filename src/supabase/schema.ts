export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      messages: {
        Row: {
          id: number
          name: string
          email: string
          subject: string
          message: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: never
          name: string
          email: string
          subject: string
          message: string
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: never
          name?: string
          email?: string
          subject?: string
          message?: string
          read?: boolean
          created_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          id: number
          title: string
          subtitle: string
          description: string
          tags: string[]
          focus: string[]
          accent: string
          image_url: string | null
          project_url: string | null
          github_url: string | null
          published: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: never
          title: string
          subtitle: string
          description: string
          tags?: string[]
          focus?: string[]
          accent?: string
          image_url?: string | null
          project_url?: string | null
          github_url?: string | null
          published?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: never
          title?: string
          subtitle?: string
          description?: string
          tags?: string[]
          focus?: string[]
          accent?: string
          image_url?: string | null
          project_url?: string | null
          github_url?: string | null
          published?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      skill_categories: {
        Row: {
          id: number
          name: string
          color: string
        }
        Insert: {
          id?: never
          name: string
          color?: string
        }
        Update: {
          id?: never
          name?: string
          color?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          id: number
          category_id: number
          name: string
          sort_order: number
        }
        Insert: {
          id?: never
          category_id: number
          name: string
          sort_order?: number
        }
        Update: {
          id?: never
          category_id?: number
          name?: string
          sort_order?: number
        }
        Relationships: []
      }
      experiences: {
        Row: {
          id: number
          year: string
          role: string
          company: string
          description: string
          sort_order: number
        }
        Insert: {
          id?: never
          year: string
          role: string
          company: string
          description: string
          sort_order?: number
        }
        Update: {
          id?: never
          year?: string
          role?: string
          company?: string
          description?: string
          sort_order?: number
        }
        Relationships: []
      }
      articles: {
        Row: {
          id: number
          title: string
          slug: string
          excerpt: string
          content: string
          tags: string[]
          cover_url: string | null
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: never
          title: string
          slug: string
          excerpt: string
          content: string
          tags?: string[]
          cover_url?: string | null
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: never
          title?: string
          slug?: string
          excerpt?: string
          content?: string
          tags?: string[]
          cover_url?: string | null
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      page_views: {
        Row: {
          id: number
          path: string
          date: string
          count: number
        }
        Insert: {
          id?: never
          path: string
          date?: string
          count?: number
        }
        Update: {
          id?: never
          path?: string
          date?: string
          count?: number
        }
        Relationships: []
      }
      downloads: {
        Row: {
          id: number
          file: string
          date: string
          count: number
        }
        Insert: {
          id?: never
          file: string
          date?: string
          count?: number
        }
        Update: {
          id?: never
          file?: string
          date?: string
          count?: number
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
