const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://tasyihduktdqhshrizsl.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhc3lpaGR1a3RkcWhzaHJpenNsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjQxNjI3MywiZXhwIjoyMDc3OTkyMjczfQ.48qseHSmWsmMBcTJQErYIoi7CQyRgQFPeyaVETg5JBM';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function setAdminRole(userId) {
  const { data, error } = await supabase.auth.admin.updateUserById(userId, {
    user_metadata: { role: 'admin' }
  });
  console.log('Data:', data);
  console.log('Error:', error);
}

setAdminRole('20195284-e823-4f67-8a6a-5e051549dfdb');
