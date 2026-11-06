import type { Metadata } from "next";
import { paginaMeta } from "@/lib/seo";
import { SlagingscheckForm } from "@/components/slagingscheck/slagingscheck-form";

export const metadata: Metadata = paginaMeta({
  titel: "Gratis Slagingscheck aanvragen",
  omschrijving:
    "Vraag in twee minuten de gratis Slagingscheck aan. We brengen in kaart waar uw kind staat en geven een eerlijk antwoord op de vraag of slagen haalbaar is.",
  pad: "/slagingscheck",
  // Het formulier is de eindbestemming van de site, geen zoekingang.
  indexeren: false,
});

/**
 * Deze route valt bewust buiten de (site)-groep: geen header, geen footer,
 * geen navigatie. Het formulier neemt het hele scherm over zodat de ouder er
 * volledig op kan focussen.
 */
export default function SlagingscheckPage() {
  return <SlagingscheckForm />;
}
