import { chromium } from "playwright";
import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

(async () => {
  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage();
  await page.goto("https://www.bcv.org.ve/", { timeout: 60000 });

  const dolar = await page.textContent(
    '//*[@id="dolar"]/div/div/div[2]/strong'
  );
  const euro = await page.textContent('//*[@id="euro"]/div/div/div[2]/strong');
  const yuan = await page.textContent('//*[@id="yuan"]/div/div/div[2]/strong');
  const lira = await page.textContent('//*[@id="lira"]/div/div/div[2]/strong');
  const rublo = await page.textContent(
    '//*[@id="rublo"]/div/div/div[2]/strong'
  );

  const valores = {
    dolar: dolar,
    euro: euro,
    yuan: yuan,
    lira: lira,
    rublo: rublo,
  };

  app.get("/", (req, res) => {
    res.send(valores);
  });

  await browser.close();

  app.listen(port, () => {
    console.log(`App corriendo en puerto ${port}`);
  });
})();
