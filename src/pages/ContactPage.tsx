import { MessageCircle } from 'lucide-react';
import InquiryForm from '@/components/InquiryForm';

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="mb-14 max-w-2xl">
        <p className="text-sm text-bronze-300">ارتباط با گالری</p>
        <h1 className="mt-5 text-4xl font-normal sm:text-5xl">در کنار شما هستیم</h1>
        <p className="mt-6 text-sm leading-8 text-charcoal-200">این بخش برای دریافت پرسش‌ها و درخواست‌های شما درباره مجموعه در نظر گرفته شده است.</p>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-[1.75rem] border border-charcoal-700 bg-charcoal-900/60 p-8 sm:p-10">
          <MessageCircle className="text-bronze-400" strokeWidth={1} size={32} />
          <h2 className="mt-7 text-2xl font-normal">راه‌های ارتباطی</h2>
          <p className="mt-4 text-sm leading-8 text-charcoal-200">اطلاعات تماس و روش دریافت پیام هنوز تعیین نشده‌اند. پس از آماده‌سازی، در همین صفحه نمایش داده خواهند شد.</p>
        </div>
        <div className="rounded-[1.75rem] border border-charcoal-700 bg-charcoal-900 p-8 sm:p-10">
          <h2 className="mb-3 text-2xl font-normal">فرم ارتباط</h2>
          <p className="mb-8 text-sm leading-8 text-charcoal-200">این فرم پس از تنظیم روش دریافت پیام فعال می‌شود.</p>
          <InquiryForm />
        </div>
      </div>
    </div>
  );
}
