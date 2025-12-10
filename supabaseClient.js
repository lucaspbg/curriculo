// supabaseClient.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://wdmsfmmzaiodwxjyvdtd.supabase.co';
const supabaseKey = 'cd627e6c-7739-47c3-9254-610b3b719e3c';
export const supabase = createClient(supabaseUrl, supabaseKey);
