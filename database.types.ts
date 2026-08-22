export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      site_settings: {
        Row: {
          id: string;
          company_name: string;
          company_tagline: string;
          slogan: string;
          location_city: string;
          location_state: string;
          location_country: string;
          phone_number: string;
          whatsapp_number: string;
          default_whatsapp_message: string;
          email_address: string;
          office_address: string;
          logo_url: string;
          favicon_url: string;
          og_image_url: string;
          seo_title: string;
          seo_description: string;
          facebook_url: string;
          instagram_url: string;
          linkedin_url: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['site_settings']['Row']>;
        Update: Partial<Database['public']['Tables']['site_settings']['Row']>;
      };
      hero: {
        Row: {
          id: string;
          badge_text: string;
          headline_line1: string;
          headline_line2: string;
          subtext: string;
          cta_primary_text: string;
          cta_primary_link: string;
          cta_secondary_text: string;
          cta_secondary_link: string;
          bg_media_type: 'video' | 'image';
          bg_video_url: string;
          bg_poster_url: string;
          bg_image_url: string;
          stat_1_value: string;
          stat_1_label: string;
          stat_2_value: string;
          stat_2_label: string;
          stat_3_value: string;
          stat_3_label: string;
          stat_4_value: string;
          stat_4_label: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['hero']['Row']>;
        Update: Partial<Database['public']['Tables']['hero']['Row']>;
      };
      about: {
        Row: {
          id: string;
          tag_label: string;
          headline_part1: string;
          headline_part2: string;
          lead_paragraph: string;
          secondary_paragraph: string;
          main_image_url: string;
          badge_title: string;
          badge_subtitle: string;
          pillar_1_title: string;
          pillar_1_desc: string;
          pillar_2_title: string;
          pillar_2_desc: string;
          pillar_3_title: string;
          pillar_3_desc: string;
          pillar_4_title: string;
          pillar_4_desc: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['about']['Row']>;
        Update: Partial<Database['public']['Tables']['about']['Row']>;
      };
      services: {
        Row: {
          id: string;
          service_number: string;
          title: string;
          service_key: string;
          short_description: string;
          full_description: string;
          features: Json;
          icon_name: string;
          display_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['services']['Row']>;
        Update: Partial<Database['public']['Tables']['services']['Row']>;
      };
      projects: {
        Row: {
          id: string;
          title: string;
          slug: string | null;
          categories: string[];
          category_label: string;
          badge_label: string;
          caption: string;
          what_we_did: string;
          project_type: string;
          result: string;
          main_image_url: string;
          grid_span: string;
          is_featured: boolean;
          featured_checklist: Json;
          featured_order: number;
          display_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['projects']['Row']>;
        Update: Partial<Database['public']['Tables']['projects']['Row']>;
      };
      project_images: {
        Row: {
          id: string;
          project_id: string;
          image_url: string;
          caption: string;
          display_order: number;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['project_images']['Row']>;
        Update: Partial<Database['public']['Tables']['project_images']['Row']>;
      };
      showcase_video: {
        Row: {
          id: string;
          section_tag: string;
          title: string;
          subtitle: string;
          video_url: string;
          poster_url: string;
          cloudinary_public_id: string;
          cta_primary_text: string;
          cta_primary_link: string;
          cta_whatsapp_text: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['showcase_video']['Row']>;
        Update: Partial<Database['public']['Tables']['showcase_video']['Row']>;
      };
      why_us: {
        Row: {
          id: string;
          title: string;
          description: string;
          icon_name: string;
          display_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['why_us']['Row']>;
        Update: Partial<Database['public']['Tables']['why_us']['Row']>;
      };
      homepage_sections: {
        Row: {
          id: string;
          section_key: string;
          title: string;
          is_enabled: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['homepage_sections']['Row']>;
        Update: Partial<Database['public']['Tables']['homepage_sections']['Row']>;
      };
      estimator_services: {
        Row: {
          id: string;
          service_key: string;
          name: string;
          base_price_ngn: number;
          display_order: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['estimator_services']['Row']>;
        Update: Partial<Database['public']['Tables']['estimator_services']['Row']>;
      };
      quote_enquiries: {
        Row: {
          id: string;
          full_name: string;
          phone_number: string;
          email: string | null;
          service_required: string;
          message: string | null;
          status: string;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['quote_enquiries']['Row']>;
        Update: Partial<Database['public']['Tables']['quote_enquiries']['Row']>;
      };
      media: {
        Row: {
          id: string;
          file_name: string;
          file_type: 'image' | 'video';
          cloudinary_public_id: string | null;
          secure_url: string;
          format: string | null;
          width: number | null;
          height: number | null;
          bytes: number | null;
          folder: string;
          alt_text: string | null;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['media']['Row']>;
        Update: Partial<Database['public']['Tables']['media']['Row']>;
      };
      admin_profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['admin_profiles']['Row']>;
        Update: Partial<Database['public']['Tables']['admin_profiles']['Row']>;
      };
      audit_logs: {
        Row: {
          id: string;
          admin_id: string | null;
          admin_email: string;
          action: string;
          entity: string;
          entity_id: string | null;
          details: Json;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['audit_logs']['Row']>;
        Update: Partial<Database['public']['Tables']['audit_logs']['Row']>;
      };
    };
  };
}
