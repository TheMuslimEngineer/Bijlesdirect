"use client";

import { useEffect, useRef, useState } from "react";

/* Wisselt in de hero-kop: het hele woord wordt gewist en opnieuw
   getypt, telkens naar de volgende examenvariant.
   Vakonafhankelijk qua opzet — Wiskunde D staat er bewust niet bij,
   want daar is geen centraal eindexamen voor. */
const VARIANTEN = ["wiskunde A", "wiskunde B", "wiskunde C"];

const TYPSNELHEID = 68;
const WISSNELHEID = 34;
const PAUZE_VOL = 1500;
const PAUZE_LEEG = 300;

export function VakTypewriter() {
  const [tekst, setTekst] = useState(VARIANTEN[0]);
  const gestopt = useRef(false);

  useEffect(() => {
    const verminderdeBeweging = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (verminderdeBeweging) return;

    gestopt.current = false;
    let woordIndex = 0;
    let timer: ReturnType<typeof setTimeout>;

    function wacht(ms: number) {
      return new Promise<void>((resolve) => {
        timer = setTimeout(resolve, ms);
      });
    }

    async function loop() {
      while (!gestopt.current) {
        const woord = VARIANTEN[woordIndex % VARIANTEN.length];

        for (let i = 1; i <= woord.length && !gestopt.current; i++) {
          setTekst(woord.slice(0, i));
          await wacht(TYPSNELHEID);
        }
        await wacht(PAUZE_VOL);

        for (let i = woord.length; i >= 0 && !gestopt.current; i--) {
          setTekst(woord.slice(0, i));
          await wacht(WISSNELHEID);
        }
        await wacht(PAUZE_LEEG);

        woordIndex++;
      }
    }

    loop();
    return () => {
      gestopt.current = true;
      clearTimeout(timer);
    };
  }, []);

  return (
    <span className="vak-typewriter-doos">
      {/* Onzichtbare reserveringen: zetten de breedte van de doos vast op
          de breedste variant, zodat de rest van de kop niet meebeweegt. */}
      {VARIANTEN.map((v) => (
        <span key={v} className="vak-typewriter-reservering" aria-hidden="true">
          {v}
        </span>
      ))}
      <span className="vak-typewriter-tekst" aria-hidden="true">
        {tekst}
        <span className="vak-cursor" />
      </span>
      <span className="sr-only">wiskunde A, B of C</span>
    </span>
  );
}
