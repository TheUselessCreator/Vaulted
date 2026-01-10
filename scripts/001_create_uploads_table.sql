-- Create uploads table
CREATE TABLE IF NOT EXISTS public.uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE public.uploads ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view all uploads
CREATE POLICY "Allow anyone to view uploads" 
  ON public.uploads 
  FOR SELECT 
  USING (true);

-- Allow anyone to insert uploads
CREATE POLICY "Allow anyone to insert uploads" 
  ON public.uploads 
  FOR INSERT 
  WITH CHECK (true);

-- Allow anyone to delete uploads
CREATE POLICY "Allow anyone to delete uploads" 
  ON public.uploads 
  FOR DELETE 
  USING (true);

-- Allow anyone to update uploads
CREATE POLICY "Allow anyone to update uploads" 
  ON public.uploads 
  FOR UPDATE 
  USING (true);
