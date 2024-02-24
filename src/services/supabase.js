
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = ''
//const supabaseKey = process.env.SUPABASE_KEY;
const supabaseKey = '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;