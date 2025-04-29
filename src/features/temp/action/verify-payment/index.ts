"use server";

import crypto from "crypto";

export async function verifyPaymentAction(
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string
) {
  try {
    // Validation
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      console.error("Missing required payment parameters");
      return { success: false, error: "Missing payment parameters" };
    }

    // Check if secret key exists
    const secretKey = "GA9c86Uy6vu3K6yYg6EZvFGu"


    // Create the signature verification string
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", secretKey)
      .update(body)
      .digest("hex");

    // Compare signatures
    if (expectedSignature === razorpay_signature) {
      console.log("Payment verified successfully ✅");

      return {
        success: true,
        message: "Payment verified successfully",
        paymentId: razorpay_payment_id
      };
    } else {
      console.error("Payment signature verification failed");
      return { success: false, error: "Invalid payment signature" };
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return {
      success: false,
      error: "Payment verification failed. Please contact support."
    };
  }
}
