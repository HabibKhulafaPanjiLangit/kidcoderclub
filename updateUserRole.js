const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://tasyihduktdqhshrizsl.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhc3lpaGR1a3RkcWhzaHJpenNsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjQxNjI3MywiZXhwIjoyMDc3OTkyMjczfQ.48qseHSmWsmMBcTJQErYIoi7CQyRgQFPeyaVETg5JBM';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function updateUserRole(userId) {
  const { data, error } = await supabase.auth.admin.updateUserById(userId, {
    user_metadata: { role: 'admin' }
  });

  console.log('Data:', data);
  console.log('Error:', error);
}

updateUserRole('ec7c241f-694e-41b2-8eaa-db68cab6da23');
