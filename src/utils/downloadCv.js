import { generateCvHtml } from "./generateCvHtml";

const DATA_FILES = [
  "profile",
  "skills",
  "education",
  "experience",
  "portfolios",
  "certificates",
];

const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap";

async function fetchJson(endpoint) {
  const response = await fetch(`/data/${endpoint}.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint} data`);
  }
  return response.json();
}

function ensureInterFont() {
  const alreadyLoaded = [...document.querySelectorAll('link[rel="stylesheet"]')].some(
    (link) => link.href.includes("family=Inter"),
  );
  if (alreadyLoaded) return Promise.resolve();

  return new Promise((resolve) => {
    const preconnectGoogle = document.createElement("link");
    preconnectGoogle.rel = "preconnect";
    preconnectGoogle.href = "https://fonts.googleapis.com";
    document.head.appendChild(preconnectGoogle);

    const preconnectGstatic = document.createElement("link");
    preconnectGstatic.rel = "preconnect";
    preconnectGstatic.href = "https://fonts.gstatic.com";
    preconnectGstatic.crossOrigin = "anonymous";
    document.head.appendChild(preconnectGstatic);

    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href = FONT_HREF;
    fontLink.onload = () => resolve();
    fontLink.onerror = () => resolve();
    document.head.appendChild(fontLink);
  });
}

export async function downloadCv() {
  const [profile, skills, education, experience, portfolios, certificates] =
    await Promise.all(DATA_FILES.map(fetchJson));

  if (!profile?.name) {
    throw new Error("Profile data is missing");
  }

  await ensureInterFont();
  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.left = "-10000px";
  container.style.top = "0";
  container.style.width = "210mm";
  container.style.background = "white";
  container.innerHTML = generateCvHtml({
    profile,
    skills,
    education,
    experience,
    portfolios,
    certificates,
  });
  document.body.appendChild(container);

  const source = container.querySelector(".cv-root") || container;

  const options = {
    margin: [18, 18, 18, 18],
    filename: "Daniel-Hall-CV.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    pagebreak: { mode: ["css", "legacy"] },
  };

  const html2pdfModule = await import("html2pdf.js");
  const html2pdf = html2pdfModule.default ?? html2pdfModule;

  try {
    await html2pdf().set(options).from(source).save();
  } finally {
    container.remove();
  }
}
