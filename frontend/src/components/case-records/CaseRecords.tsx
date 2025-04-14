import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import CaseRecord from "./CaseRecord";
import { fetchCaseRecords } from "../../services/apiCaseRecord";
import ICaseRecord from "../../interfaces/CaseRecord";

type CaseRecordsProps = {
  onCloseModal?: () => void;
  patientId: string;
};

function CaseRecords({ onCloseModal, patientId }: CaseRecordsProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [caseRecords, setCaseRecords] = useState<ICaseRecord[]>([]);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(
    function () {
      async function getCaseRecords() {
        try {
          const data = await fetchCaseRecords(patientId);
          console.log(data);

          setCaseRecords(data);
        } catch (error) {
          if (error instanceof Error) console.log(error.message);
        }
      }
      getCaseRecords();
    },
    [patientId]
  );

  return (
    <section className="border relative rounded-md border-white/20 min-h-96  w-1/2 p-10 shadow-lg shadow-black/70">
      <MdClose
        onClick={onCloseModal}
        className="absolute top-0 right-0 border border-gray-300 cursor-pointer"
        size={25}
      />
      <div className="max-w-3xl mx-auto mt-8 space-y-4">
        {caseRecords.map((record, index) => (
          <CaseRecord
            record={record}
            key={index}
            toggleAccordion={toggleAccordion}
            index={index}
            isOpen={activeIndex === index}
          />
        ))}
      </div>
    </section>
  );
}

export default CaseRecords;
