function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function field(name, label, value = "", { type = "text", required = false, placeholder = "" } = {}) {
  const req = required ? "required" : "";
  return `<label for="${name}">${escapeHtml(label)}</label>
<input id="${name}" name="${name}" type="${type}" value="${escapeHtml(value)}" placeholder="${escapeHtml(placeholder)}" ${req}>`;
}

function area(name, label, value = "", required = false) {
  const req = required ? "required" : "";
  return `<label for="${name}">${escapeHtml(label)}</label>
<textarea id="${name}" name="${name}" ${req}>${escapeHtml(value)}</textarea>`;
}

function pageTitle(icon, title) {
  return `<div class="page-title"><i class="${icon}"></i><h1>${escapeHtml(title)}</h1></div>`;
}

function layout(title, body, { loggedIn = false } = {}) {
  const centerNav = loggedIn
    ? `<nav class="center-nav">
  <a href="/admin">Home</a>
  <span class="sep"></span>
  <a href="/admin/skills">Skills</a>
  <span class="sep"></span>
  <a href="/admin/experience">Experience</a>
  <span class="sep"></span>
  <a href="/admin/portfolios">Portfolios</a>
  <span class="sep"></span>
  <a href="/admin/education">Education</a>
  <span class="sep"></span>
  <a href="/admin/certificates">Certificates</a>
</nav>`
    : "";

  const actions = loggedIn
    ? `<div class="top-actions">
  <button type="button" class="icon-btn" onclick="toggleTheme()" aria-label="Toggle theme"><i class="fa-solid fa-moon" id="theme-icon"></i></button>
  <form class="inline" method="post" action="/admin/logout"><button class="btn" type="submit">Log out</button></form>
</div>`
    : `<div class="top-actions">
  <button type="button" class="icon-btn" onclick="toggleTheme()" aria-label="Toggle theme"><i class="fa-solid fa-moon" id="theme-icon"></i></button>
</div>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<script src="https://kit.fontawesome.com/65176fe769.js" crossorigin="anonymous"></script>
<style>
@font-face { font-family: Avenir; src: url("/admin-assets/Avenir-Book.ttf") format("truetype"); font-weight: 400; }
@font-face { font-family: Avenir; src: url("/admin-assets/Avenir-Medium.ttf") format("truetype"); font-weight: 500; }
@font-face { font-family: Avenir; src: url("/admin-assets/Avenir-Heavy.ttf") format("truetype"); font-weight: 700; }
@font-face { font-family: Avenir; src: url("/admin-assets/Avenir-Black.ttf") format("truetype"); font-weight: 800; }

* { box-sizing: border-box; margin: 0; padding: 0; font-family: Avenir, sans-serif; }
html, body { min-height: 100%; }
body { background: #fff; color: #374151; }

.topbar {
  position: sticky; top: 0; z-index: 50;
  display: flex; justify-content: space-between; align-items: center;
  padding: 1.25rem 2rem; background: #fff; box-shadow: 0 1px 2px rgb(0 0 0 / 0.06);
}
.brand p { font-size: 0.75rem; }
.brand h1 { font-size: 1.25rem; font-weight: 700; }
.center-nav { position: absolute; left: 50%; transform: translateX(-50%); display: none; align-items: center; gap: 2rem; }
@media (min-width: 1024px) { .center-nav { display: flex; } }
.center-nav a { color: inherit; text-decoration: none; }
.center-nav a:hover { transform: translateY(1px); text-decoration: underline dotted; text-underline-offset: 4px; }
.sep { width: 0.5px; height: 1rem; background: rgb(55 65 81 / 0.5); }
.top-actions { display: flex; align-items: center; gap: 1rem; }

.shell { width: 91.666%; max-width: 1100px; margin: 0 auto; padding: 2.5rem 0 4rem; }
.page-title { display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2rem; }
.page-title i { font-size: 2.25rem; }
.page-title h1 { font-size: 2.25rem; font-weight: 700; }
.shell > h1 { font-size: 2.25rem; font-weight: 700; margin-bottom: 1.5rem; }
.lede { margin: 0 0 1.5rem; color: #4b5563; }

.card {
  border: 0.5px solid #6b7280; border-radius: 1rem; padding: 1.5rem 2.5rem;
  margin-bottom: 1.5rem; background: #fff;
  transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
}
.card:hover { transform: translateY(-2px); }
.row { display: flex; justify-content: space-between; gap: 1rem; align-items: center; flex-wrap: wrap; }
.row h2, .card h2 { font-size: 1.25rem; font-weight: 500; }
.muted { color: #6b7280; font-size: 0.95rem; }
.error { color: #b91c1c; margin: 0.75rem 0; }
.success { color: #047857; margin: 0.75rem 0; }

form.inline { display: inline; }
label { display: block; margin: 1rem 0 0.35rem; font-weight: 600; }
input[type="text"], textarea {
  width: 100%; padding: 0.65rem 0.85rem; border: 0.5px solid #6b7280; border-radius: 0.5rem; background: #fff; color: inherit;
}
textarea { min-height: 5.5rem; resize: vertical; }

.btn, button, a.button {
  display: inline-block; padding: 0.5rem 1rem; font-size: 0.875rem; border-radius: 0.375rem;
  border: 1px solid #1f2937; background: #fff; color: inherit; text-decoration: none; cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}
.btn:hover, button:hover, a.button:hover { background: #1f2937; color: #fff; }
.btn-solid, .actions button:last-child {
  background: #000; color: #fff; border-color: #000;
}
.btn-solid:hover, .actions button:last-child:hover { background: #1f2937; }
.icon-btn { padding: 0.5rem; line-height: 1; }
.actions { display: flex; gap: 0.75rem; margin-top: 1.25rem; flex-wrap: wrap; }
.add-link { display: inline-block; margin-bottom: 1.5rem; background: #000; color: #fff; border-color: #000; }
.add-link:hover { background: #1f2937; color: #fff; }

ul { margin: 0.75rem 0 0; padding-left: 1.15rem; }
li { margin: 0.25rem 0; }
table { width: 100%; border-collapse: collapse; margin-top: 0.75rem; }
th, td { text-align: left; padding: 0.65rem 0; border-bottom: 0.5px solid rgb(107 114 128 / 0.4); vertical-align: top; }

.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1.25rem; margin-top: 1.5rem; }
.grid a {
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1.25rem;
  min-height: 10rem; padding: 1.5rem 1rem; border: 0.5px solid #6b7280; border-radius: 0.75rem;
  text-decoration: none; color: inherit; font-size: 1.25rem; font-weight: 500;
  transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
}
.grid a i { font-size: 1.75rem; }
.grid a:hover { transform: translateY(-4px); background: #6b7280; color: #fff; border-color: #6b7280; }
.grid a .bar { width: 2.5rem; height: 0.25rem; border-radius: 999px; background: rgb(107 114 128 / 0.3); }

.auth-wrap { max-width: 28rem; margin: 2rem auto 0; }
.auth-wrap .card { padding: 2rem; }

.footer {
  margin-top: 3rem; padding: 2rem 2rem; background: #374151; color: #fff;
}
.footer p { font-size: 0.9rem; margin-bottom: 0.35rem; }
.footer h2 { font-size: 1.25rem; font-weight: 700; }

html.dark body, html.dark .card, html.dark .topbar { background: #111827; color: #fff; }
html.dark .topbar { box-shadow: 0 1px 2px rgb(0 0 0 / 0.4); }
html.dark .lede, html.dark .muted { color: #d1d5db; }
html.dark input[type="text"], html.dark textarea { background: #111827; border-color: #6b7280; color: #fff; }
html.dark .btn, html.dark button, html.dark a.button { border-color: #fff; }
html.dark .btn-solid, html.dark .actions button:last-child, html.dark .add-link { background: #fff; color: #111827; border-color: #fff; }
html.dark .grid a:hover { background: #4b5563; }
</style>
</head>
<body>
<header class="topbar">
  <div class="brand">
    <p>Hello World! My name is ...</p>
    <h1>Htet Aung (Daniel Hall)</h1>
  </div>
  ${centerNav}
  ${actions}
</header>
<main class="shell">
${body}
</main>
<footer class="footer">
  <p>Hello World! My name is ...</p>
  <h2>Htet Aung (Daniel Hall)</h2>
</footer>
<script>
(function () {
  var dark = localStorage.getItem("admin-theme") === "dark";
  document.documentElement.classList.toggle("dark", dark);
  var icon = document.getElementById("theme-icon");
  if (icon) icon.className = dark ? "fa-solid fa-sun" : "fa-solid fa-moon";
})();
function toggleTheme() {
  var next = !document.documentElement.classList.contains("dark");
  document.documentElement.classList.toggle("dark", next);
  localStorage.setItem("admin-theme", next ? "dark" : "light");
  var icon = document.getElementById("theme-icon");
  if (icon) icon.className = next ? "fa-solid fa-sun" : "fa-solid fa-moon";
}
</script>
</body>
</html>`;
}

