import { site } from "@/lib/site";
import { WhatsApp } from "@/components/icons";

export function WhatsAppButton() {
  return (
    <a
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Stuur ons een WhatsApp-bericht"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 rounded-full bg-[#25D366] px-5 py-3.5 font-semibold text-white shadow-[0_14px_30px_-10px_rgba(37,211,102,0.6)] transition-colors duration-150 hover:bg-[#1ebe5b] max-[600px]:p-4"
    >
      <WhatsApp className="h-[22px] w-[22px]" />
      <span className="max-[600px]:hidden">WhatsApp</span>
    </a>
  );
}
