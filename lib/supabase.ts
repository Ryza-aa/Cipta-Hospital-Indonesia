import { createClient } from "@supabase/supabase-js"

// Use placeholder values for demo purposes
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://demo.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "demo-key"

// Create a mock client for demo purposes
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
})

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          phone: string | null
          date_of_birth: string | null
          address: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          phone?: string | null
          date_of_birth?: string | null
          address?: string | null
        }
        Update: {
          full_name?: string | null
          phone?: string | null
          date_of_birth?: string | null
          address?: string | null
          updated_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          user_id: string | null
          doctor_name: string
          specialty: string
          appointment_date: string
          appointment_time: string
          notes: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id?: string | null
          doctor_name: string
          specialty: string
          appointment_date: string
          appointment_time: string
          notes?: string | null
          status?: string
        }
        Update: {
          doctor_name?: string
          specialty?: string
          appointment_date?: string
          appointment_time?: string
          notes?: string | null
          status?: string
          updated_at?: string
        }
      }
      doctors: {
        Row: {
          id: string
          name: string
          specialty: string
          image_url: string | null
          description: string | null
          schedule: any | null
          created_at: string
        }
      }
    }
  }
}
