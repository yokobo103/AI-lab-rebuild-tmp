function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeAttribute(value: string) {
  return escapeHtml(value).replace(/"/g, "&quot;");
}

function safeUrl(value: string) {
  const url = value.trim();
  if (url.startsWith("/")) return url;

  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol) ? url : "";
  } catch {
    return "";
  }
}

function inlineMarkdown(value: string) {
  const protectedHtml: string[] = [];
  const protect = (html: string) => {
    const key = `@@INLINE_${protectedHtml.length}@@`;
    protectedHtml.push(html);
    return key;
  };

  const prepared = value
    .replace(/`([^`]+)`/g, (_, code: string) => protect(`<code>${escapeHtml(code)}</code>`))
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match: string, alt: string, src: string) => {
      const safeSrc = safeUrl(src);
      return safeSrc ? protect(`<img src="${escapeAttribute(safeSrc)}" alt="${escapeAttribute(alt)}" loading="lazy" />`) : match;
    })
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match: string, label: string, href: string) => {
      const safeHref = safeUrl(href);
      return safeHref
        ? protect(`<a href="${escapeAttribute(safeHref)}" target="_blank" rel="noreferrer">${escapeHtml(label)}</a>`)
        : match;
    })
    .replace(/\*\*([^*]+)\*\*/g, (_, text: string) => protect(`<strong>${escapeHtml(text)}</strong>`));

  return protectedHtml.reduce((html, protectedValue, index) => {
    return html.replace(`@@INLINE_${index}@@`, protectedValue);
  }, escapeHtml(prepared));
}

export function markdownToHtml(markdown: string) {
  const lines = markdown.trim().split(/\r?\n/);
  const html: string[] = [];
  let inList = false;
  let inQuote = false;
  let inCodeBlock = false;
  let codeLanguage = "";
  let codeLines: string[] = [];

  const closeList = () => {
    if (!inList) return;
    html.push("</ul>");
    inList = false;
  };

  const closeQuote = () => {
    if (!inQuote) return;
    html.push("</blockquote>");
    inQuote = false;
  };

  for (const line of lines) {
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        const languageClass = codeLanguage ? ` class="language-${escapeAttribute(codeLanguage)}"` : "";
        html.push(`<pre><code${languageClass}>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
        inCodeBlock = false;
        codeLanguage = "";
        codeLines = [];
      } else {
        closeList();
        closeQuote();
        inCodeBlock = true;
        codeLanguage = line.slice(3).trim().split(/\s+/)[0] ?? "";
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    if (!line.trim()) {
      closeList();
      closeQuote();
      continue;
    }

    if (line.startsWith("> ")) {
      closeList();
      if (!inQuote) {
        html.push("<blockquote>");
        inQuote = true;
      }
      html.push(`<p>${inlineMarkdown(line.slice(2))}</p>`);
      continue;
    }

    closeQuote();

    if (line.startsWith("### ")) {
      closeList();
      html.push(`<h3>${inlineMarkdown(line.slice(4))}</h3>`);
    } else if (line.startsWith("## ")) {
      closeList();
      html.push(`<h2>${inlineMarkdown(line.slice(3))}</h2>`);
    } else if (line.startsWith("# ")) {
      closeList();
      html.push(`<h2>${inlineMarkdown(line.slice(2))}</h2>`);
    } else if (line.startsWith("- ")) {
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      html.push(`<li>${inlineMarkdown(line.slice(2))}</li>`);
    } else {
      closeList();
      html.push(`<p>${inlineMarkdown(line)}</p>`);
    }
  }

  closeList();
  closeQuote();

  if (inCodeBlock) {
    const languageClass = codeLanguage ? ` class="language-${escapeAttribute(codeLanguage)}"` : "";
    html.push(`<pre><code${languageClass}>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
  }

  return html.join("");
}
