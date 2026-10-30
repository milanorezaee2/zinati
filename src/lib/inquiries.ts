import { supabase } from '@/lib/supabase';

export interface InquiryInput {
  stoneId: string | null;
  stoneCode: string | null;
  name: string;
  phone: string;
  message: string;
}

export async function submitInquiry(input: InquiryInput): Promise<void> {
  const { error } = await supabase.from('inquiries').insert({
    stone_id: input.stoneId,
    stone_code: input.stoneCode,
    name: input.name,
    phone: input.phone,
    message: input.message || null,
  });

  if (error) throw new Error(error.message);
}
