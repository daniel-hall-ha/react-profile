function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatJobDate(job) {
  const start = job.start_date || "";
  const end = job.end_date || "Present";
  return `${start} – ${end}`;
}

function formatEducationDate(item) {
  if (item.date) return item.date;
  const start = item.start_date || "";
  const end =
    item.status === "Ongoing" || !item.end_date ? "Present" : item.end_date;
  return start ? `${start} – ${end}` : end;
}

function sortExperience(experience) {
  return [...experience].sort((a, b) => {
    if (a.status === "Employed" && b.status !== "Employed") return -1;
    if (b.status === "Employed" && a.status !== "Employed") return 1;
    return 0;
  });
}

function renderSkills(skills) {
  if (!skills?.length) return "";

  const rows = skills
    .filter((skill) => skill.tools?.length)
    .map(
      (skill) => `
<div class="skill-title">${escapeHtml(skill.name)}</div>
<div class="skill-value">${skill.tools.map((tool) => escapeHtml(tool.name)).join(", ")}</div>
`,
    )
    .join("");

  if (!rows) return "";

  return `
<section style="font-size: 12px;">
<div class="section-title">
Technical Skills
</div>
<div class="skills">
${rows}
</div>
</section>
`;
}

function renderExperience(experience) {
  if (!experience?.length) return "";

  const jobs = sortExperience(experience)
    .map((job) => {
      const projects = (job.projects || [])
        .map(
          (project) => `
<div class="project">
<h4>${escapeHtml(project.name)}</h4>
<ul>
${(project.responsibilities || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
</ul>
</div>
`,
        )
        .join("");

      return `
<div class="job">
<div class="job-header">
<div>
<div class="job-title">
${escapeHtml(job.title)}
</div>
<div class="company">
${escapeHtml(job.company_name)}
</div>
</div>
<div class="date">
${escapeHtml(formatJobDate(job))}
</div>
</div>
${projects}
</div>
`;
    })
    .join("");

  return `
<section>
<div class="section-title">
Professional Experience
</div>
${jobs}
</section>
`;
}

function renderProjects(portfolios) {
  if (!portfolios?.length) return "";

  const cards = portfolios
    .map(
      (project) => `
<div class="project-card">
<h3 style="font-weight: 700;">${escapeHtml(project.name)}</h3>
<p style="font-size: 10px; color: #1E3A5F;">
<a href="${escapeHtml(project.repo_url)}" target="_blank">${escapeHtml(project.repo_url)}</a>
</p>
<p style="margin-top: 12px;">
${escapeHtml(project.description)}
</p>
</div>
`,
    )
    .join("");

  return `
<section>
<div class="section-title">
Projects
</div>
${cards}
</section>
`;
}

function renderEducation(education) {
  if (!education?.length) return "";

  const items = education
    .map((item) => {
      const program = item.program
        ? `<br>\n${escapeHtml(item.program)}`
        : "";
      const cgpa = item.latest_cgpa
        ? `<br>\n${escapeHtml(item.latest_cgpa)}`
        : "";

      return `
<div class="education-item">
<div>
<strong>${escapeHtml(item.school_name)}</strong>${program}${cgpa}
</div>
<div>
${escapeHtml(formatEducationDate(item))}
</div>
</div>
`;
    })
    .join("");

  return `
<section>
<div class="section-title">
Education
</div>
${items}
</section>
`;
}

function renderCertRow(name, url, credentialId) {
  const link = url
    ? `<a class="cert-link" style="font-size: 10px;" href="${escapeHtml(url)}" target="_blank">${credentialId}</a>`
    : credentialId
      ? `<span class="cert-link">${name}</span>`
      : "";

  return `<div class="cert-row"><span class="cert-name">${escapeHtml(name)}</span>${link}</div>`;
}

function renderCertifications(certificates) {
  if (!certificates?.length) return "";

  const groups = certificates
    .map((cert) => {
      const courseRows = (cert.courses || [])
        .map((course) =>
          renderCertRow(course.name, course.credential_url, course.credential_id),
        )
        .join("");

      return `<div class="cert-group"><div class="cert-group-title">${escapeHtml(cert.program)}</div>${courseRows}</div>`;
    })
    .join("");

  return `
<section>
<div class="section-title">Certifications</div>
${groups}
</section>
`;
}

