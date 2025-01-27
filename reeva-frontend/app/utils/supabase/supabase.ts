import { supabaseKey, supabaseUrl } from "@/app/utils/supabase/Constants";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(supabaseUrl, supabaseKey);
