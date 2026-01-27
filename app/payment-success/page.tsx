import { Suspense } from "react";
import PaymentSuccessClient from "./PaymentSuccessClient";

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="text-center py-16">Đang tải...</div>}>
      <PaymentSuccessClient />
    </Suspense>
  );
}
