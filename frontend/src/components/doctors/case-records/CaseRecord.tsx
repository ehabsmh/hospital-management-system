import {
  FaChevronDown,
  FaChevronUp,
  FaFile,
  FaFileInvoice,
} from "react-icons/fa";
import ICaseRecord from "../../../interfaces/CaseRecord";
import { useState } from "react";
import Prescription from "./Prescription";
import Report from "./Report";
import { format } from "date-fns/format";

function CaseRecord({
  toggleAccordion,
  index,
  isOpen,
  record,
}: {
  toggleAccordion: (index: number) => void;
  index: number;
  isOpen: boolean;
  record: ICaseRecord;
}) {
  const [recordType, setRecordType] = useState("Report");
  const recordedAt = format(record.createdAt, "MMMM dd, yyyy");

  return (
    <div className="rounded-xl shadow-sm bg-white">
      <button
        onClick={() => toggleAccordion(index)}
        className="w-full flex justify-between items-center px-6 py-4 dark:bg-light-dark dark:hover:dark:bg-dark bg-gray-100 hover:bg-gray-200 transition-all"
      >
        <span className="text-lg font-medium dark:text-white text-gray-800">
          {recordedAt}
        </span>
        <span className="dark:text-white text-gray-500">
          {isOpen ? (
            <FaChevronUp className="cursor-pointer" size={20} />
          ) : (
            <FaChevronDown className="cursor-pointer" size={20} />
          )}
        </span>
      </button>

      {isOpen && (
        <div className="px-6 py-5 dark:bg-light-dark bg-white border-t space-y-5">
          <div className="flex gap-4">
            <button
              disabled={recordType === "Report"}
              onClick={() => setRecordType("Report")}
              className="flex items-center gap-2 disabled:bg-blue-600/70 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition cursor-pointer"
            >
              <FaFile size={18} />
              Report
            </button>
            <button
              disabled={recordType !== "Report"}
              onClick={() => setRecordType("Prescription")}
              className="flex items-center gap-2 disabled:bg-green-600/70 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition cursor-pointer"
            >
              <FaFileInvoice size={18} />
              Prescription
            </button>
          </div>

          {recordType === "Report" && <Report report={record.report} />}
          {recordType === "Prescription" && (
            <Prescription prescription={record.prescription} />
          )}
        </div>
      )}
    </div>
  );
}

export default CaseRecord;
