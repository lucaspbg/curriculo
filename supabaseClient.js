// supabaseClient.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://wdmsfmmzaiodwxjyvdtd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkbXNmbW16YWlvZHd4anl2ZHRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI0MTI1OTgsImV4cCI6MjA0Nzk4ODU5OH0.JzFOFNdqNMMk9yneU97XxGIWMlHLjb3PKHffiorT9y4';
export const supabase = createClient(supabaseUrl, supabaseKey);