const auth = { loggedIn: true };

export function gatePage({ error = "", message = "" } = {}) {
  return layout(
    "Admin",
    `<div class="auth-wrap">
<div class="card">
${pageTitle("fa-solid fa-lock", "Admin")}
<p class="lede">Click Send to receive a 6-digit code by email. It expires in 1 minute. Then enter it and click Continue.</p>
${error ? `<p class="error">${escapeHtml(error)}</p>` : ""}
${message ? `<p class="success">${escapeHtml(message)}</p>` : ""}
<form method="post">
  <label for="otp">OTP</label>
  <input id="otp" name="otp" type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="6" placeholder="000000">
  <div class="actions">
    <button type="submit" formaction="/admin/otp" formnovalidate>Send</button>
    <button type="submit" formaction="/admin/verify">Continue</button>
  </div>
</form>
</div>
</div>`,
    { loggedIn: false },
  );
}

export function hubPage() {
  return layout(
    "Admin",
    `${pageTitle("fa-solid fa-gauge-high", "Admin")}
<p class="lede">Choose a section to add, edit, or delete.</p>
<div class="grid">
  <a href="/admin/skills"><i class="fa-brands fa-buffer"></i>Skills<span class="bar"></span></a>
  <a href="/admin/experience"><i class="fa-solid fa-briefcase"></i>Experience<span class="bar"></span></a>
  <a href="/admin/portfolios"><i class="fa-solid fa-folder-open"></i>Portfolios<span class="bar"></span></a>
  <a href="/admin/education"><i class="fa-solid fa-graduation-cap"></i>Education<span class="bar"></span></a>
  <a href="/admin/certificates"><i class="fa-solid fa-certificate"></i>Certificates<span class="bar"></span></a>
</div>`,
    auth,
  );
}

