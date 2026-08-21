CREATE TYPE public.post_section AS ENUM ('industry_visit','technology','project');
CREATE TYPE public.tech_category AS ENUM ('lesson','common');

CREATE TABLE public.posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section public.post_section NOT NULL,
  tech_category public.tech_category,
  title text NOT NULL,
  caption text,
  image_url text,
  image_path text,
  ppt_url text,
  ppt_path text,
  created_by uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.posts TO authenticated;
GRANT ALL ON public.posts TO service_role;

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Posts are publicly readable" ON public.posts FOR SELECT USING (true);
CREATE POLICY "Members can create posts" ON public.posts FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Members can update own posts" ON public.posts FOR UPDATE TO authenticated USING (auth.uid() = created_by) WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Members can delete own posts" ON public.posts FOR DELETE TO authenticated USING (auth.uid() = created_by);

CREATE OR REPLACE FUNCTION public.update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql SET search_path = public;
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON public.posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE POLICY "Anyone can read uploads" ON storage.objects FOR SELECT USING (bucket_id = 'uploads');
CREATE POLICY "Authenticated can upload" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'uploads');
CREATE POLICY "Owners can update uploads" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'uploads' AND owner = auth.uid());
CREATE POLICY "Owners can delete uploads" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'uploads' AND owner = auth.uid());