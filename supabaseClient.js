// supabaseClient.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://wdmsfmmzaiodwxjyvdtd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkbXNmbW16YWlvZHd4anl2ZHRkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjQxMjU5OCwiZXhwIjoyMDQ3OTg4NTk4fQ.TYIEjC1ngPaFkkorElpYKPIzNZDjVWoO3__sMTG0se0';
export const supabase = createClient(supabaseUrl, supabaseKey);
