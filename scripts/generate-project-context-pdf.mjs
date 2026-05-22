import PDFDocument from "pdfkit"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const mdPath = path.join(__dirname, "..", "docs", "PROJECT_CONTEXT.md")
const outPath = path.join(__dirname, "..", "docs", "PROJECT_CONTEXT.pdf")

const md = fs.readFileSync(mdPath, "utf8")
const doc = new PDFDocument({ margin: 45, size: "A4", bufferPages: true })
const stream = fs.createWriteStream(outPath)
doc.pipe(stream)

const margin = 45
const maxWidth = doc.page.width - margin * 2
let y = margin

function ensureSpace(h = 14) {
  if (y + h > doc.page.height - margin) {
    doc.addPage()
    y = margin
  }
}

function writeLine(text, opts = {}) {
  const fontSize = opts.size || 9
  const font = opts.bold ? "Helvetica-Bold" : "Helvetica"
  doc.font(font).fontSize(fontSize)
  const h = doc.heightOfString(text, { width: maxWidth })
  ensureSpace(h + 4)
  doc.text(text, margin, y, { width: maxWidth, lineGap: 2 })
  y += h + (opts.gap ?? 6)
}

for (const rawLine of md.split("\n")) {
  const line = rawLine.trimEnd()
  if (!line) {
    y += 4
    continue
  }
  if (line.startsWith("# ")) {
    writeLine(line.slice(2), { size: 16, bold: true, gap: 10 })
  } else if (line.startsWith("## ")) {
    writeLine(line.slice(3), { size: 12, bold: true, gap: 8 })
  } else if (line.startsWith("### ")) {
    writeLine(line.slice(4), { size: 10, bold: true, gap: 6 })
  } else if (line.startsWith("> ")) {
    writeLine(line.slice(2), { size: 8 })
  } else if (line.startsWith("|") && line.includes("|")) {
    writeLine(line.replace(/\|/g, "  ").replace(/---+/g, ""), { size: 8, gap: 2 })
  } else if (line.startsWith("- ") || line.startsWith("* ")) {
    writeLine("• " + line.slice(2), { size: 8 })
  } else if (/^\d+\.\s/.test(line)) {
    writeLine(line, { size: 8 })
  } else if (line.startsWith("```")) {
    continue
  } else {
    const clean = line.replace(/\*\*/g, "").replace(/`/g, "")
    writeLine(clean, { size: 8 })
  }
}

doc.end()
stream.on("finish", () => console.log(`PDF: ${outPath}`))