export function skillsListPage(skills) {
  const cards = skills
    .map((skill) => {
      const tools = (skill.tools || [])
        .map((tool) => `<li>${escapeHtml(tool.name)}${tool.icon ? ` <span class="muted">(${escapeHtml(tool.icon)})</span>` : ""}</li>`)
        .join("");
      return `<article class="card">
<div class="row">
  <h2>${escapeHtml(skill.name)}</h2>
  <div>
    <a class="button" href="/admin/skills/${skill.id}/edit">Edit</a>
    <form class="inline" method="post" action="/admin/skills/${skill.id}/delete" onsubmit="return confirm('Delete this skill category?');">
      <button type="submit">Delete</button>
    </form>
  </div>
</div>
<ul>${tools || '<li class="muted">No tools</li>'}</ul>
</article>`;
    })
    .join("");

  return layout(
    "Skills admin",
    `${pageTitle("fa-brands fa-buffer", "Skills")}
<p><a class="btn add-link" href="/admin/skills/new">Add skill category</a></p>
${cards || '<p class="muted">No skill categories yet.</p>'}`,
    auth,
  );
}

export function skillNewPage() {
  return layout(
    "New skill",
    `<h1>New skill category</h1>
<form method="post" action="/admin/skills">
  ${field("name", "Name", "", { required: true })}
  <div class="actions"><button type="submit">Create</button></div>
</form>`,
    auth,
  );
}

