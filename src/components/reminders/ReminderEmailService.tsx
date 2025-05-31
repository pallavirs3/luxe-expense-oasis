
import { supabase } from '../../integrations/supabase/client';

interface SendReminderEmailRequest {
  userEmail: string;
  userName: string;
  reminderTitle: string;
  amount: number;
  dueDate: string;
}

export const sendReminderEmail = async (params: SendReminderEmailRequest) => {
  try {
    const { data, error } = await supabase.functions.invoke('send-reminder-email', {
      body: params
    });

    if (error) {
      console.error('Error sending reminder email:', error);
      return { success: false, error: error.message };
    }

    console.log('Reminder email sent successfully:', data);
    return { success: true, data };
  } catch (error: any) {
    console.error('Failed to send reminder email:', error);
    return { success: false, error: error.message };
  }
};
