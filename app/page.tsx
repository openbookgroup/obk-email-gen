"use client";

import { useMemo, useRef, useState } from "react";

const STATIC_CONFIG = {
  phoneDisplay: "+351 210 960 610",
  phonePlain: "+351210960610",
  addressLine: "Av Conselheiro Fernando de Sousa 19 - 8º",
  addressLink: "https://maps.app.goo.gl/DPze38XGxeQ5AJeD7",
  postalCodeCity: "1070-072 Lisboa",
  websiteDisplay: "openbook.pt",
  websiteLink: "https://www.openbook.pt",
  bannerUrl: "https://openbook.pt/wp-content/uploads/2026/06/Assinatura_email_AAwards2026.gif",
  // Se o GIF aparecer pixelizado, considere otimizá-lo ou usar versão WebP/PNG de maior qualidade
  bannerTargetLink: "https://openbook.pt/go",
  bannerAlt: "Openbook Group — Architecture, Studio, Design, Engineering & Real Estate",
  disclaimer:
    "A informação contida nesta mensagem, e os ficheiros anexos, é privilegiada e confidencial, destinando-se exclusivamente ao(s) destinatário(s). The information contained in this message, and any files attached, is privileged and confidential, intended exclusively for the included addresses.",
};

const JOB_TITLES = [
  "Accountant",
  "Architect",
  "BIM Coordinator",
  "BIM Manager",
  "BIM Technician",
  "Business Development Manager",
  "Business Intelligence Manager",
  "Chief Operating Officer",
  "Designer",
  "Director of Business Development",
  "Executive Coordinator",
  "Executive Director | Financial Advisor & Credit Solutions",
  "Facilities & Technology Director",
  "Financial & Administrative Director",
  "Financial Administrative",
  "Founding Partner",
  "Head of Accountacy",
  "Head of Hospitality Business Development",
  "Head of Investments",
  "Head of Project Management",
  "Interior Designer",
  "Lead Architect",
  "Lead Architect | Project Delivery & Quality",
  "Lead Interior Designer",
  "Lead Visualisation Architect",
  "Legal Manager",
  "Managing Director",
  "Managing Partner",
  "Marketing & Communications Director",
  "Marketing Assistant",
  "People & Culture Director",
  "Principal | Creative Director",
  "Principal | Project Delivery & Quality",
  "Principal Architect",
  "Product Designer",
  "Project Manager",
  "Real Estate Consultant",
  "Senior Architect",
  "Senior Communications Specialist",
  "Senior Designer",
  "Senior Investment Analyst",
  "Senior Visualisation Architect",
  "Senior Visualisation Designer",
] as const;

type FormState = {
  name: string;
  jobTitle: string;
  mobileDisplay: string;
  omitMobile: boolean;
};

const DEFAULT_FORM: FormState = {
  name: "",
  jobTitle: "",
  mobileDisplay: "+351 ",
  omitMobile: false,
};

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getLocalMobileDigits(value: unknown): string {
  let digits = String(value ?? "").replace(/[^0-9]/g, "");

  if (digits.startsWith("351")) {
    digits = digits.slice(3);
  }

  return digits.slice(0, 9);
}

function formatPortugueseMobile(value: unknown): string {
  const localDigits = getLocalMobileDigits(value);
  const part1 = localDigits.slice(0, 3);
  const part2 = localDigits.slice(3, 6);
  const part3 = localDigits.slice(6, 9);
  const parts = [part1, part2, part3].filter(Boolean);

  return parts.length ? `+351 ${parts.join(" ")}` : "+351 ";
}

function normalizePhone(value: unknown): string {
  const localDigits = getLocalMobileDigits(value);
  return localDigits.length === 9 ? `+351${localDigits}` : "";
}

function isValidPortugueseMobile(value: unknown): boolean {
  return getLocalMobileDigits(value).length === 9;
}

function formatFilename(value: string): string {
  const cleaned = value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return cleaned || "openbook-signature";
}

