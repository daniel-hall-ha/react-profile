import ExternalLinkHandler from "../handlers/ExternalLinkHandler";

function PortfolioCard({ item }) {
  return (
    <div className="w-80 h-120 sm:w-110 rounded-xl overflow-hidden flex flex-col bg-gray-500 dark:bg-gray-700 text-white mt-5 transition-transform duration-200 ease-in-out hover:-translate-y-1">
      <div className="h-1/2 w-full overflow-hidden">
        <img src={item.img_url} className="w-full"></img>
      </div>
      <div className="flex-1 p-5 flex flex-col justify-between gap-3 overflow-hidden">
        <h1 className="text-lg font-medium">{item.name}</h1>
        <p className="text-sm">{item.description}</p>
        <div className="flex flex-row w-full h-fit justify-end gap-5">
          {item.site_url && (
            <button className="w-27 h-10 bg-gray-900" onClick={() => ExternalLinkHandler(item.site_url)}>
              <i className="fa-solid fa-link"></i> Site
            </button>
          )}
          <button className="w-27 h-10 bg-gray-900" onClick={() => item.repo_url ? ExternalLinkHandler(item.repo_url) : ""}>
            <i className="fa-brands fa-github"></i> GitHub
          </button>
        </div>
      </div>
    </div>
  );
}

export default PortfolioCard;
