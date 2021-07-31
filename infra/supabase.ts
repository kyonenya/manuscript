import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://aluxslhqnisyhhsfucyq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNzcxNDgyMSwiZXhwIjoxOTQzMjkwODIxfQ.rs2stmsSHSiaLrXNdzvTDYt7nuomStefWoB5SY3pApI'
);