function buildSignatureHtml(form: FormState): string {
  const name = form.name.trim() || "Nome Apelido";
  const jobTitle = form.jobTitle.trim() || "Cargo";
  const mobileHref = normalizePhone(form.mobileDisplay);
  const mobileVisible = formatPortugueseMobile(form.mobileDisplay).trim();

  const contactLine = form.omitMobile || !mobileHref
    ? `T: <a href="tel:${escapeHtml(STATIC_CONFIG.phonePlain)}" style="color:rgb(130,130,130); text-decoration:underline;">${escapeHtml(STATIC_CONFIG.phoneDisplay)}</a>`
    : `M: <a href="tel:${escapeHtml(mobileHref)}" style="color:rgb(130,130,130); text-decoration:underline;">${escapeHtml(mobileVisible)}</a> | T: <a href="tel:${escapeHtml(STATIC_CONFIG.phonePlain)}" style="color:rgb(130,130,130); text-decoration:underline;">${escapeHtml(STATIC_CONFIG.phoneDisplay)}</a>`;

  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="width:100%; max-width:500px; border-collapse:collapse; border:none; mso-table-lspace:0pt; mso-table-rspace:0pt; font-family:Aptos, Arial, Helvetica, sans-serif; color:#000000;">
  <tr>
    <td style="font-size:10.5pt; line-height:13.5pt; color:#000000; font-weight:700; border:none;">
      ${escapeHtml(name)}
    </td>
  </tr>
  <tr>
    <td style="font-size:9pt; line-height:12pt; color:#000000; border:none;">
      ${escapeHtml(jobTitle)}
    </td>
  </tr>
  <tr>
    <td style="height:9px; line-height:9px; font-size:9px; border:none;">&nbsp;</td>
  </tr>
  <tr>
    <td style="height:1px; line-height:1px; font-size:1px; background-color:#aaaaaa; border:none; padding:0;">&nbsp;</td>
  </tr>
  <tr>
    <td style="height:9px; line-height:9px; font-size:9px; border:none;">&nbsp;</td>
  </tr>
  <tr>
    <td style="font-size:8pt; line-height:12pt; color:rgb(130,130,130); font-weight:normal; border:none; padding-bottom:2pt;">
      ${contactLine}
    </td>
  </tr>
  <tr>
    <td style="font-size:8pt; line-height:12pt; color:rgb(130,130,130); font-weight:normal; border:none; padding-bottom:2pt;">
      <a href="${escapeHtml(STATIC_CONFIG.addressLink)}" style="color:rgb(130,130,130); text-decoration:underline;">${escapeHtml(STATIC_CONFIG.addressLine)}</a>
    </td>
  </tr>
  <tr>
    <td style="font-size:8pt; line-height:12pt; color:rgb(130,130,130); font-weight:normal; border:none; padding-bottom:2pt;">
      ${escapeHtml(STATIC_CONFIG.postalCodeCity)}
    </td>
  </tr>
  <tr>
    <td style="font-size:8pt; line-height:12pt; color:rgb(130,130,130); font-weight:normal; border:none;">
      <a href="${escapeHtml(STATIC_CONFIG.websiteLink)}" style="color:rgb(130,130,130); text-decoration:underline;">${escapeHtml(STATIC_CONFIG.websiteDisplay)}</a>
    </td>
  </tr>
  <tr>
    <td style="height:14px; line-height:14px; font-size:14px; border:none;">&nbsp;</td>
  </tr>
  <tr>
    <td style="border:none; line-height:0; font-size:0;">
      <a href="${escapeHtml(STATIC_CONFIG.bannerTargetLink)}" target="_blank" rel="noopener noreferrer" style="text-decoration:none; border:none; display:block;">
        <img src="${escapeHtml(STATIC_CONFIG.bannerUrl)}" alt="${escapeHtml(STATIC_CONFIG.bannerAlt)}" width="500" style="display:block; width:100%; max-width:500px; height:auto; border:0;">
      </a>
    </td>
  </tr>
  <tr>
    <td style="height:16px; line-height:16px; font-size:16px; border:none;">&nbsp;</td>
  </tr>
  <tr>
    <td style="font-size:6.75pt; line-height:10pt; color:rgb(165,165,165); border:none;">
      ${escapeHtml(STATIC_CONFIG.disclaimer)}
    </td>
  </tr>
</table>`;
}

function buildHtmlDocument(signatureHtml: string): string {
  return `<!doctype html>
<html lang="pt">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Signature — Openbook Group</title>
</head>
<body style="margin:0; padding:0; background:#ffffff;">${signatureHtml}</body>
</html>`;
}

function runSelfTests() {
  const withMobile = buildSignatureHtml({
    name: "Luís Macedo",
    jobTitle: "Content Specialist",
    mobileDisplay: "+351 918 925 090",
    omitMobile: false,
  });
  const withoutMobile = buildSignatureHtml({
    name: "Luís Macedo",
    jobTitle: "Content Specialist",
    mobileDisplay: "+351 918 925 090",
    omitMobile: true,
  });

  const tests = [
    {
      label: "Template responsivo com fallback Outlook width 500",
      ok: withMobile.includes('width="500"') && withMobile.includes("width:100%; max-width:500px"),
    },
    {
      label: "Telemóvel omitido quando selecionado",
      ok: withoutMobile.includes("T:") && !withoutMobile.includes("M:"),
    },
    {
      label: "Link técnico tel: normalizado",
      ok: withMobile.includes("tel:+351918925090"),
    },
    {
      label: "Telemóvel formatado como +351 xxx xxx xxx",
      ok: formatPortugueseMobile("918925090") === "+351 918 925 090" && isValidPortugueseMobile("+351 918 925 090"),
    },
    {
      label: "Cargos BIM normalizados em maiúsculas",
      ok: JOB_TITLES.includes("BIM Coordinator") && JOB_TITLES.includes("BIM Manager") && JOB_TITLES.includes("BIM Technician"),
    },
    {
      label: "Banner atualizado",
      ok: withMobile.includes("/2026/06/Assinatura_email_AAwards2026.gif"),
    },
    {
      label: "Documento HTML completo gerado",
      ok: buildHtmlDocument(withMobile).includes("<!doctype html>") && buildHtmlDocument(withMobile).includes("</html>"),
    },
  ];

  return tests;
}

export default function Home() {
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);
  const [status, setStatus] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const previewRef = useRef<HTMLDivElement | null>(null);

  const CORRECT_PASSWORD = "openbookemail2026";

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    
    if (passwordInput === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordInput("");
    } else {
      setPasswordError("Palavra passe incorreta. Tente novamente.");
      setPasswordInput("");
    }
  };

  const signatureHtml = useMemo(() => buildSignatureHtml(form), [form]);
  const diagnostics = useMemo(() => runSelfTests(), []);
  const hasValidMobile = form.omitMobile || isValidPortugueseMobile(form.mobileDisplay);
  const canGenerate = Boolean(form.name.trim() && form.jobTitle.trim() && hasValidMobile);

  const updateForm = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => {
      if (key === "mobileDisplay") {
        return { ...current, mobileDisplay: formatPortugueseMobile(value) };
      }

      if (key === "omitMobile" && value === false && !current.mobileDisplay.trim()) {
        return { ...current, omitMobile: false, mobileDisplay: "+351 " };
      }

      return { ...current, [key]: value };
    });
  };

  const generateHtmlFile = () => {
    if (!form.name.trim() || !form.jobTitle.trim()) {
      setStatus("Preencha o nome e selecione um cargo antes de gerar a assinatura.");
      return;
    }

    if (!form.omitMobile && !isValidPortugueseMobile(form.mobileDisplay)) {
      setStatus("Preencha o telemóvel no formato +351 xxx xxx xxx ou selecione ‘Não quero colocar o número’. ");
      return;
    }

    const fileName = `${formatFilename(form.name || "openbook-signature")}.html`;
    const blob = new Blob([buildHtmlDocument(signatureHtml)], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);

    setStatus("HTML gerado. Abra o ficheiro descarregado no browser, copie a assinatura renderizada e cole no Outlook em Assinaturas.");
    window.setTimeout(() => setStatus(""), 6000);
  };


  if (!isAuthenticated) {
    return (
      <main className="page">
        <div className="shell">
          <header className="header">
            <p className="eyebrow">Openbook Group</p>
            <h1>Email Signature Generator</h1>
            <p className="subtitle">Última actualização: 22/06/2026</p>
          </header>

          <section className="main-grid">
            <div className="panel" style={{ maxWidth: "500px", margin: "0 auto" }}>
              <form className="form" onSubmit={handlePasswordSubmit}>
                <div className="field">
                  <label htmlFor="password">Palavra Passe</label>
                  <input
                    id="password"
                    type="password"
                    value={passwordInput}
                    onChange={(event) => setPasswordInput(event.target.value)}
                    placeholder="Introduza a palavra passe"
                    autoFocus
                  />
                  {passwordError && <p className="field-error">{passwordError}</p>}
                </div>

                <div className="actions">
                  <button type="submit" className="button">
                    Aceder
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="shell">
        <header className="header">
          <p className="eyebrow">Openbook Group</p>
          <h1>Email Signature Generator</h1>
          <p className="subtitle">Última actualização: 22/06/2026</p>
        </header>

        <section className="main-grid">
          <div className="panel">
            <form className="form" onSubmit={(event) => event.preventDefault()}>
              <div className="field">
                <label htmlFor="name">Nome</label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(event) => updateForm("name", event.target.value)}
                  placeholder="Escrever o nome e apelido"
                />
              </div>

              <div className="field">
                <label htmlFor="job-title">Cargo</label>
                <select
                  id="job-title"
                  value={form.jobTitle}
                  onChange={(event) => updateForm("jobTitle", event.target.value)}
                >
                  <option value="">Selecionar cargo</option>
                  {JOB_TITLES.map((title) => (
                    <option key={title} value={title}>
                      {title}
                    </option>
                  ))}
                </select>
                <p className="helper">Consultar organograma oficial ou falar com People&Culture para cargo oficial</p>
              </div>

              <div className="field">
                <label htmlFor="mobile">Número Telemóvel (M)</label>
                <input
                  id="mobile"
                  type="text"
                  value={form.mobileDisplay}
                  onChange={(event) => updateForm("mobileDisplay", event.target.value)}
                  onFocus={() => {
                    if (!form.mobileDisplay.trim()) updateForm("mobileDisplay", "+351 " as FormState["mobileDisplay"]);
                  }}
                  placeholder="+351 xxx xxx xxx"
                  disabled={form.omitMobile}
                />
                <p className="helper">
                  O campo mantém sempre o indicativo +351 e formata automaticamente para +351 xxx xxx xxx.
                </p>
                {!form.omitMobile && form.mobileDisplay.trim() !== "+351" && !isValidPortugueseMobile(form.mobileDisplay) ? (
                  <p className="field-error">O número deve ter 9 dígitos depois de +351.</p>
                ) : null}
                <label className="checkbox-row" htmlFor="omit-mobile">
                  <input
                    id="omit-mobile"
                    type="checkbox"
                    checked={form.omitMobile}
                    onChange={(event) => updateForm("omitMobile", event.target.checked)}
                  />
                  Não quero colocar o número
                </label>
              </div>

              <div className="actions">
                <button type="button" className="button" onClick={generateHtmlFile} disabled={!canGenerate}>
                  Gerar Assinatura
                </button>
              </div>

              {status ? <div className="status">{status}</div> : null}
            </form>
          </div>

          <aside className="panel preview-panel">
            <h2 className="panel-title">Pré-visualização</h2>
            <div className="preview-frame">
              <div ref={previewRef} dangerouslySetInnerHTML={{ __html: signatureHtml }} />
            </div>
            <p className="preview-note">
A pré-visualização é gerada em tempo real.
            </p>
          </aside>
        </section>

        <footer className="footer-grid">
          <details>
            <summary>Campos estáticos bloqueados</summary>
            <div className="details-content">
              <ul>
                <li>Telefone fixo: {STATIC_CONFIG.phoneDisplay}</li>
                <li>Morada: {STATIC_CONFIG.addressLine}</li>
                <li>Código postal: {STATIC_CONFIG.postalCodeCity}</li>
                <li>Site: {STATIC_CONFIG.websiteDisplay}</li>
                <li>Banner, links e disclaimer definidos centralmente.</li>
              </ul>
            </div>
          </details>

          <details>
            <summary>Notas de implementação</summary>
            <div className="details-content">
              O procedimento oficial é gerar o ficheiro HTML, abrir no browser, selecionar apenas a assinatura renderizada e colar no Outlook. Este fluxo reduz problemas com grelhas, tabelas e links em Outlook Classic.
            </div>
          </details>

          <details>
            <summary>Diagnóstico técnico</summary>
            <div className="details-content">
              <ul>
                {diagnostics.map((test) => (
                  <li key={test.label}>{test.ok ? "OK" : "Falhou"} — {test.label}</li>
                ))}
              </ul>
            </div>
          </details>
        </footer>
      </div>
    </main>
  );
}
