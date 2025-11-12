-- Add aadhar_number column to voters table for identity verification
ALTER TABLE public.voters 
ADD COLUMN IF NOT EXISTS aadhar_number TEXT;