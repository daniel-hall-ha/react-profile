import { useSelector } from "react-redux";
import ExperienceCard from "../components/ExperienceCard";

function Experience() {

  const experience = useSelector((state) => state.experience)

  return (
    <div className="w-11/12 h-fit py-6 m-auto" id="experience">
      <div className="flex flex-row gap-6 md:gap-12">
        <i class="fa-solid fa-briefcase text-4xl"></i>
        <h1 className="text-4xl font-bold">Experience</h1>
      </div>
      <div className="flex flex-col mt-12 gap-6">
        {experience.map((item) => (
          <ExperienceCard item={item} />
        ))}
      </div>
    </div>
  );
}

export default Experience;
