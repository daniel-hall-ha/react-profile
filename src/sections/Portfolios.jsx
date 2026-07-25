import { useSelector } from "react-redux";
import PortfolioCard  from "../components/PortfolioCard";

function Projects() {
const portfolios = useSelector((state) => state.portfolios)
  return (
    <div className="w-11/12 h-fit py-6 m-auto" id="portfolios">
      <div className="flex flex-row gap-12">
        <i class="fa-solid fa-folder-open text-4xl"></i>
        <h1 className="text-4xl font-bold">Portfolios</h1>
      </div>
      <div className="w-full h-fit grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 place-content-center place-items-center mt-6">
        {portfolios.map((item) => (
          <PortfolioCard item={item} />
        ))}
      </div>
    </div>
  );
}

export default Projects;
