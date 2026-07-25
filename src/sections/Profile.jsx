function Profile() {
  return (
    <div className="w-11/12 h-fit py-12 m-auto" id="profile">
      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-12 pb-8 mt-24">
        <div className="h-84 shrink-0">
          <img
            src="/me2.png"
            alt="Me"
            className="h-full w-auto object-contain"
          />
        </div>
        <div className="flex flex-col gap-5 justify-center items-center md:items-start">
          <h1 className="text-3xl font-bold">Htet Aung (Daniel Hall)</h1>
          <em>"Building software. Solving problems. Never stop learning."</em>
          <p>
            I'm an undergraduate software enthusiast focused on software
            development, operations, and machine learning. Driven by curiosity
            and a passion for technology, I'm dedicated to continuous learning
            and creating impactful solutions.
          </p>
          <div className="flex flex-row gap-12">
            <button className="px-4 py-2 bg-gray-500 text-white mt-4 rounded-md transition-transform duration-200 ease-in-out hover:-translate-y-0.5 cursor-pointer">
              View My Work
            </button>
            <button className="px-4 py-2 bg-white-500 border border-gray-500 text-gray mt-4 rounded-md transition-transform duration-200 ease-in-out hover:-translate-y-0.5 cursor-pointer">
              Contact Me
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-row flex-wrap items-center justify-between px-12 py-4 shadow-xs rounded-xl">
        <div className="flex flex-row justify-center items-center p-5 gap-5 ">
          <div className="w-12 h-12 flex justify-center rounded-2xl items-center bg-gray-400/40">
            <i className="fa-brands fa-hotjar text-3xl"></i>
          </div>
          <div className="flex flex-col gap-1">
            <p>Experience</p>
            <p>
              <b>+2 Years</b>
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center p-5 gap-5">
          <div className="w-12 h-12 flex justify-center rounded-2xl items-center bg-gray-400/40">
            <i class="fa-solid fa-location-dot text-3xl"></i>
          </div>
          <div className="flex flex-col gap-1">
            <p>Location</p>
            <p>
              <b>Yangon, Burma</b>
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center p-5 gap-5">
          <div className="w-12 h-12 flex justify-center rounded-2xl items-center bg-gray-400/40">
            <i className="fa-solid fa-envelope text-3xl"></i>
          </div>
          <div className="flex flex-col gap-1">
            <p>Email</p>
            <p>
              <b>ha.danielhall@gmail.com</b>
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center p-5 gap-5">
          <div className="w-12 h-12 flex justify-center rounded-2xl items-center bg-gray-400/40">
            <i className="fa-regular fa-circle text-3xl"></i>
          </div>
          <div className="flex flex-col gap-1">
            <p>Availability</p>
            <p>
              <b>Employed</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
