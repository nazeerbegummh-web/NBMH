import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jxdhfkclokpvuttfnkye.supabase.co';
const supabaseKey = 'sb_publishable_0u2qmmr4FLdRCvBnEojyMw_rmS5aRaa';

export const supabase = createClient(supabaseUrl, supabaseKey);

const MASTER_ID = 'master_config';
const TABLE_NAME = 'hospital_registry';
const BUCKET_NAME = 'hospital-media';

/**
 * Persists the entire site state to Supabase.
 */
export const syncToSupabase = async (data: any) => {
  try {
    const { error } = await supabase
      .from(TABLE_NAME)
      .upsert({ 
        id: MASTER_ID, 
        data: data 
      }, { onConflict: 'id' });
    
    if (error) {
      console.error('Supabase Sync Error:', error);
      return { 
        success: false, 
        message: error.message,
        details: error.details,
        hint: error.hint
      };
    }
    return { success: true };
  } catch (err: any) {
    console.error('Critical Sync Error:', err);
    return { success: false, message: err.message || 'Unknown network error' };
  }
};

/**
 * Uploads a file to Supabase Storage and returns the public URL.
 */
export const uploadFile = async (file: File) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.floor(Math.random() * 10000)}.${fileExt}`;
    const filePath = `doctors/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    return { success: true, url: publicUrl };
  } catch (err: any) {
    console.error('File Upload Error:', err);
    return { success: false, message: err.message };
  }
};

/**
 * Fetches the master state from Supabase.
 */
export const fetchFromSupabase = async () => {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('data')
      .eq('id', MASTER_ID) // Fixed: changed from (MASTER_ID, MASTER_ID) to ('id', MASTER_ID)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return null; // Row not found is normal for first setup
      throw error;
    }
    return data?.data || null;
  } catch (err) {
    console.error('Supabase Fetch Error:', err);
    return null;
  }
};

/**
 * Verification helper for the Admin Panel
 */
export const testSupabaseConnection = async () => {
  try {
    const { error } = await supabase.from(TABLE_NAME).select('id').limit(1);
    if (error) return false;
    return true;
  } catch {
    return false;
  }
};