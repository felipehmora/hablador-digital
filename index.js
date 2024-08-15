import { extract } from "@extractus/article-extractor";
import express from "express";

const app = express();
const port = 3000;

const article = await extract("https://www.bcv.org.ve/");

const contentHTML = article;

//console.log(contentHTML);

const extractCurrencyTable = (html) => {
  const regex =
    /<span>\s*(.*?)\s*<\/span>\s*<\/p>\s*<p><strong>\s*(.*?)\s*<\/strong>/g;
  let match;
  const rows = [];

  while ((match = regex.exec(html)) !== null) {
    rows.push(`${match[1]}        ${match[2]}`);
  }

  return `Moneda        Valor\n${rows.join("\n")}`;
};

//console.log(table);

app.get("/", (req, res) => {
  const table = extractCurrencyTable(contentHTML.content);

  const regex = /USD\s+([\d,]+(?:\.\d+)?)/;
  const match = table.match(regex);

  if (match) {
    console.log("Valor USD:", match[1]); // Valor USD: 36,61320000
  }
  res.send(match);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
