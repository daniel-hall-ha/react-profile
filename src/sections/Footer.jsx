import ExternalLinkHandler from "../handlers/ExternalLinkHandler";

function Footer() {
  return (
    <div className="w-screen min-h-72 flex flex-col lg:flex-row justify-between items-start lg:items-center p-12 py-6 mt-12 bg-gray-700 gap-6" id="contact">
      <div className="text-white h-full flex flex-col justify-center">
        <p className="mb-2">Hello World! My name is ...</p>
        <h1 className="text-2xl font-bold">Htet Aung (Daniel Hall)</h1>
        <i className="fa-brand fa-facebook"></i>
        <div className="flex flex-row flex-wrap gap-3 mt-6 items-center">
          <a href="#">Facebook</a>
          <div className="w-[0.5px] h-3 bg-white"></div>
          <a href="#">Insagram</a>
          <div className="w-[0.5px] h-3 bg-white"></div>
          <a href="#">WhatsApp</a>
          <div className="w-[0.5px] h-3 bg-white"></div>
          <a href="#">LinkedIn</a>
          <div className="w-[0.5px] h-3 bg-white"></div>
          <a href="#">Indeed</a>
          <div className="w-[0.5px] h-3 bg-white"></div>
          <a href="#">Viber</a>
        </div>
      </div>
      <div className="flex flex-col gap-4 text-white text-base">
        <div className="flex items-center gap-6 cursor-pointer" onClick={() => ExternalLinkHandler("email","ha.danielhall@gmail.com")}>
            <i class="fa-solid fa-envelope"></i>
            <p>ha.danielhall@gmail.com</p>
        </div>
        <div className="flex items-center gap-6 cursor-pointer">
            <i class="fa-solid fa-address-card"></i>
            <p>Address</p>
        </div>
        <div className="flex items-center gap-6 cursor-pointer" onClick={() => ExternalLinkHandler("phone","+959791686984")}>
            <i class="fa-solid fa-phone"></i>
            <p>+959-791-686-984</p>
        </div>
        <div className="flex items-center gap-6 cursor-pointer" onClick={() => ExternalLinkHandler("https://www.linkedin.com/in/ha-danielhall/")}>
            <i class="fa-brands fa-linkedin"></i>
            <p>https://www.linkedin.com/in/ha-danielhall/</p>
        </div>
        <div className="flex items-center gap-6 cursor-pointer" onClick={() => ExternalLinkHandler("https://www.github.com/ha-danielhall/")}>
            <i class="fa-brands fa-github"></i>
            <p>https://www.github.com/ha-danielhall/</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <textarea className="border-[0.5px] border-gray-400 w-80 sm:w-100 h-24 p-4 focus:outline-none text-white resize-none"></textarea>
        <button className="bg-gray-900 text-white py-4">
          <i class="fa-solid fa-paper-plane"></i> Send a Direct Message
        </button>
      </div>
    </div>
  );
}

export default Footer;
