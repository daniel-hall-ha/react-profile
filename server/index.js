import "dotenv/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import session from "express-session";
import * as store from "./dataStore.js";
import { issueOtp, verifyOtp } from "./otp.js";
import { sendOtpEmail } from "./mailer.js";
import {
  certificateEditPage,
  certificateNewPage,
  certificatesListPage,
  educationEditPage,
  educationListPage,
  educationNewPage,
  experienceEditPage,
  experienceListPage,
  experienceNewPage,
  gatePage,
  hubPage,
  notFoundPage,
  portfolioEditPage,
  portfolioNewPage,
  portfoliosListPage,
  skillEditPage,
  skillNewPage,
  skillsListPage,
} from "./views.js";

const PORT = Number(process.env.PORT) || 3001;
const app = express();
const projectRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
app.use("/admin-assets", express.static(path.join(projectRoot, "src/assets/fonts")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    name: "admin.sid",
    secret: process.env.SESSION_SECRET || "dev-session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 8 * 60 * 60 * 1000,
    },
  }),
);

function asyncHandler(handler) {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}

function findById(items, id) {
  return items.find((item) => String(item.id) === String(id));
}

function parseList(value) {
  return String(value || "")
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

function text(body, key) {
  return String(body[key] ?? "").trim();
}

function isOpenAdmin(req) {
  const url = req.originalUrl.split("?")[0].replace(/\/$/, "") || "/";
  if (req.method === "GET" && (url === "/admin" || url === "/admin/")) return true;
  if (req.method === "POST" && (url === "/admin/otp" || url === "/admin/verify" || url === "/admin/logout")) {
    return true;
  }
  return false;
}

app.use("/admin", (req, res, next) => {
  if (isOpenAdmin(req) || req.session?.admin) {
    next();
    return;
  }
  res.redirect(303, "/admin");
});

app.get(
  "/api/:resource",
  asyncHandler(async (req, res) => {
    if (!store.isResource(req.params.resource)) {
      res.status(404).json({ error: "Unknown resource" });
      return;
    }
    res.json(await store.read(req.params.resource));
  }),
);

function adminHome(req, res) {
  if (req.session?.admin) {
    res.type("html").send(hubPage());
    return;
  }
  res.type("html").send(gatePage());
}

app.get("/admin", adminHome);

app.post(
  "/admin/otp",
  asyncHandler(async (req, res) => {
    try {
      const code = issueOtp();
      await sendOtpEmail(code);
      res.type("html").send(gatePage({ message: "OTP sent. Check your email and continue within 1 minute." }));
    } catch (error) {
      console.error(error);
      res.status(500).type("html").send(
        gatePage({ error: error.message || "Could not send OTP. Check SMTP settings." }),
      );
    }
  }),
);

app.post("/admin/verify", (req, res) => {
  if (!verifyOtp(req.body.otp)) {
    res.status(400).type("html").send(gatePage({ error: "Invalid or expired OTP." }));
    return;
  }
  req.session.admin = true;
  res.redirect(303, "/admin");
});

app.post("/admin/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect(303, "/admin");
  });
});

function missing(res, message) {
  res.status(404).type("html").send(notFoundPage(message, true));
}

function badRequest(res, message) {
  res.status(400).type("html").send(notFoundPage(message, true));
}

app.get(
  "/admin/skills",
  asyncHandler(async (_req, res) => {
    res.type("html").send(skillsListPage(await store.read("skills")));
  }),
);

app.get("/admin/skills/new", (_req, res) => {
  res.type("html").send(skillNewPage());
});

app.get(
  "/admin/skills/:id/edit",
  asyncHandler(async (req, res) => {
    const skills = await store.read("skills");
    const skill = findById(skills, req.params.id);
    if (!skill) {
      missing(res, "Skill category not found.");
      return;
    }
    res.type("html").send(skillEditPage(skill));
  }),
);