export function skillEditPage(skill) {
  const rows = (skill.tools || [])
    .map(
      (tool, index) => `<tr>
  <td>${escapeHtml(tool.name)}</td>
  <td class="muted">${escapeHtml(tool.icon)}</td>
  <td>
    <form class="inline" method="post" action="/admin/skills/${skill.id}/tools/${index}/delete">
      <button type="submit">Delete</button>
    </form>
  </td>
</tr>`,
    )
    .join("");

  return layout(
    `Edit ${skill.name}`,
    `<h1>Edit skill category</h1>
<form method="post" action="/admin/skills/${skill.id}">
  ${field("name", "Name", skill.name, { required: true })}
  <div class="actions"><button type="submit">Save name</button></div>
</form>
<h2>Tools</h2>
<table>
  <thead><tr><th>Name</th><th>Icon</th><th></th></tr></thead>
  <tbody>${rows || `<tr><td colspan="3" class="muted">No tools yet.</td></tr>`}</tbody>
</table>
<form method="post" action="/admin/skills/${skill.id}/tools">
  ${field("name", "Tool name", "", { required: true })}
  ${field("icon", "Icon class", "", { placeholder: "fa-brands fa-react" })}
  <div class="actions"><button type="submit">Add tool</button></div>
</form>`,
    auth,
  );
}

export function portfoliosListPage(items) {
  const cards = items
    .map(
      (item) => `<article class="card">
<div class="row">
  <h2>${escapeHtml(item.name)}</h2>
  <div>
    <a class="button" href="/admin/portfolios/${item.id}/edit">Edit</a>
    <form class="inline" method="post" action="/admin/portfolios/${item.id}/delete" onsubmit="return confirm('Delete this portfolio?');">
      <button type="submit">Delete</button>
    </form>
  </div>
</div>
<p class="muted">${escapeHtml(item.description)}</p>
</article>`,
    )
    .join("");

  return layout(
    "Portfolios admin",
    `${pageTitle("fa-solid fa-folder-open", "Portfolios")}
<p><a class="btn add-link" href="/admin/portfolios/new">Add portfolio</a></p>
${cards || '<p class="muted">No portfolios yet.</p>'}`,
    auth,
  );
}

function portfolioForm(action, item = {}) {
  return `<form method="post" action="${action}">
  ${field("name", "Name", item.name, { required: true })}
  ${area("description", "Description", item.description, true)}
  ${field("repo_url", "Repo URL", item.repo_url)}
  ${field("site_url", "Site URL", item.site_url)}
  ${field("img_url", "Image URL", item.img_url)}
  <div class="actions"><button type="submit">Save</button></div>
</form>`;
}

export function portfolioNewPage() {
  return layout("New portfolio", `<h1>New portfolio</h1>${portfolioForm("/admin/portfolios")}`, auth);
}

export function portfolioEditPage(item) {
  return layout(
    `Edit ${item.name}`,
    `<h1>Edit portfolio</h1>${portfolioForm(`/admin/portfolios/${item.id}`, item)}`,
    auth,
  );
}

export function educationListPage(items) {
  const cards = items
    .map(
      (item) => `<article class="card">
<div class="row">
  <h2>${escapeHtml(item.school_name)}</h2>
  <div>
    <a class="button" href="/admin/education/${item.id}/edit">Edit</a>
    <form class="inline" method="post" action="/admin/education/${item.id}/delete" onsubmit="return confirm('Delete this education entry?');">
      <button type="submit">Delete</button>
    </form>
  </div>
</div>
<p class="muted">${escapeHtml(item.program)} · ${escapeHtml(item.status)}</p>
</article>`,
    )
    .join("");

  return layout(
    "Education admin",
    `${pageTitle("fa-solid fa-graduation-cap", "Education")}
<p><a class="btn add-link" href="/admin/education/new">Add education</a></p>
${cards || '<p class="muted">No education entries yet.</p>'}`,
    auth,
  );
}

