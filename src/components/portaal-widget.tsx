"use client";

import { useEffect, useRef, useState } from "react";
import { portaal } from "@/lib/site";

/**
 * Het TutorBird-inlogpaneel.
 *
 * De widget wordt als los script ingeladen en zet zichzelf in deze container.
 * Belangrijk: TutorBird bindt de widget aan het domein dat in hun instellingen
 * staat. Op een ander adres — bijvoorbeeld een testomgeving — laadt hij niet.
 * Daarom staat er altijd een directe link onder als terugval, zodat de pagina
 * nooit een doodlopend eind is.
 */
export function PortaalWidget() {
  const houder = useRef<HTMLDivElement>(null);
  const [geladen, setGeladen] = useState(false);
  const [mislukt, setMislukt] = useState(false);

  useEffect(() => {
    const el = houder.current;
    if (!el || el.querySelector("script")) return;

    const script = document.createElement("script");
    script.src = portaal.loginWidgetSrc;
    script.async = true;
    script.onerror = () => setMislukt(true);
    el.appendChild(script);

    // Laadt het paneel niet binnen een paar seconden, dan tonen we de terugval.
    const controle = setTimeout(() => {
      const iframe = el.querySelector("iframe");
      if (iframe) setGeladen(true);
      else setMislukt(true);
    }, 4000);

    return () => clearTimeout(controle);
  }, []);

  return (
    <div>
      <div ref={houder} className="tutorbird-widget" />

      {mislukt && !geladen && (
        <div className="rounded-2xl border border-line bg-sand p-6 text-center">
          <p className="text-[15.5px] text-ink-soft">
            Het inlogpaneel laadt niet. Geen probleem: u kunt rechtstreeks naar het portaal.
          </p>
          <a
            href={portaal.loginUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-[48px] items-center rounded-full bg-green px-6 text-[15px] font-semibold text-white transition-colors hover:bg-green-deep"
          >
            Naar het portaal
          </a>
        </div>
      )}
    </div>
  );
}
