
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ReminderEmailRequest {
  userEmail: string;
  userName: string;
  reminderTitle: string;
  amount: number;
  dueDate: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userEmail, userName, reminderTitle, amount, dueDate }: ReminderEmailRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "ExpenseTracker <onboarding@resend.dev>",
      to: [userEmail],
      subject: `Bill Reminder: ${reminderTitle} - Due ${dueDate}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; color: white; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">💰 Bill Reminder</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-top: 20px;">
            <h2 style="color: #333; margin-bottom: 20px;">Hi ${userName}! 👋</h2>
            
            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              This is a friendly reminder that your <strong>${reminderTitle}</strong> bill is due soon.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; margin: 20px 0;">
              <h3 style="margin: 0 0 10px 0; color: #333;">Bill Details:</h3>
              <p style="margin: 5px 0; color: #666;"><strong>Amount:</strong> $${amount.toFixed(2)}</p>
              <p style="margin: 5px 0; color: #666;"><strong>Due Date:</strong> ${new Date(dueDate).toLocaleDateString()}</p>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              Stay on top of your finances with ExpenseTracker! 📊
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding: 20px; color: #999; font-size: 12px;">
            <p>This email was sent from your ExpenseTracker app.</p>
          </div>
        </div>
      `,
    });

    console.log("Reminder email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-reminder-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
