const fs = require("fs");
const path = require("path");
const markdownIt = require("markdown-it");
const puppeteer = require("puppeteer");

/**
 * Converts a Markdown file to PDF.
 * @param {string} markdownPath - Path to the input Markdown file.
 * @param {string} outputPdfPath - Path to save the output PDF file.
 */
async function convertMarkdownToPDF(markdownPath, outputPdfPath) {
  // Read the Markdown file
  const markdownContent = fs.readFileSync(markdownPath, "utf-8");

  // Convert Markdown to HTML
  const md = new markdownIt();
  const htmlContent = md.render(markdownContent);

  // Custom CSS for better PDF appearance
  const customCSS = `
    <style>
      body {
        font-family: 'Segoe UI', Arial, sans-serif;
        color: #222;
        background: #fff;
        font-size: 16px;
        line-height: 1.7;
        /* Remove margin, as Puppeteer will handle PDF margins */
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      .content-wrapper {
        max-width: 800px;
        margin: 0 auto;
        padding: 0;
      }
      h1, h2, h3, h4, h5, h6 {
        font-family: 'Segoe UI', Arial, sans-serif;
        font-weight: 700;
        color: #1a237e;
        margin-top: 0.7em;
        margin-bottom: 0.4em;
      }
      h1 {
        font-size: 1.6em;
        border-bottom: 2px solid #1a237e;
        padding-bottom: 0.2em;
        margin-top: 0;
      }
      h2 {
        font-size: 1.2em;
        border-bottom: 1px solid #3949ab;
        padding-bottom: 0.15em;
        margin-top: 1em;
      }
      h3 {
        font-size: 1.05em;
        margin-top: 0.8em;
      }
      ul, ol {
        margin-left: 2em;
        margin-bottom: 1em;
      }
      li {
        margin-bottom: 0.4em;
      }
      strong {
        color: #0d47a1;
      }
      code {
        background: #23272e;
        color: #ffe082;
        padding: 2px 6px;
        border-radius: 6px;
        font-size: 0.97em;
        font-family: 'Fira Mono', 'Consolas', 'Menlo', monospace;
        box-shadow: 0 1px 2px rgba(0,0,0,0.04);
      }
      pre {
        background: #23272e;
        color:rgb(110, 110, 110);
        padding: 16px;
        border-radius: 8px;
        overflow-x: auto;
        font-size: 0.97em;
        font-family: 'Fira Mono', 'Consolas', 'Menlo', monospace;
        margin-bottom: 1.2em;
        box-shadow: 0 2px 8px rgba(0,0,0,0.07);
      }
      pre code {
        background: none;
        color: inherit;
        padding: 0;
        border-radius: 0;
        font-size: inherit;
        font-family: inherit;
        box-shadow: none;
        border: none;
      }
      table {
        border-collapse: collapse;
        width: 100%;
        margin-bottom: 1.5em;
      }
      th, td {
        border: 1px solid #bdbdbd;
        padding: 8px 12px;
        text-align: left;
      }
      th {
        background: #e3eafc;
      }
      blockquote {
        border-left: 4px solid #90caf9;
        background: #f1f8ff;
        margin: 1em 0;
        padding: 0.8em 1.2em;
        color: #333;
        font-style: italic;
      }
      @media print {
        body { margin: 0; }
      }
    </style>
  `;

  // Compose final HTML with CSS and a wrapper for max-width
  const finalHtml = `<!DOCTYPE html><html><head><meta charset='utf-8'>${customCSS}</head><body><div class="content-wrapper">${htmlContent}</div></body></html>`;

  // Launch Puppeteer and generate PDF from HTML
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    executablePath:
      process.platform === "darwin"
        ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
        : undefined,
  });

  const page = await browser.newPage();
  await page.setContent(finalHtml, { waitUntil: "networkidle0" });
  await page.pdf({
    path: outputPdfPath,
    format: "A4",
    margin: { top: "1cm", right: "1cm", bottom: "1cm", left: "1cm" },
  });
  await browser.close();

  console.log(`PDF generated at: ${outputPdfPath}`);
}

// Get command line arguments
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("Please provide the path to the Markdown file.");
  process.exit(1);
}

const markdownPath = args[0];
let outputPdfPath;

if (args.length > 1) {
  outputPdfPath = args[1];
} else {
  // Generate output path based on input file
  const dir = path.dirname(markdownPath);
  const filename = path.basename(markdownPath, path.extname(markdownPath));
  outputPdfPath = path.join(dir, `${filename}.pdf`);
}

// Execute the conversion
convertMarkdownToPDF(markdownPath, outputPdfPath).catch((error) => {
  console.error("Error converting Markdown to PDF:", error);
  process.exit(1);
});
