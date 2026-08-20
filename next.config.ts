import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
      { source: "/inloggen", destination: "/", permanent: true },

      // Docentwerving is hernoemd
      { source: "/tutor-worden", destination: "/docent-worden", permanent: true },

      // Verwijderde blogartikelen
      { source: "/blog/cito-toets-groep-8-voorbereiden", destination: "/blog", permanent: true },
      { source: "/blog/beter-leren-plannen", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;
