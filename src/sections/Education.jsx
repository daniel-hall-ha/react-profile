import { useSelector } from "react-redux";
import EducationCard from "../components/EducationCard";

function Education() {
  const education = useSelector((state) => state.education);
  return (
    <div className="w-11/12 h-fit py-6 m-auto" id="education">
      <div className="flex flex-row  gap-6 md:gap-12">
        <i class="fa-solid fa-graduation-cap text-4xl"></i>
        <h1 className="text-4xl font-bold">Education</h1>
      </div>
      <div className="flex flex-col mt-12 gap-6">
        {education.map((item) => (
          <EducationCard item={item} />
        ))}
      </div>
    </div>
  );
}

export default Education;
