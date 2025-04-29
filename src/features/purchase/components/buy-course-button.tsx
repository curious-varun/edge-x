"use client";

import { Button } from "@/components/ui/button";
import { IndianRupee } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { createOrderAction } from "../action/payment";

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

    if ("error" in res) {
      toast.error(res.error);
      return;
    }

    const order = res.data;

    const options = {
      key: "rzp_test_Farf2sxVLw5xLw",
      amount: order.amount,
      image: "/gambling.jpg",
      currency: order.currency,
      name: "edge-x",
      description: "Course Purchase",
      order_id: order.id,
      handler: async function(response: any) {
        try {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

          const res = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ razorpay_order_id, razorpay_payment_id, razorpay_signature }),
          });

          const verify = await res.json();
          toast(JSON.stringify(verify));

          if (verify.success) {
            toast.success(verify.message);
          } else {
            toast.error(verify.error);
          }
        } catch (error) {
          console.error("Verification failed:", error);
          toast.error("Verification failed. Please contact support.");
        }
      },
      theme: {
        color: "#6366f1", // indigo-500
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

