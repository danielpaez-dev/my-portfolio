import puppeteer from "puppeteer";

async function generatePDF() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Depuración
  page.on("response", (response) => {
    if (!response.ok()) {
      console.log(`Error loading ${response.url()}: ${response.status()}`);
    }
  });

  page.on("console", (msg) => console.log("CONSOLE LOG:", msg.text()));

  try {
    console.time("PDF Generation Time");

    await page.goto("http://localhost:4321", {
      waitUntil: "domcontentloaded",
      timeout: 120000,
    });

    await page.pdf({
      path: "./public/CV.pdf",
      format: "A4",
      printBackground: true,
      margin: { top: "10mm", right: "10mm", bottom: "10mm", left: "10mm" },
    });

    console.timeEnd("PDF Generation Time");
  } catch (error) {
    console.error("Error generando PDF:", error);
  } finally {
    await browser.close();
  }
}

generatePDF();
