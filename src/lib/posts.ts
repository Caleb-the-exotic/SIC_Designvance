import { supabase } from "@/integrations/supabase/client";

export type PostSection = "industry_visit" | "technology" | "project";
export type TechCategory = "lesson" | "common";

export type Post = {
  id: string;
  section: PostSection;
  tech_category: TechCategory | null;
  title: string;
  caption: string | null;
  image_url: string | null;
  ppt_url: string | null;
  created_at: string;
};

export async function fetchPosts(section: PostSection): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("id, section, tech_category, title, caption, image_url, ppt_url, created_at")
    .eq("section", section)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Post[];
}

const TEN_YEARS = 60 * 60 * 24 * 365 * 10;

export async function uploadFile(file: File, userId: string): Promise<string> {
  const ext = file.name.split(".").pop();
  const path = `${userId}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("uploads").upload(path, file);
  if (error) throw error;
  const { data, error: signError } = await supabase.storage
    .from("uploads")
    .createSignedUrl(path, TEN_YEARS);
  if (signError) throw signError;
  return data.signedUrl;
}
