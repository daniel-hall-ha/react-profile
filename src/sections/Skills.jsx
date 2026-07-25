import { useSelector } from "react-redux";
import SkillCard from "../components/SkillCard";

function Skills() {
  const skills = useSelector((state) => state.skills)
  return (
    <div className="w-11/12 h-fit py-6 mt-6 m-auto" id="skills">
      <div className="flex flex-row gap-6 md:gap-12">
        <i class="fa-brands fa-buffer text-4xl"></i>
        <h1 className="text-4xl font-bold">Skills</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 justify-items-center place-items-center mt-5">
        {skills.map((item) => (
          <SkillCard item={item} />
        ))}
      </div>
    </div>
  );
}

export default Skills;
