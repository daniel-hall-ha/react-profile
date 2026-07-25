import { useState } from "react";
import CertificateDetailsModal from "./CertificateDetailsModal"

function CertificateCard({ item }) {

  const [ isCertificateDetailShowed, setIsCertificateDetailShowed ] = useState(false)

  function certificateDetailDisplayHandler() {
    setIsCertificateDetailShowed(!isCertificateDetailShowed)
  }

  return (
    <div className="flex flex-col justify-center items-start px-10 py-10 border-[0.5px] border-gray-500 rounded-2xl gap-5" onClick={() => certificateDetailDisplayHandler()}>
      <h1 className="text-2xl font-medium">{item.program}</h1>
      <button className="w-36 h-fit bg-black text-white dark:border-[0.3px] dark:border-gray-500/50 px-4 py-2"
      onClick={() => {
        certificateDetailDisplayHandler()}
      }
      >
        <i class="fa-solid fa-arrow-up-right-from-square"></i> See Details
      </button>
      <div className="w-full border-gray-500 border-b-[0.5px]"></div>
      <div className="w-full h-fit flex flex-row flex-wrap gap-5 text-white">
        {item.skill_set.map((stack) => (
          <div className="px-4 py-2 bg-gray-500 rounded-full w-fit h-fit text-sm">
            {stack}
          </div>
        ))}
      </div>
      {isCertificateDetailShowed && <CertificateDetailsModal data={item} ModalStateHandler={certificateDetailDisplayHandler}/>}
      
    </div>
  );
}

export default CertificateCard;
