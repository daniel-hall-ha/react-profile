import { useEffect } from "react";
import { createPortal } from "react-dom";

function CertificateDetailsModal({ data, ModalStateHandler }) {
  /*    "id": 1,
    "program": "Google IT Automation with Python",
    "courses": [
      {
        "name": "Crash Course on Python",
        "credential_url": "",
        "credential_id": ""
      },
    "skill_set": [
      "Python",
      "Linux",
      "Bash",
      "Git",
    ],
    "credential_url": "",
    "credential_id": ""
*/
  useEffect(() => console.log("HELLO"));
  return createPortal(
    <div className="fixed inset-0 w-screen h-screen bg-gray-700/50 flex items-center justify-center">
      <div className="w-2/3 h-2/3 flex flex-col gap-6 m-auto bg-white dark:bg-gray-900 border border-gray-600 dark:border-gray-300 rounded-lg p-8 dark:text-white">
        <div className="flex flex-row gap-6 w-full overflow-hidden">
          <img src="" className="w-24 h-24 hidden xl:block"></img>
          <div className="flex flex-col gap-2 justify-evenly items-start">
            <h1 className="text-lg md:text-xl lg:text-2xl font-medium">
              {data.program} &nbsp;
            </h1>
            {!data.credential_url ? (
              <div>On Progress</div>
            ) : (
              <a href={data.credential_url} className="text-xs md:text-sm lg:text-base text-wrap">
                {data.credential_url}
              </a>
            )}
            {data.credential_url && (
              <div className="inline-block text-xs px-2.5 py-1 rounded-full bg-sky-500 text-white">
                Completed
              </div>
            )}
          </div>
          <button className="px-4 py-2 m-auto mr-0 bg-gray-500 text-sm text-white hidden md:block" onClick={ModalStateHandler}>
            Close
          </button>
        </div>
        <div className="w-full border-gray-500 border-b-[0.5px]"></div>
        <div className="flex-1 overflow-scroll flex flex-col">
          {data.courses.map((item) => (
            <div className="py-2 border-[0.2px] border-none flex justify-between">
              <span>{item.name}</span>
              {item.credential_url ? (
                <a className="text-green-400" href={item.credential_url}>{item.credential_id}</a>
              ) : (
                "On learning ..."
              )}
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default CertificateDetailsModal;