function educationForm(action, item = {}) {
  return `<form method="post" action="${action}">
  ${field("school_name", "School name", item.school_name, { required: true })}
  ${field("program", "Program", item.program)}
  ${field("status", "Status", item.status, { placeholder: "Ongoing, Finished, Unfinished" })}
  ${field("start_date", "Start date", item.start_date)}
  ${field("end_date", "End date", item.end_date)}
  ${field("date", "Single date", item.date)}
  ${field("latest_cgpa", "Latest CGPA", item.latest_cgpa)}
  ${field("transcript_url", "Transcript URL", item.transcript_url)}
  ${field("url", "URL", item.url)}
  <div class="actions"><button type="submit">Save</button></div>
</form>`;
}

function isFlatTranscript(transcript) {
  const values = Object.values(transcript || {});
  if (!values.length) return false;
  return values.every((value) => value === null || typeof value !== "object");
}

function courseRows(courses, deleteAction) {
  const entries = Object.entries(courses || {});
  if (!entries.length) {
    return `<p class="muted">No courses yet.</p>`;
  }
  const rows = entries
    .map(
      ([name, grade]) => `<tr>
  <td>${escapeHtml(name)}</td>
  <td>${escapeHtml(grade)}</td>
  <td>
    <form class="inline" method="post" action="${deleteAction}">
      <input type="hidden" name="name" value="${escapeHtml(name)}">
      <button type="submit">Delete</button>
    </form>
  </td>
</tr>`,
    )
    .join("");
  return `<table>
  <thead><tr><th>Course</th><th>Grade</th><th></th></tr></thead>
  <tbody>${rows}</tbody>
</table>`;
}

export function educationNewPage() {
  return layout("New education", `<h1>New education</h1>${educationForm("/admin/education")}`, auth);
}

export function educationEditPage(item) {
  const transcript = item.transcript && typeof item.transcript === "object" ? item.transcript : {};
  const id = item.id;
  const flat = isFlatTranscript(transcript);

  let transcriptHtml = "";
  if (flat) {
    transcriptHtml = `<h2>Courses and grades</h2>
${courseRows(transcript, `/admin/education/${id}/courses/delete`)}
<form method="post" action="/admin/education/${id}/courses">
  ${field("name", "Course name", "", { required: true })}
  ${field("grade", "Grade", "", { required: true })}
  <div class="actions"><button type="submit">Add course</button></div>
</form>
<p class="muted">This record uses a flat course list (no years/terms).</p>`;
  } else {
    const years = Object.entries(transcript)
      .map(([yearKey, terms]) => {
        const termCards = Object.entries(terms && typeof terms === "object" ? terms : {})
          .map(([termKey, courses]) => `<article class="card">
<div class="row">
  <h2>${escapeHtml(termKey.replace(/_/g, " "))}</h2>
  <form class="inline" method="post" action="/admin/education/${id}/years/${encodeURIComponent(yearKey)}/terms/${encodeURIComponent(termKey)}/delete" onsubmit="return confirm('Delete this term?');">
    <button type="submit">Delete term</button>
  </form>
</div>
${courseRows(courses, `/admin/education/${id}/years/${encodeURIComponent(yearKey)}/terms/${encodeURIComponent(termKey)}/courses/delete`)}
<form method="post" action="/admin/education/${id}/years/${encodeURIComponent(yearKey)}/terms/${encodeURIComponent(termKey)}/courses">
  ${field("name", "Course name", "", { required: true })}
  ${field("grade", "Grade", "", { required: true, placeholder: "4 or 2.67" })}
  <div class="actions"><button type="submit">Add course</button></div>
</form>
</article>`)
          .join("");

        return `<article class="card">
<div class="row">
  <h2>${escapeHtml(yearKey.replace(/_/g, " "))}</h2>
  <form class="inline" method="post" action="/admin/education/${id}/years/${encodeURIComponent(yearKey)}/delete" onsubmit="return confirm('Delete this year and its terms?');">
    <button type="submit">Delete year</button>
  </form>
</div>
${termCards || '<p class="muted">No terms yet.</p>'}
<form method="post" action="/admin/education/${id}/years/${encodeURIComponent(yearKey)}/terms">
  ${field("key", "Term key", "", { required: true, placeholder: "term_1 or semester_1" })}
  <div class="actions"><button type="submit">Add term</button></div>
</form>
</article>`;
      })
      .join("");

    transcriptHtml = `<h2>Years, terms, and grades</h2>
${years || '<p class="muted">No years yet.</p>'}
<form method="post" action="/admin/education/${id}/years">
  ${field("key", "Year key", "", { required: true, placeholder: "year_1" })}
  <div class="actions"><button type="submit">Add year</button></div>
</form>`;
  }

  return layout(
    `Edit ${item.school_name}`,
    `<h1>Edit education</h1>
${educationForm(`/admin/education/${item.id}`, item)}
${transcriptHtml}`,
    auth,
  );
}

