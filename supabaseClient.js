// supabaseClient.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://wdmsfmmzaiodwxjyvdtd.supabase.co';
const supabaseKey = 'sb_publishable_vziq1mIU8RURLfALlc0YxA_pno2srr_';
export const supabase = createClient(supabaseUrl, supabaseKey);
