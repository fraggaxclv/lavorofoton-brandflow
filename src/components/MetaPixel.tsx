import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
    _fbq: (...args: any[]) => void;
  }
}

const META_PIXEL_ID = "971845534390694";

export default function MetaPixel() {
  const location = useLocation();
  const isInterno = location.pathname.startsWith("/interno");

  useEffect(() => {
    if (isInterno) return;

    // Only inject script once
    if (!document.getElementById("meta-pixel-script")) {
      const script = document.createElement("script");
      script.id = "meta-pixel-script";
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${META_PIXEL_ID}');
      `;
      document.head.appendChild(script);

      const noscript = document.createElement("noscript");
      noscript.id = "meta-pixel-noscript";
      noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1"/>`;
      document.body.appendChild(noscript);
    }

    // Track pageview on every public route change
    if (window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [location.pathname, isInterno]);

  return null;
}