export function experienceListPage(items) {
  const cards = items
    .map(
      (item) => `<article class="card">
<div class="row">
  <h2>${escapeHtml(item.title)} at ${escapeHtml(item.company_name)}</h2>
  <div>
    <a class="button" href="/admin/experience/${item.id}/edit">Edit</a>
    <form class="inline" method="post" action="/admin/experience/${item.id}/delete" onsubmit="return confirm('Delete this job?');">
      <button type="submit">Delete</button>
    </form>
  </div>
</div>
<p class="muted">${escapeHtml(item.start_date)} – ${escapeHtml(item.end_date || "Present")} · ${escapeHtml(item.status)}</p>
</article>`,
    )
    .join("");

  return layout(
    "Experience admin",
    `${pageTitle("fa-solid fa-briefcase", "Experience")}
<p><a class="btn add-link" href="/admin/experience/new">Add job</a></p>
${cards || '<p class="muted">No jobs yet.</p>'}`,
    auth,
  );
}

export function experienceNewPage() {
  return layout(
    "New job",
    `<h1>New job</h1>
<form method="post" action="/admin/experience">
  ${field("title", "Title", "", { required: true })}
  ${field("company_name", "Company", "", { required: true })}
  ${field("company_url", "Company URL")}
  ${field("start_date", "Start date")}
  ${field("end_date", "End date")}
  ${field("status", "Status", "Employed", { placeholder: "Employed, Resigned" })}
  ${field("tech_stack", "Tech stack", "", { placeholder: "React, Node.js, Linux" })}
  <div class="actions"><button type="submit">Create</button></div>
</form>`,
    auth,
  );
}

export function experienceEditPage(job) {
  const projects = (job.projects || [])
    .map((project, projectIndex) => {
      const responsibilities = (project.responsibilities || [])
        .map(
          (line, lineIndex) => `<li class="row">
  <span>${escapeHtml(line)}</span>
  <form class="inline" method="post" action="/admin/experience/${job.id}/projects/${projectIndex}/responsibilities/${lineIndex}/delete">
    <button type="submit">Delete</button>
  </form>
</li>`,
        )
        .join("");
      return `<article class="card">
<div class="row">
  <h2>${escapeHtml(project.name)}</h2>
  <form class="inline" method="post" action="/admin/experience/${job.id}/projects/${projectIndex}/delete" onsubmit="return confirm('Delete this project?');">
    <button type="submit">Delete project</button>
  </form>
</div>
<p class="muted">${escapeHtml(project.role)} · ${escapeHtml(project.from)} – ${escapeHtml(project.to)} · ${escapeHtml(project.work_mode)}</p>
<ul>${responsibilities || '<li class="muted">No responsibilities</li>'}</ul>
<form method="post" action="/admin/experience/${job.id}/projects/${projectIndex}/responsibilities">
  ${area("text", "Add responsibility")}
  <div class="actions"><button type="submit">Add responsibility</button></div>
</form>
</article>`;
    })
    .join("");

  return layout(
    `Edit ${job.title}`,
    `<h1>Edit job</h1>
<form method="post" action="/admin/experience/${job.id}">
  ${field("title", "Title", job.title, { required: true })}
  ${field("company_name", "Company", job.company_name, { required: true })}
  ${field("company_url", "Company URL", job.company_url)}
  ${field("start_date", "Start date", job.start_date)}
  ${field("end_date", "End date", job.end_date)}
  ${field("status", "Status", job.status)}
  ${field("tech_stack", "Tech stack", (job.tech_stack || []).join(", "))}
  <div class="actions"><button type="submit">Save job</button></div>
</form>
<h2>Projects</h2>
${projects || '<p class="muted">No projects yet.</p>'}
<form method="post" action="/admin/experience/${job.id}/projects">
  <h2>Add project</h2>
  ${field("name", "Name", "", { required: true })}
  ${field("from", "From")}
  ${field("to", "To")}
  ${field("role", "Role")}
  ${field("work_mode", "Work mode")}
  <div class="actions"><button type="submit">Add project</button></div>
</form>`,
    auth,
  );
}