app.post(
  "/admin/skills",
  asyncHandler(async (req, res) => {
    const name = text(req.body, "name");
    if (!name) {
      badRequest(res, "Name is required.");
      return;
    }
    const skills = await store.read("skills");
    skills.push({ id: store.nextId(skills), name, tools: [] });
    await store.write("skills", skills);
    res.redirect(303, "/admin/skills");
  }),
);

app.post(
  "/admin/skills/:id/delete",
  asyncHandler(async (req, res) => {
    const skills = await store.read("skills");
    await store.write(
      "skills",
      skills.filter((skill) => String(skill.id) !== String(req.params.id)),
    );
    res.redirect(303, "/admin/skills");
  }),
);

app.post(
  "/admin/skills/:id/tools/:index/delete",
  asyncHandler(async (req, res) => {
    const skills = await store.read("skills");
    const skill = findById(skills, req.params.id);
    if (!skill) {
      missing(res, "Skill category not found.");
      return;
    }
    const index = Number(req.params.index);
    skill.tools = (skill.tools || []).filter((_, toolIndex) => toolIndex !== index);
    await store.write("skills", skills);
    res.redirect(303, `/admin/skills/${skill.id}/edit`);
  }),
);

app.post(
  "/admin/skills/:id/tools",
  asyncHandler(async (req, res) => {
    const skills = await store.read("skills");
    const skill = findById(skills, req.params.id);
    if (!skill) {
      missing(res, "Skill category not found.");
      return;
    }
    const name = text(req.body, "name");
    if (!name) {
      badRequest(res, "Tool name is required.");
      return;
    }
    skill.tools = skill.tools || [];
    skill.tools.push({ name, icon: text(req.body, "icon") });
    await store.write("skills", skills);
    res.redirect(303, `/admin/skills/${skill.id}/edit`);
  }),
);

app.post(
  "/admin/skills/:id",
  asyncHandler(async (req, res) => {
    const skills = await store.read("skills");
    const skill = findById(skills, req.params.id);
    if (!skill) {
      missing(res, "Skill category not found.");
      return;
    }
    const name = text(req.body, "name");
    if (!name) {
      badRequest(res, "Name is required.");
      return;
    }
    skill.name = name;
    await store.write("skills", skills);
    res.redirect(303, `/admin/skills/${skill.id}/edit`);
  }),
);

app.get(
  "/admin/portfolios",
  asyncHandler(async (_req, res) => {
    res.type("html").send(portfoliosListPage(await store.read("portfolios")));
  }),
);

app.get("/admin/portfolios/new", (_req, res) => {
  res.type("html").send(portfolioNewPage());
});

app.get(
  "/admin/portfolios/:id/edit",
  asyncHandler(async (req, res) => {
    const items = await store.read("portfolios");
    const item = findById(items, req.params.id);
    if (!item) {
      missing(res, "Portfolio not found.");
      return;
    }
    res.type("html").send(portfolioEditPage(item));
  }),
);

app.post(
  "/admin/portfolios",
  asyncHandler(async (req, res) => {
    const name = text(req.body, "name");
    if (!name) {
      badRequest(res, "Name is required.");
      return;
    }
    const items = await store.read("portfolios");
    items.push({
      id: store.nextId(items),
      name,
      description: text(req.body, "description"),
      repo_url: text(req.body, "repo_url"),
      site_url: text(req.body, "site_url"),
      img_url: text(req.body, "img_url"),
    });
    await store.write("portfolios", items);
    res.redirect(303, "/admin/portfolios");
  }),
);

app.post(
  "/admin/portfolios/:id/delete",
  asyncHandler(async (req, res) => {
    const items = await store.read("portfolios");
    await store.write(
      "portfolios",
      items.filter((item) => String(item.id) !== String(req.params.id)),
    );
    res.redirect(303, "/admin/portfolios");
  }),
);

app.post(
  "/admin/portfolios/:id",
  asyncHandler(async (req, res) => {
    const items = await store.read("portfolios");
    const item = findById(items, req.params.id);
    if (!item) {
      missing(res, "Portfolio not found.");
      return;
    }
    const name = text(req.body, "name");
    if (!name) {
      badRequest(res, "Name is required.");
      return;
    }
    Object.assign(item, {
      name,
      description: text(req.body, "description"),
      repo_url: text(req.body, "repo_url"),
      site_url: text(req.body, "site_url"),
      img_url: text(req.body, "img_url"),
    });
    await store.write("portfolios", items);
    res.redirect(303, "/admin/portfolios");
  }),
);

