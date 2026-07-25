function CertificateCard({ item }) {
  // {
  //   id: 1,
  //   program: "Google IT Automation with Python",
  //   courses: [
  //     {
  //       name: "Crash Course on Python",
  //       credential_url: "",
  //       credential_id: "",
  //     },
  //   ],
  //   skill_set: [
  //     "Python",
  //     "Linux",
  //     "Bash",
  //   ],
  //   credential_url: "",
  //   credential_id: "",
  // }

  return (
    <div className="flex flex-col justify-center items-start px-10 py-10 border-[0.5px] border-gray-500 rounded-2xl gap-5">
      <h1 className="text-2xl font-medium">{item.program}</h1>
      <button className="w-32 h-fit bg-gray-800 text-white px-4 py-2">
        See Details
      </button>
      <div className="w-full border-gray-500 border-b-[0.5px]"></div>
      <div className="w-full h-fit flex flex-row flex-wrap gap-5 text-white">
        {item.skill_set.map((stack) => (
          <div className="px-4 py-2 bg-gray-500 rounded-full w-fit h-fit text-sm">
            {stack}
          </div>
        ))}
      </div>
      {/* <div className="w-full border-gray-500 border-b-[0.5px]"></div>
      <div className="w-full h-fit flex flex-col gap-5">
        {item.courses.map((course) => (
          <div className="flex flex-col gap-3">
            <h1 className="text-base">{course.name}</h1>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default CertificateCard;
