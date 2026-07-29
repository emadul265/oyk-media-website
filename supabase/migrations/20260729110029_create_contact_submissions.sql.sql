/*
# Create contact_submissions table (single-tenant, no auth)

1. New Tables
- `contact_submissions`
  - `id` (uuid, primary key)
  - `name` (text, not null) — submitter's full name
  - `company` (text) — company or brand name
  - `email` (text, not null) — contact email
  - `website` (text) — website or social profile link
  - `partnership_type` (text, not null) — selected partnership type
  - `description` (text, not null) — brief opportunity description
  - `status` (text, default 'new') — internal review status
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `contact_submissions`.
- Allow anon + authenticated INSERT so visitors can submit opportunities without an account.
- No SELECT/UPDATE/DELETE for anon — submissions are reviewed privately by OYK Media staff via the service role.
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text,
  email text NOT NULL,
  website text,
  partnership_type text NOT NULL,
  description text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_submissions" ON contact_submissions;
CREATE POLICY "anon_insert_submissions"
ON contact_submissions FOR INSERT
TO anon, authenticated
WITH CHECK (true);
