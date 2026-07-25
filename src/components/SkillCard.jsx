function SkillCard({ item }) {
    //   id: 8,
    //   name: "Soft Skills",
    //   tools: [
    //     {
    //       name: "Problem Solving",
    //       icon: "fa-solid fa-lightbulb",
    //     },
    //     {
    //       name: "Communication",
    //       icon: "fa-solid fa-comments",
    //     },
    //     {
    //       name: "Teamwork",
    //       icon: "fa-solid fa-users",
    //     },
    //     {
    //       name: "Adaptability",
    //       icon: "fa-solid fa-arrows-rotate",
    //     },
    //     {
    //       name: "Time Management",
    //       icon: "fa-solid fa-clock",
    //     }
  return (
    <div className="group flex flex-col justify-center items-center w-99 h-60 gap-8 px-10 rounded-md transition-transform duration-200 ease-in-out hover:-translate-y-1">
        <h1 className="text-xl font-medium">{item.name}</h1>
        {/* <div className="group-hover:hidden flex flex-row justify-center items-center gap-4">
            {item.tools.map(tool => (
                <i className={`${tool.icon} text-3xl`}></i>
            ))}
        </div> */}
        <div className="flex flex-row flex-wrap gap-5 justify-center">
            {item.tools.map(tool => (
                <div>
                    {tool.name}
                </div>
            ))}
        </div>
        <div className="w-10 h-1 bg-gray-500/30 rounded-full justify-self-end">
        </div>
    </div>
  );
}

export default SkillCard;
