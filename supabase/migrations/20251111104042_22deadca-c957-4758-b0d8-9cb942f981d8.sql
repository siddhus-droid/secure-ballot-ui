-- Add ballot_id column to voters table to store the ballot ID assigned when voting
ALTER TABLE public.voters 
ADD COLUMN ballot_id TEXT;

-- Add index on ballot_id for faster lookups
CREATE INDEX idx_voters_ballot_id ON public.voters(ballot_id);

-- Add unique constraint to ensure each ballot_id is unique
ALTER TABLE public.voters 
ADD CONSTRAINT voters_ballot_id_unique UNIQUE (ballot_id);