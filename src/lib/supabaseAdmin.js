// src/lib/supabaseAdmin.js
import { createClient } from '@supabase/supabase-js';

export const createAdminClient  = () =>
  createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  