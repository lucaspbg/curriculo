// supabaseClient.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://wdmsfmmzaiodwxjyvdtd.supabase.co';
const supabaseKey = 'sb_secret_cQ3jdp5lDqEl36pL8mwnKQ_SwLBRguI';
export const supabase = createClient(supabaseUrl, supabaseKey);
