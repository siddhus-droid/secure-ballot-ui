-- Create voters table to store registered voters
CREATE TABLE public.voters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone_number TEXT NOT NULL UNIQUE,
  voter_id TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  has_voted BOOLEAN DEFAULT false
);

-- Enable Row Level Security
ALTER TABLE public.voters ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read voters (for verification)
CREATE POLICY "Anyone can read voters for verification"
ON public.voters
FOR SELECT
USING (true);

-- Allow anyone to insert new voters (for registration)
CREATE POLICY "Anyone can register as voter"
ON public.voters
FOR INSERT
WITH CHECK (true);

-- Create index for faster lookups
CREATE INDEX idx_voters_phone ON public.voters(phone_number);
CREATE INDEX idx_voters_name_phone ON public.voters(name, phone_number);