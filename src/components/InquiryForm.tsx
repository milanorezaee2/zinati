import { useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { normalizeDigits } from '@/lib/format';
import { BUTTON_PRIMARY, BUTTON_SECONDARY, INPUT_BASE, INPUT_IDLE, INPUT_INVALID } from '@/lib/styles';

interface InquiryFormProps {
  stoneId?: string | null;
  stoneCode?: string | null;
  defaultMessage?: string;
}

interface FormValues {
  name: string;
  phone: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;
type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const EMPTY_VALUES: FormValues = { name: '', phone: '', message: '' };
const PHONE_PATTERN = /^\+?[0-9 -]{7,20}$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  const phone = normalizeDigits(values.phone).trim();

  if (values.name.trim().length < 2) {
    errors.name = 'لطفاً نام خود را وارد کنید (حداقل ۲ حرف).';
  }
  if (!PHONE_PATTERN.test(phone) || phone.replace(/\D/g, '').length < 7) {
    errors.phone = 'شماره تماس معتبر وارد کنید.';
  }
  if (values.message.length > 1000) {
    errors.message = 'پیام نباید بیشتر از ۱۰۰۰ نویسه باشد.';
  }
  return errors;
}

export default function InquiryForm({ defaultMessage = '' }: InquiryFormProps) {
  const [values, setValues] = useState<FormValues>({ ...EMPTY_VALUES, message: defaultMessage });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const updateField = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // No delivery service is configured yet; do not report a false success.
    setStatus('error');
  };

  const resetForm = () => {
    setValues({ ...EMPTY_VALUES, message: defaultMessage });
    setErrors({});
    setStatus('idle');
  };

  if (status === 'success') {
    return (
      <div className="animate-fade-up flex flex-col items-center gap-4 py-8 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sage-600/20 text-sage-300">
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </span>
        <h3 className="text-xl text-cream-50">درخواست شما ثبت شد</h3>
        <p className="max-w-sm text-sm text-charcoal-100">
          کارشناسان ما به‌زودی با شماره‌ای که وارد کردید تماس می‌گیرند.
        </p>
        <button type="button" onClick={resetForm} className={BUTTON_SECONDARY}>
          ثبت درخواست جدید
        </button>
      </div>
    );
  }

  const fieldClass = (field: keyof FormValues) => `${INPUT_BASE} ${errors[field] ? INPUT_INVALID : INPUT_IDLE}`;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="inquiry-name" className="text-sm text-cream-200">
          نام و نام خانوادگی
        </label>
        <input
          id="inquiry-name"
          type="text"
          autoComplete="name"
          maxLength={100}
          value={values.name}
          onChange={(event) => updateField('name', event.target.value)}
          className={fieldClass('name')}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'inquiry-name-error' : undefined}
        />
        {errors.name && (
          <p id="inquiry-name-error" className="text-sm text-rose-300">
            {errors.name}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="inquiry-phone" className="text-sm text-cream-200">
          شماره تماس یا واتساپ
        </label>
        <input
          id="inquiry-phone"
          type="tel"
          autoComplete="tel"
          dir="ltr"
          maxLength={20}
          value={values.phone}
          onChange={(event) => updateField('phone', event.target.value)}
          className={`${fieldClass('phone')} text-start`}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? 'inquiry-phone-error' : undefined}
        />
        {errors.phone && (
          <p id="inquiry-phone-error" className="text-sm text-rose-300">
            {errors.phone}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="inquiry-message" className="text-sm text-cream-200">
          توضیحات (اختیاری)
        </label>
        <textarea
          id="inquiry-message"
          rows={4}
          maxLength={1000}
          value={values.message}
          onChange={(event) => updateField('message', event.target.value)}
          className={`${fieldClass('message')} resize-none`}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'inquiry-message-error' : undefined}
        />
        {errors.message && (
          <p id="inquiry-message-error" className="text-sm text-rose-300">
            {errors.message}
          </p>
        )}
      </div>

      {status === 'error' && (
        <p role="alert" className="rounded-xl border border-rose-400/50 bg-rose-600/10 px-4 py-3 text-sm text-rose-300">
          امکان ارسال فرم هنوز فعال نشده است. پس از تعیین روش دریافت پیام، این بخش فعال خواهد شد.
        </p>
      )}

      <p className="text-sm leading-7 text-charcoal-200">ارسال فرم در حال حاضر فعال نیست و نیاز به تنظیم روش دریافت پیام دارد.</p>
      <button type="submit" disabled className={`${BUTTON_PRIMARY} w-full`}>
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            در حال ثبت...
          </>
        ) : (
          'ثبت استعلام'
        )}
      </button>
    </form>
  );
}