app.get(
  "/admin/education",
  asyncHandler(async (_req, res) => {
    res.type("html").send(educationListPage(await store.read("education")));
  }),
);

app.get("/admin/education/new", (_req, res) => {
  res.type("html").send(educationNewPage());
});

app.get(
  "/admin/education/:id/edit",
  asyncHandler(async (req, res) => {
    const items = await store.read("education");
    const item = findById(items, req.params.id);
    if (!item) {
      missing(res, "Education entry not found.");
      return;
    }
    res.type("html").send(educationEditPage(item));
  }),
);

function educationFields(body) {
  return {
    school_name: text(body, "school_name"),
    program: text(body, "program"),
    status: text(body, "status"),
    start_date: text(body, "start_date"),
    end_date: text(body, "end_date"),
    date: text(body, "date"),
    latest_cgpa: text(body, "latest_cgpa"),
    transcript_url: text(body, "transcript_url"),
    url: text(body, "url"),
  };
}

function slugKey(input, fallback) {
  const slug = String(input || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
  return slug || fallback;
}

function parseGrade(value) {
  const raw = String(value ?? "").trim();
  if (raw === "") return "";
  const numeric = Number(raw);
  return Number.isFinite(numeric) ? numeric : raw;
}

function ensureTranscript(item) {
  if (!item.transcript || typeof item.transcript !== "object" || Array.isArray(item.transcript)) {
    item.transcript = {};
  }
  return item.transcript;
}

function educationEditRedirect(res, id) {
  res.redirect(303, `/admin/education/${id}/edit`);
}

app.post(
  "/admin/education",
  asyncHandler(async (req, res) => {
    const fields = educationFields(req.body);
    if (!fields.school_name) {
      badRequest(res, "School name is required.");
      return;
    }
    const items = await store.read("education");
    const created = { id: store.nextId(items), ...fields, transcript: {} };
    items.push(created);
    await store.write("education", items);
    educationEditRedirect(res, created.id);
  }),
);

app.post(
  "/admin/education/:id/delete",
  asyncHandler(async (req, res) => {
    const items = await store.read("education");
    await store.write(
      "education",
      items.filter((item) => String(item.id) !== String(req.params.id)),
    );
    res.redirect(303, "/admin/education");
  }),
);

app.post(
  "/admin/education/:id/years/:yearKey/terms/:termKey/courses/delete",
  asyncHandler(async (req, res) => {
    const items = await store.read("education");
    const item = findById(items, req.params.id);
    if (!item) {
      missing(res, "Education entry not found.");
      return;
    }
    const transcript = ensureTranscript(item);
    const year = transcript[req.params.yearKey];
    const term = year?.[req.params.termKey];
    if (!term || typeof term !== "object") {
      missing(res, "Term not found.");
      return;
    }
    delete term[text(req.body, "name")];
    await store.write("education", items);
    educationEditRedirect(res, item.id);
  }),
);

app.post(
  "/admin/education/:id/years/:yearKey/terms/:termKey/courses",
  asyncHandler(async (req, res) => {
    const items = await store.read("education");
    const item = findById(items, req.params.id);
    if (!item) {
      missing(res, "Education entry not found.");
      return;
    }
    const transcript = ensureTranscript(item);
    const year = transcript[req.params.yearKey];
    if (!year || typeof year !== "object") {
      missing(res, "Year not found.");
      return;
    }
    const termKey = req.params.termKey;
    if (!year[termKey] || typeof year[termKey] !== "object") {
      missing(res, "Term not found.");
      return;
    }
    const name = text(req.body, "name");
    if (!name) {
      badRequest(res, "Course name is required.");
      return;
    }
    year[termKey][name] = parseGrade(req.body.grade);
    await store.write("education", items);
    educationEditRedirect(res, item.id);
  }),
);

app.post(
  "/admin/education/:id/years/:yearKey/terms/:termKey/delete",
  asyncHandler(async (req, res) => {
    const items = await store.read("education");
    const item = findById(items, req.params.id);
    if (!item) {
      missing(res, "Education entry not found.");
      return;
    }
    const transcript = ensureTranscript(item);
    const year = transcript[req.params.yearKey];
    if (!year || typeof year !== "object") {
      missing(res, "Year not found.");
      return;
    }
    delete year[req.params.termKey];
    await store.write("education", items);
    educationEditRedirect(res, item.id);
  }),
);

app.post(
  "/admin/education/:id/years/:yearKey/terms",
  asyncHandler(async (req, res) => {
    const items = await store.read("education");
    const item = findById(items, req.params.id);
    if (!item) {
      missing(res, "Education entry not found.");
      return;
    }
    const transcript = ensureTranscript(item);
    const yearKey = req.params.yearKey;
    if (!transcript[yearKey] || typeof transcript[yearKey] !== "object") {
      missing(res, "Year not found.");
      return;
    }
    const termKey = slugKey(req.body.key, "term_1");
    if (!transcript[yearKey][termKey]) {
      transcript[yearKey][termKey] = {};
    }
    await store.write("education", items);
    educationEditRedirect(res, item.id);
  }),
);

app.post(
  "/admin/education/:id/years/:yearKey/delete",
  asyncHandler(async (req, res) => {
    const items = await store.read("education");
    const item = findById(items, req.params.id);
    if (!item) {
      missing(res, "Education entry not found.");
      return;
    }
    const transcript = ensureTranscript(item);
    delete transcript[req.params.yearKey];
    await store.write("education", items);
    educationEditRedirect(res, item.id);
  }),
);

app.post(
  "/admin/education/:id/years",
  asyncHandler(async (req, res) => {
    const items = await store.read("education");
    const item = findById(items, req.params.id);
    if (!item) {
      missing(res, "Education entry not found.");
      return;
    }
    const transcript = ensureTranscript(item);
    const yearKey = slugKey(req.body.key, "year_1");
    if (!transcript[yearKey]) {
      transcript[yearKey] = {};
    }
    await store.write("education", items);
    educationEditRedirect(res, item.id);
  }),
);

app.post(
  "/admin/education/:id/courses/delete",
  asyncHandler(async (req, res) => {
    const items = await store.read("education");
    const item = findById(items, req.params.id);
    if (!item) {
      missing(res, "Education entry not found.");
      return;
    }
    const transcript = ensureTranscript(item);
    delete transcript[text(req.body, "name")];
    await store.write("education", items);
    educationEditRedirect(res, item.id);
  }),
);

app.post(
  "/admin/education/:id/courses",
  asyncHandler(async (req, res) => {
    const items = await store.read("education");
    const item = findById(items, req.params.id);
    if (!item) {
      missing(res, "Education entry not found.");
      return;
    }
    const name = text(req.body, "name");
    if (!name) {
      badRequest(res, "Course name is required.");
      return;
    }
    const transcript = ensureTranscript(item);
    transcript[name] = parseGrade(req.body.grade);
    await store.write("education", items);
    educationEditRedirect(res, item.id);
  }),
);

app.post(
  "/admin/education/:id",
  asyncHandler(async (req, res) => {
    const items = await store.read("education");
    const item = findById(items, req.params.id);
    if (!item) {
      missing(res, "Education entry not found.");
      return;
    }
    const fields = educationFields(req.body);
    if (!fields.school_name) {
      badRequest(res, "School name is required.");
      return;
    }
    Object.assign(item, fields);
    await store.write("education", items);
    educationEditRedirect(res, item.id);
  }),
);

app.get(
  "/admin/experience",
  asyncHandler(async (_req, res) => {
    res.type("html").send(experienceListPage(await store.read("experience")));
  }),
);

app.get("/admin/experience/new", (_req, res) => {
  res.type("html").send(experienceNewPage());
});

app.get(
  "/admin/experience/:id/edit",
  asyncHandler(async (req, res) => {
    const items = await store.read("experience");
    const job = findById(items, req.params.id);
    if (!job) {
      missing(res, "Job not found.");
      return;
    }
    res.type("html").send(experienceEditPage(job));
  }),
);

function jobFields(body) {
  return {
    title: text(body, "title"),
    company_name: text(body, "company_name"),
    company_url: text(body, "company_url"),
    start_date: text(body, "start_date"),
    end_date: text(body, "end_date"),
    status: text(body, "status"),
    tech_stack: parseList(body.tech_stack),
  };
}

app.post(
  "/admin/experience",
  asyncHandler(async (req, res) => {
    const fields = jobFields(req.body);
    if (!fields.title || !fields.company_name) {
      badRequest(res, "Title and company are required.");
      return;
    }
    const items = await store.read("experience");
    items.push({ id: store.nextId(items), ...fields, projects: [] });
    await store.write("experience", items);
    res.redirect(303, "/admin/experience");
  }),
);

app.post(
  "/admin/experience/:id/delete",
  asyncHandler(async (req, res) => {
    const items = await store.read("experience");
    await store.write(
      "experience",
      items.filter((item) => String(item.id) !== String(req.params.id)),
    );
    res.redirect(303, "/admin/experience");
  }),
);

app.post(
  "/admin/experience/:id/projects/:projectIndex/responsibilities/:lineIndex/delete",
  asyncHandler(async (req, res) => {
    const items = await store.read("experience");
    const job = findById(items, req.params.id);
    const project = job?.projects?.[Number(req.params.projectIndex)];
    if (!project) {
      missing(res, "Project not found.");
      return;
    }
    const lineIndex = Number(req.params.lineIndex);
    project.responsibilities = (project.responsibilities || []).filter((_, index) => index !== lineIndex);
    await store.write("experience", items);
    res.redirect(303, `/admin/experience/${job.id}/edit`);
  }),
);

app.post(
  "/admin/experience/:id/projects/:projectIndex/responsibilities",
  asyncHandler(async (req, res) => {
    const items = await store.read("experience");
    const job = findById(items, req.params.id);
    const project = job?.projects?.[Number(req.params.projectIndex)];
    if (!project) {
      missing(res, "Project not found.");
      return;
    }
    const line = text(req.body, "text");
    if (!line) {
      badRequest(res, "Responsibility is required.");
      return;
    }
    project.responsibilities = project.responsibilities || [];
    project.responsibilities.push(line);
    await store.write("experience", items);
    res.redirect(303, `/admin/experience/${job.id}/edit`);
  }),
);

app.post(
  "/admin/experience/:id/projects/:projectIndex/delete",
  asyncHandler(async (req, res) => {
    const items = await store.read("experience");
    const job = findById(items, req.params.id);
    if (!job) {
      missing(res, "Job not found.");
      return;
    }
    const projectIndex = Number(req.params.projectIndex);
    job.projects = (job.projects || []).filter((_, index) => index !== projectIndex);
    await store.write("experience", items);
    res.redirect(303, `/admin/experience/${job.id}/edit`);
  }),
);

app.post(
  "/admin/experience/:id/projects",
  asyncHandler(async (req, res) => {
    const items = await store.read("experience");
    const job = findById(items, req.params.id);
    if (!job) {
      missing(res, "Job not found.");
      return;
    }
    const name = text(req.body, "name");
    if (!name) {
      badRequest(res, "Project name is required.");
      return;
    }
    job.projects = job.projects || [];
    job.projects.push({
      name,
      from: text(req.body, "from"),
      to: text(req.body, "to"),
      role: text(req.body, "role"),
      work_mode: text(req.body, "work_mode"),
      responsibilities: [],
    });
    await store.write("experience", items);
    res.redirect(303, `/admin/experience/${job.id}/edit`);
  }),
);

app.post(
  "/admin/experience/:id",
  asyncHandler(async (req, res) => {
    const items = await store.read("experience");
    const job = findById(items, req.params.id);
    if (!job) {
      missing(res, "Job not found.");
      return;
    }
    const fields = jobFields(req.body);
    if (!fields.title || !fields.company_name) {
      badRequest(res, "Title and company are required.");
      return;
    }
    Object.assign(job, fields);
    await store.write("experience", items);
    res.redirect(303, `/admin/experience/${job.id}/edit`);
  }),
);

app.get(
  "/admin/certificates",
  asyncHandler(async (_req, res) => {
    res.type("html").send(certificatesListPage(await store.read("certificates")));
  }),
);

app.get("/admin/certificates/new", (_req, res) => {
  res.type("html").send(certificateNewPage());
});

app.get(
  "/admin/certificates/:id/edit",
  asyncHandler(async (req, res) => {
    const items = await store.read("certificates");
    const item = findById(items, req.params.id);
    if (!item) {
      missing(res, "Certificate not found.");
      return;
    }
    res.type("html").send(certificateEditPage(item));
  }),
);

app.post(
  "/admin/certificates",
  asyncHandler(async (req, res) => {
    const program = text(req.body, "program");
    if (!program) {
      badRequest(res, "Program is required.");
      return;
    }
    const items = await store.read("certificates");
    items.push({
      id: store.nextId(items),
      program,
      credential_url: text(req.body, "credential_url"),
      credential_id: text(req.body, "credential_id"),
      image_url: text(req.body, "image_url"),
      skill_set: parseList(req.body.skill_set),
      courses: [],
    });
    await store.write("certificates", items);
    res.redirect(303, "/admin/certificates");
  }),
);

app.post(
  "/admin/certificates/:id/delete",
  asyncHandler(async (req, res) => {
    const items = await store.read("certificates");
    await store.write(
      "certificates",
      items.filter((item) => String(item.id) !== String(req.params.id)),
    );
    res.redirect(303, "/admin/certificates");
  }),
);

app.post(
  "/admin/certificates/:id/courses/:index/delete",
  asyncHandler(async (req, res) => {
    const items = await store.read("certificates");
    const item = findById(items, req.params.id);
    if (!item) {
      missing(res, "Certificate not found.");
      return;
    }
    const index = Number(req.params.index);
    item.courses = (item.courses || []).filter((_, courseIndex) => courseIndex !== index);
    await store.write("certificates", items);
    res.redirect(303, `/admin/certificates/${item.id}/edit`);
  }),
);

app.post(
  "/admin/certificates/:id/courses",
  asyncHandler(async (req, res) => {
    const items = await store.read("certificates");
    const item = findById(items, req.params.id);
    if (!item) {
      missing(res, "Certificate not found.");
      return;
    }
    const name = text(req.body, "name");
    if (!name) {
      badRequest(res, "Course name is required.");
      return;
    }
    item.courses = item.courses || [];
    item.courses.push({
      name,
      credential_url: text(req.body, "credential_url"),
      credential_id: text(req.body, "credential_id"),
    });
    await store.write("certificates", items);
    res.redirect(303, `/admin/certificates/${item.id}/edit`);
  }),
);

app.post(
  "/admin/certificates/:id",
  asyncHandler(async (req, res) => {
    const items = await store.read("certificates");
    const item = findById(items, req.params.id);
    if (!item) {
      missing(res, "Certificate not found.");
      return;
    }
    const program = text(req.body, "program");
    if (!program) {
      badRequest(res, "Program is required.");
      return;
    }
    Object.assign(item, {
      program,
      credential_url: text(req.body, "credential_url"),
      credential_id: text(req.body, "credential_id"),
      image_url: text(req.body, "image_url"),
      skill_set: parseList(req.body.skill_set),
    });
    await store.write("certificates", items);
    res.redirect(303, `/admin/certificates/${item.id}/edit`);
  }),
);

app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  console.error(err);
  if (String(_req.originalUrl || "").startsWith("/admin")) {
    res.status(status).type("html").send(gatePage({ error: err.message || "Server error" }));
    return;
  }
  res.status(status).json({ error: err.message || "Server error" });
});

app.listen(PORT, () => {
  console.log(`API and admin on http://localhost:${PORT}`);
});
