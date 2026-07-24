CREATE TABLE IF NOT EXISTS project_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  business_type text,
  project_type text,
  budget text,
  message text NOT NULL
);

ALTER TABLE project_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "insert_inquiries" ON project_inquiries FOR INSERT
  TO anon, authenticated WITH CHECK (true);

CREATE POLICY "select_inquiries" ON project_inquiries FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "update_inquiries" ON project_inquiries FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "delete_inquiries" ON project_inquiries FOR DELETE
  TO authenticated USING (true);
