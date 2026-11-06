import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
   * Hostinger (gedeelde hosting) beperkt hoeveel processen een build mag
   * starten. Turbopack crashte daar ("child process exited before
   * connecting"), daarom bouwt `npm run build` met webpack (zie package.json),
   * en houden we het aantal hulpprocessen bij het bouwen klein.
   */
  experimental: {
    cpus: 2,
  },

  async redirects() {
    return [
      // Oude tarievenpagina → nieuwe prijs- en garantiepagina
      { source: "/tarieven", destination: "/prijs-en-garantie", permanent: true },

      // Oude vak- en niveaupagina's → het programma
      { source: "/vakken", destination: "/slagingsprogramma", permanent: true },
      { source: "/bijles/wiskunde", destination: "/slagingsprogramma", permanent: true },
      { source: "/bijles/:slug", destination: "/", permanent: true },

      // Het aanmeldformulier is vervangen door de Slagingscheck op een eigen,
      // schermvullende route
      { source: "/aanmelden", destination: "/slagingscheck", permanent: true },
      { source: "/inschrijven", destination: "/slagingscheck", permanent: true },

      // Eén aanbod: de losse programma's zijn weg, alles wijst naar Examenklaar
      { source: "/programmas", destination: "/slagingsprogramma", permanent: true },
      { source: "/toetsweek-sprint", destination: "/slagingsprogramma", permanent: true },
      { source: "/maatwerk", destination: "/slagingsprogramma", permanent: true },
      { source: "/herkansingssprint", destination: "/slagingsprogramma", permanent: true },
      { source: "/zomer-opfris", destination: "/slagingsprogramma", permanent: true },
      { source: "/examenjaar-fundament", destination: "/slagingsprogramma", permanent: true },

      // Docentwerving is hernoemd
      { source: "/tutor-worden", destination: "/docent-worden", permanent: true },

      // Verwijderde blogartikelen
      { source: "/blog/cito-toets-groep-8-voorbereiden", destination: "/blog", permanent: true },
      { source: "/blog/beter-leren-plannen", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;
