import ICaseRecord from "../../../interfaces/CaseRecord";

function Report({ report }: { report: ICaseRecord["report"] }) {
  return (
    <div className="text-sm dark:text-white text-gray-700 space-y-5">
      <div>
        <p className="dark:text-neutral-300 dark:font-bold font-semibold text-gray-800">
          Report Title:
        </p>
        <p>{report.title}</p>
      </div>
      <div>
        <p className="dark:text-neutral-300 dark:font-bold font-semibold text-gray-800">
          Report Body:
        </p>
        <p>{report.body}</p>
      </div>
    </div>
  );
}

export default Report;
