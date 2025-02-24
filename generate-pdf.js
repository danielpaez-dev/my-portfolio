import puppeteer from "puppeteer";
import { exec } from "child_process";
import fs from "fs";

const generatePDF = async () => {
  const server = exec("npm run preview");

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.goto("http://localhost:4321", {
    waitUntil: "networkidle0",
    timeout: 30000,
  });

  await page.pdf({
    path: "public/CV.pdf",
    format: "A4",
    printBackground: true,
    margin: { top: "10mm", right: "10mm", bottom: "10mm", left: "10mm" },
  });

  await browser.close();
  server.kill();
  console.log("✅ generated PDF in public/CV.pdf");
};

generatePDF().catch(console.error);
