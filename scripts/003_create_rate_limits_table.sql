-- Create rate limits table to track API usage
CREATE TABLE IF NOT EXISTS api_rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  api_key TEXT NOT NULL,
  last_request_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_api_key FOREIGN KEY (api_key) REFERENCES api_keys(api_key) ON DELETE CASCADE
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_api_rate_limits_key ON api_rate_limits(api_key);

-- Enable RLS
ALTER TABLE api_rate_limits ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role to manage rate limits
CREATE POLICY "Service role can manage rate limits"
  ON api_rate_limits FOR ALL
  USING (true);
