import { useSelector } from "react-redux";
import CertificateCard from "../components/CartificateCard";

function Certifications() {

  const certificates = useSelector((state) => state.certificates)

  return (
    <div className="w-11/12 h-fit py-6 m-auto" id="certifications">
      <div className="flex flex-row gap-4 md:gap-12">
        <i class="fa-solid fa-certificate text-4xl"></i>
        <h1 className="text-4xl font-bold">Certifications</h1>
      </div>
      <div className="w-full h-fit flex flex-col gap-6 mt-12">
        {certificates.map((item) => (
          <CertificateCard item={item} />
        ))}
      </div>
    </div>
  );
}

export default Certifications;
