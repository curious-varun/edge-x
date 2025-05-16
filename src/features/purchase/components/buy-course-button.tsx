"use client";

import { Button } from "@/components/ui/button";
import { IndianRupee } from "lucide-react";
import { useEffect } from "react";
import { createOrderAction, verifyPayment } from "../action";
import { toast } from "sonner";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface BuyCourseButtonProps {
  courseId: string;
}

export function BuyCourseButton({ courseId }: BuyCourseButtonProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleBuyCourse = async () => {
    const res = await createOrderAction(courseId);

    if (!res.success || !res.order) {
      toast.error(res.message || "Failed to create order.");
      return;
    }

    const order = res.order;

    const options = {
      key: process.env.RAZORPAY_KEY_ID || "rzp_test_Yd0WbBPFLGOKOJ",
      amount: order.amount,
      currency: order.currency,
      name: "edge-x",
      description: "Course Purchase",
      image: "/gambling.jpg",
      order_id: order.id,
      handler: async function (response: any) {
        try {
          alert(JSON.stringify(response));
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

          const verify = await verifyPayment({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
          });

          if (verify.success) {
            toast.success(verify.message);
          } else {
            toast.error(verify.message || "Verification failed.");
          }
        } catch (error) {
          console.error("Verification error:", error);
          toast.error("Verification failed. Please contact support.");
        }
      },
      theme: {
        color: "#000000",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div>
      <Button onClick={handleBuyCourse}>
        <IndianRupee className="mr-2 h-4 w-4" />
        Buy this course
      </Button>
    </div>
  );
}

