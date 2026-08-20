import type { Metadata } from "next";
import { SlagingscheckForm } from "@/components/slagingscheck/slagingscheck-form";

export const metadata: Metadata = {
  title: "Gratis Slagingscheck aanvragen",
  description:
    "Vraag in twee minuten de gratis Slagingscheck aan. We brengen in kaart waar uw kind staat en geven een eerlijk antwoord op de vraag of slagen in 12 weken haalbaar is.",
  alternates: { canonical: "/slagingscheck" },
  // Het formulier is de eindbestemming van de site, geen zoekingang.
  robots: { index: false, follow: true },
};

/**
 * Deze route valt bewust buiten de (site)-groep: geen header, geen footer,
 * geen navigatie. Het formulier neemt het hele scherm over zodat de ouder er
 * volledig op kan focussen.
 */
export default function SlagingscheckPage() {
  return <SlagingscheckForm />;
}
