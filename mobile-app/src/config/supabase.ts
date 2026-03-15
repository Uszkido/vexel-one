import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ecdbgdvckrmiqcjgedlx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjZGJnZHZja3JtaXFjamdlZGx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0OTEwMzMsImV4cCI6MjA4OTA2NzAzM30.EYYriknKwta7b9_KKVA_rLZbFEPXyVxiWJkLwMYPp70';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
