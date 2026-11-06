import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * De afbeelding die verschijnt als iemand een pagina deelt (WhatsApp,
 * Facebook, LinkedIn). Eén ontwerp in de huisstijl, met per pagina een eigen
 * titel. Wordt tijdens de build gemaakt, dus er is geen internet voor nodig.
 *
 * De lettertypes zijn vaste TTF-varianten in src/app/fonts/og: dit onderdeel
 * van Next.js kan geen woff2 lezen.
 */

export const deelFormaat = { width: 1200, height: 630 };

const kleur = {
  creme: "#fbfaf6",
  inkt: "#1b1a16",
  inktZacht: "#403d35",
  groen: "#0e6b4f",
  groenDiep: "#0a5340",
  lijn: "#e6e0d4",
};

export async function maakDeelafbeelding({
  titel,
  ondertitel,
}: {
  titel: string;
  ondertitel?: string;
}) {
  const [fraunces, inter, icoon] = await Promise.all([
    readFile(join(process.cwd(), "src/app/fonts/og/fraunces-600.ttf")),
    readFile(join(process.cwd(), "src/app/fonts/og/inter-500.ttf")),
    readFile(join(process.cwd(), "public/brand-icon.png")),
  ]);
  const icoonSrc = `data:image/png;base64,${icoon.toString("base64")}`;
  const lang = titel.length > 46;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: kleur.creme,
          padding: "60px 72px",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse kent alleen <img> */}
          <img src={icoonSrc} width={58} height={56} alt="" />
          <div style={{ fontFamily: "Fraunces", fontSize: 38, color: kleur.inkt }}>ExamenDocent</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "Fraunces",
              fontSize: lang ? 60 : 72,
              lineHeight: 1.08,
              letterSpacing: -0.3,
              color: kleur.inkt,
            }}
          >
            {titel}
          </div>
          {ondertitel && (
            <div style={{ marginTop: 26, fontSize: 30, lineHeight: 1.35, color: kleur.inktZacht }}>
              {ondertitel}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `2px solid ${kleur.lijn}`,
            paddingTop: 26,
            fontSize: 26,
            color: kleur.groenDiep,
          }}
        >
          <div>examendocent.nl</div>
          <div
            style={{
              display: "flex",
              background: kleur.groen,
              color: "#ffffff",
              borderRadius: 999,
              padding: "12px 28px",
            }}
          >
            Gratis Slagingscheck
          </div>
        </div>
      </div>
    ),
    {
      ...deelFormaat,
      fonts: [
        { name: "Fraunces", data: fraunces, weight: 600, style: "normal" },
        { name: "Inter", data: inter, weight: 500, style: "normal" },
      ],
    },
  );
}
