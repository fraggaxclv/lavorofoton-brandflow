import { useEffect } from "react";
import ComparativoAumark1217 from "@/pages/ComparativoAumark1217";

const WHATSAPP_NUMBER = "5531996970656";
const WHATSAPP_MSG = encodeURIComponent("Olá, eu vim dos anúncios do Google e do comparativo do 1217 com outros caminhões três quartos.");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

function useWhatsAppOverride() {
  useEffect(() => {
    const replaceLinks = () => {
      document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.setAttribute('href', WHATSAPP_URL);
      });
    };
    replaceLinks();
    const observer = new MutationObserver(replaceLinks);
    observer.observe(document.body, { childList: true, subtree: true });

    const originalOpen = window.open;
    window.open = function(url?: string | URL, ...args: any[]) {
      if (typeof url === 'string' && url.includes('wa.me')) {
        return originalOpen.call(window, WHATSAPP_URL, ...args);
      }
      return originalOpen.call(window, url, ...args);
    } as typeof window.open;

    return () => {
      observer.disconnect();
      window.open = originalOpen;
    };
  }, []);
}

export default function ComparativoAumark1217Trafego() {
  useWhatsAppOverride();
  return <ComparativoAumark1217 />;
}
