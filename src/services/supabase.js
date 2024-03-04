
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://brpetwgylkdhwzmxulrq.supabase.co'
//const supabaseKey = process.env.SUPABASE_KEY;
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJycGV0d2d5bGtkaHd6bXh1bHJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcxMDg0OTgsImV4cCI6MjAyMjY4NDQ5OH0.fw5RLCqwAO5usUes8SIB5aGm5TNhbhdbZtJ3AfSAr-M';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;