function NavBar() {
  function scrollingHandler(event) {
    const element = document.getElementById(
      event.target.innerHTML.toLowerCase(),
    );
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - 90;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
  return (
    <div className="fixed w-full px-8 py-5 bg-white flex justify-between items-center shadow-sm text-gray-700">
      <div>
        <p className="text-xs">Hello World! My name is ...</p>
        <h1 className="text-xl font-bold flex sm:flex-row flex-col">
          <span>Htet Aung&nbsp;</span>
          <span>(Daniel Hall)</span>
        </h1>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 hidden lg:block">
        <ul
          className="flex items-center gap-8"
          onClick={(e) => scrollingHandler(e)}
        >
          <li className="cursor-pointer hover:translate-y-px hover:underline hover:decoration-dotted hover:underline-offset-2 bg-none">
            Education
          </li>
          <div className="w-[0.5px] h-4 bg-gray-700/50"></div>
          <li className="cursor-pointer hover:translate-y-px hover:underline hover:decoration-dotted hover:underline-offset-2 bg-none">
            Experience
          </li>
          <div className="w-[0.5px] h-4 bg-gray-700/50"></div>
          <li className="cursor-pointer hover:translate-y-px hover:underline hover:decoration-dotted hover:underline-offset-2 bg-none">
            Portfolios
          </li>
          <div className="w-[0.5px] h-4 bg-gray-700/50"></div>
          <li className="cursor-pointer hover:translate-y-px hover:underline hover:decoration-dotted hover:underline-offset-2 bg-none">
            Certifications
          </li>
          <div className="w-[0.5px] h-4 bg-gray-700/50"></div>
          <li className="cursor-pointer hover:translate-y-px hover:underline hover:decoration-dotted hover:underline-offset-2 bg-none">
            Contact
          </li>
        </ul>
      </div>

      <div className="w-fit h-fit flex flex-row items-center gap-12">
        <button className="m-0 px-4 py-2 bg-white-500 border border-gray-800 hover:bg-gray-800 hover:text-white text-gray text-sm rounded-md cursor-pointer">
          Download CV
        </button>
        <button className="py-2 w-fit h-fit border-gray-800 hover:bg-gray-800 hover:text-white text-gray text-sm rounded-md cursor-pointer">
          <i class="fa-solid fa-moon"></i>
        </button>
      </div>
    </div>
  );
}

export default NavBar;
