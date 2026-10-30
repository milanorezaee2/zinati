import StatusPanel from '@/components/StatusPanel';
import { BUTTON_PRIMARY } from '@/lib/styles';

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <StatusPanel title="صفحه پیدا نشد" description="نشانی واردشده وجود ندارد یا جابه‌جا شده است.">
        <a href="#/" className={BUTTON_PRIMARY}>
          بازگشت به خانه
        </a>
      </StatusPanel>
    </div>
  );
}
