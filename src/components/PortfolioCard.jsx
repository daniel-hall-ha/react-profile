function PortfolioCard({ item }) {
  //   {
  //     id: 2,
  //     name: "Conference Expense Planner",
  //     description:
  //       "A responsive React application developed as a hands-on project to practice modern frontend development. The application enables users to manage conference expenses, calculate budgets, and organize event costs through an intuitive and interactive user interface, demonstrating component-based architecture and state management.",
  //     repo_url: "",
  //     site_url: "",
  //     img_url: ""
  //   }
  return (
    <div className="w-78 h-120 sm:w-110 rounded-lg overflow-hidden flex flex-col bg-gray-500 text-white mt-5">
      <div className="h-1/2 w-full overflow-hidden">
        <img src={item.img_url} className="w-full"></img>
      </div>
      <div className="flex-1 p-5 flex flex-col justify-between gap-3 overflow-hidden">
        <h1 className="text-lg font-medium">{item.name}</h1>
        <p className="text-sm">{item.description}</p>
        <div className="flex flex-row w-full h-fit justify-end gap-5">
          {item.site_url && (
            <button className="w-27 h-10 bg-gray-900">
              <i className="fa-solid fa-link"></i> Site
            </button>
          )}
          <button className="w-27 h-10 bg-gray-900">
            <i className="fa-brands fa-github"></i> GitHub
          </button>
        </div>
      </div>
    </div>
  );
}

export default PortfolioCard;
