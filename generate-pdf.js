import puppeteer from "puppeteer";
import chromium from "@sparticuz/chromium";

const generatePDF = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Espera activamente a que el servidor esté listo
  await page.goto("http://localhost:4321", {
    waitUntil: "networkidle0",
    timeout: 60000, // Aumenta el timeout
  });

  await page.pdf({
    path: "./CV.pdf",
    format: "A4",
    printBackground: true,
    margin: { top: "10mm", right: "10mm", bottom: "10mm", left: "10mm" },
  });

  await browser.close();
  console.log("✅ generated PDF in ./CV.pdf");
};

generatePDF().catch(console.error);
