-- Add UPDATE policy to allow voters to update their voting status
-- This allows the system to mark a voter as having voted and assign a ballot ID
CREATE POLICY "Allow updating voter status after verification"
ON public.voters
FOR UPDATE
USING (true)
WITH CHECK (true);