import React from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton({ productName }) {
  // 🔁 Replace the phone number below with your actual WhatsApp number in international format
  const whatsappNumber = "+8801616367606";

  const message = `Hi! I want to buy ${productName} from Khuje Nin.`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition-all"
    >
      <MessageCircle size={16} />
      Buy on WhatsApp
    </a>
  );
}

{
  /* <WhatsAppButton productName="Natural Honey" /> */
}
