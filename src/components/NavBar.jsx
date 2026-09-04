import { useState } from "react";
import { useTheme } from "../providers/UseTheme";
import { downloadCv } from "../utils/downloadCv";

function NavBar() {
  const { theme, setTheme } = useTheme("light");
  const [isDownloading, setIsDownloading] = useState(false);

  async function handleDownloadCv() {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      await downloadCv();
    } catch (error) {
      console.error(error);
      alert("Failed to download CV. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  }

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
    <div className="fixed w-full px-8 py-5 bg-white dark:bg-gray-900 flex justify-between items-center shadow-sm dark:shadow-gray-950 text-gray-700 dark:text-white z-90">
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

      <div className="w-fit h-fit flex flex-row items-center gap-6">
        <button
          className="m-0 px-4 py-2 bg-white-500 border border-gray-800 hover:bg-gray-800 hover:text-white text-sm rounded-md cursor-pointer disabled:opacity-60 disabled:cursor-wait"
          onClick={handleDownloadCv}
          disabled={isDownloading}
        >
          {isDownloading ? "Preparing…" : "Download CV"}
        </button>
        <button className="p-2 w-fit h-fit border border-gray-800 hover:bg-gray-800 hover:text-white text-sm rounded-md cursor-pointer dark:border-white dark:bg-gray-800 dark:text-white"
        onClick={() =>
        setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? <i class="fa-solid fa-moon"></i> : <i class="fa-solid fa-sun"></i> }
        </button>
      </div>
    </div>
  );
}

export default NavBar;
