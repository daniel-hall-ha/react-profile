function ExperienceCard({ item }) {
  // {
  //   id: 2,
  //   company_name: "Sixtechz",
  //   company_url: "https://www.sixtechz.io",
  //   start_date: "Oct 2025",
  //   end_date: "",
  //   status: "Employed",
  //   title: "Junior Operation Engineer",
  //   tech_stack: [
  //     "Laravel",
  //     "PHP",
  //     "React",
  //     "JavaScript",
  //     "MySQL",
  //     "Linux",
  //     "Bash",
  //     "Git",
  //     "REST API",
  //     "Server Monitoring",
  //     "Incident Management",
  //     "Production Support",
  //   ],
  //   projects: [
  //     {
  //       name: "ATOM Pay",
  //       from: "2025",
  //       to: "Present",
  //       role: "Part-Time Junior Operation Engineer",
  //       work_mode: "Remote",
  //       responsibilities: [
  //         "Monitored and maintained production servers to ensure high availability, reliability, and operational stability.",
  //         "Investigated and resolved production incidents through log analysis, troubleshooting, and root cause identification.",
  //         "Developed and maintained internal application features, enhancements, and bug fixes using Laravel, React, and PHP.",
  //         "Created and maintained Bash scripts to automate operational tasks, deployments, and routine maintenance processes.",
  //         "Monitored application logs, server performance, and system resources to proactively detect and resolve operational issues.",
  //         "Supported API integrations, deployment activities, environment configuration, and production releases.",
  //         "Collaborated with software engineers, QA engineers, and cross-functional teams to deliver secure, stable, and reliable payment services.",
  //         "Participated in incident response and operational support to minimize downtime and improve service reliability.",
  //       ],
  //     },
  //   ],
  // },

  return (
    <div className="flex flex-col justify-center items-start px-10 py-10 border-[0.5px] border-gray-500 rounded-2xl gap-5">
      <h1 className="text-2xl font-medium">
        {item.title} at {item.company_name}
      </h1>
      <p>
        {item.start_date} to{" "}
        {item.status === "Resigned" ? item.end_date : "Current"}
      </p>
      <div className="w-full h-fit flex flex-row flex-wrap gap-5 text-white">
        {item.tech_stack.map((stack) => (
          <div className="px-4 py-2 bg-gray-500 rounded-full w-fit h-fit text-sm">
            {stack}
          </div>
        ))}
      </div>
      <div className="w-full border-gray-500 border-b-[0.5px]"></div>
      <div className="w-full h-fit flex flex-col gap-5">
        {item.projects.map((project, index, arr) => (
          <div className="flex flex-col gap-3">
            <h1 className="text-xl">{project.name}</h1>
            <p>
              {project.from} to {project.to}
            </p>
            <p>{project.role}</p>
            <ul>
              {project.responsibilities.map((res) => (
                <li className="py-1">{res}</li>
              ))}
            </ul>
            {index !== arr.length - 1 && (
              <div className="w-full border-gray-500 border-b-[0.5px] mt-2"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExperienceCard;
