// LearnAble Supabase client configuration.
// Replace both placeholders with your Supabase Project URL and publishable key.
// Never put a Supabase secret/service_role key in browser code.

const LEARNABLE_SUPABASE_URL = 'PASTE_YOUR_SUPABASE_PROJECT_URL_HERE';
const LEARNABLE_SUPABASE_PUBLISHABLE_KEY = 'PASTE_YOUR_SUPABASE_PUBLISHABLE_KEY_HERE';

const isLearnAbleSupabaseConfigured =
  LEARNABLE_SUPABASE_URL.startsWith('https://') &&
  !LEARNABLE_SUPABASE_URL.includes('PASTE_YOUR_') &&
  LEARNABLE_SUPABASE_PUBLISHABLE_KEY.length > 20 &&
  !LEARNABLE_SUPABASE_PUBLISHABLE_KEY.includes('PASTE_YOUR_');

// The CDN script must be loaded before this file.
const learnAbleSupabase = isLearnAbleSupabaseConfigured && window.supabase
  ? window.supabase.createClient(
      LEARNABLE_SUPABASE_URL,
      LEARNABLE_SUPABASE_PUBLISHABLE_KEY
    )
  : null;