export function generateCvHtml({
  profile,
  skills,
  experience,
  portfolios,
  education,
  certificates,
}) {
  return `
<style>
@page{
    size:A4;
    margin:18mm;
}

.cv-root *{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

.cv-root{
    font-family:'Inter',sans-serif;
    font-size:11pt;
    color:#222;
    line-height:1.6;
    background:white;
    text-align:left;
}

.cv-root .container{
    width:100%;
}

.cv-root header{
    padding-bottom:18px;
    margin-bottom:18px;
}

.cv-root header h1{
    font-size:32px;
    font-weight:800;
    letter-spacing:.5px;
}

.cv-root header h2{
    margin-top:4px;
    font-size:15px;
    color:#1E3A5F;
    font-weight:600;
}

.cv-root .contact{
    margin-top:15px;
    display:flex;
    flex-wrap:wrap;
    gap:20px;
    color:#555;
    font-size:10.5pt;
}

.cv-root section{
    margin-bottom:28px;
}

.cv-root .section-title{
    font-size:14px;
    text-transform:uppercase;
    font-weight:700;
    color:#1E3A5F;
    letter-spacing:1px;
    padding-bottom:6px;
    border-bottom:1px solid #d7d7d7;
    margin-bottom:14px;
}

.cv-root .summary{
    color:#444;
}

.cv-root .skills{
    display:grid;
    grid-template-columns:170px auto;
    row-gap:10px;
}

.cv-root .skill-title{
    font-weight:700;
}

.cv-root .skill-value{
    color:#444;
}

.cv-root .job{
    margin-bottom:24px;
}

.cv-root .job-header{
    display:flex;
    justify-content:space-between;
    align-items:flex-start;
    margin-bottom:4px;
}

.cv-root .job-title{
    font-size:14px;
    font-weight:700;
}

.cv-root .company{
    color:#1E3A5F;
    font-weight:600;
}

.cv-root .date{
    color:#666;
    font-size:10pt;
}

.cv-root .project{
    margin-top:12px;
    margin-left:18px;
}

ul{
  list-style-type:none;
}

li{
  list-style-type:none;
}

.cv-root .project h4{
    font-size:12px;
    margin-bottom:4px;
}

.cv-root ul{
    margin-left:18px;
    margin-top:8px;
    font-size: 12px;
}

.cv-root li{
    margin-bottom:5px;
}

.cv-root .tech{
    margin-top:10px;
    color:#666;
    font-size:10pt;
}

.cv-root .project-card{
    margin-bottom:18px;
}

.cv-root .project-card h3{
    font-size:12px;
    margin-bottom:6px;
}

.cv-root .education-item{
    display:flex;
    justify-content:space-between;
    margin-bottom:12px;
    font-size: 12px;
}

.project-card p{
  font-size: 12px;
}

.cv-root .cert-group{
    margin-bottom:16px;
    font-size:12px;
}

.cv-root .cert-group-title{
    font-weight:700;
    margin-bottom:6px;
}

.cv-root .cert-row{
    display:flex;
    justify-content:space-between;
    align-items:baseline;
    gap:16px;
    margin-bottom:4px;
}

.cv-root .cert-name{
    text-align:left;
    min-width:0;
}

.cv-root .cert-link{
    text-align:right;
    white-space:nowrap;
    flex-shrink:0;
    color:#1E3A5F;
    font-size:10pt;
    text-decoration:none;
}
</style>
<div class="cv-root">
<div class="container">
<header>
<h1>${escapeHtml(profile.name)}</h1>
<h2>${escapeHtml(profile.title)}</h2>
<div class="contact" style="font-size: 12px;">
<span><i class="fa-solid fa-location-dot"></i> ${escapeHtml(profile.location)}</span>
<span><i class="fa-solid fa-envelope"></i> ${escapeHtml(profile.email)}</span>
<span><i class="fa-solid fa-phone"></i> ${escapeHtml(profile.phone)}</span>
<span><i class="fa-solid fa-link"></i> ${escapeHtml(profile.linkedin)}</span>
<span><i class="fa-solid fa-link"></i> ${escapeHtml(profile.github)}</span>
</div>
</header>
<section>
<div class="section-title">
Summary
</div>
<div class="summary" style="font-size: 12px;">
${escapeHtml(profile.summary)}
</div>
</section>
${renderSkills(skills)}
${renderExperience(experience)}
${renderProjects(portfolios)}
${renderEducation(education)}
${renderCertifications(certificates)}
</div>
</div>
`;
}