export function certificatesListPage(items) {
  const cards = items
    .map(
      (item) => `<article class="card">
<div class="row">
  <h2>${escapeHtml(item.program)}</h2>
  <div>
    <a class="button" href="/admin/certificates/${item.id}/edit">Edit</a>
    <form class="inline" method="post" action="/admin/certificates/${item.id}/delete" onsubmit="return confirm('Delete this certificate?');">
      <button type="submit">Delete</button>
    </form>
  </div>
</div>
<p class="muted">${(item.courses || []).length} courses</p>
</article>`,
    )
    .join("");

  return layout(
    "Certificates admin",
    `${pageTitle("fa-solid fa-certificate", "Certificates")}
<p><a class="btn add-link" href="/admin/certificates/new">Add certificate</a></p>
${cards || '<p class="muted">No certificates yet.</p>'}`,
    auth,
  );
}

export function certificateNewPage() {
  return layout(
    "New certificate",
    `<h1>New certificate</h1>
<form method="post" action="/admin/certificates">
  ${field("program", "Program", "", { required: true })}
  ${field("credential_url", "Credential URL")}
  ${field("credential_id", "Credential ID")}
  ${field("image_url", "Image URL")}
  ${field("skill_set", "Skill set", "", { placeholder: "Python, Git, Linux" })}
  <div class="actions"><button type="submit">Create</button></div>
</form>`,
    auth,
  );
}

export function certificateEditPage(item) {
  const rows = (item.courses || [])
    .map(
      (course, index) => `<tr>
  <td>${escapeHtml(course.name)}</td>
  <td class="muted">${escapeHtml(course.credential_id)}</td>
  <td>
    <form class="inline" method="post" action="/admin/certificates/${item.id}/courses/${index}/delete">
      <button type="submit">Delete</button>
    </form>
  </td>
</tr>`,
    )
    .join("");

  return layout(
    `Edit ${item.program}`,
    `<h1>Edit certificate</h1>
<form method="post" action="/admin/certificates/${item.id}">
  ${field("program", "Program", item.program, { required: true })}
  ${field("credential_url", "Credential URL", item.credential_url)}
  ${field("credential_id", "Credential ID", item.credential_id)}
  ${field("image_url", "Image URL", item.image_url)}
  ${field("skill_set", "Skill set", (item.skill_set || []).join(", "))}
  <div class="actions"><button type="submit">Save</button></div>
</form>
<h2>Courses</h2>
<table>
  <thead><tr><th>Name</th><th>Credential ID</th><th></th></tr></thead>
  <tbody>${rows || `<tr><td colspan="3" class="muted">No courses yet.</td></tr>`}</tbody>
</table>
<form method="post" action="/admin/certificates/${item.id}/courses">
  ${field("name", "Course name", "", { required: true })}
  ${field("credential_url", "Credential URL")}
  ${field("credential_id", "Credential ID")}
  <div class="actions"><button type="submit">Add course</button></div>
</form>`,
    auth,
  );
}

export function notFoundPage(message, loggedIn = false) {
  return layout("Not found", `<h1>Not found</h1><p>${escapeHtml(message)}</p>`, { loggedIn });
}
