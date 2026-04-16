export interface Email {
  id: number;
  sender_email: string;
  subject: string;
  email_body: string;
  category: string;
  sentiment: string;
  priority: string;
  confidence_score: number;
  manual_review_flag: boolean;
  received_time: string;
  response_sent: boolean;
  reply_sent_at: string | null;
}
