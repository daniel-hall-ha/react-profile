function EducationCard({ item }) {
  return (
    <div className="cursor-pointer flex flex-row justify-between items-center px-10 py-5 p-10 rounded-xl border-[0.5px] border-gray-500 hover:text-white transition-transform duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-gray-500">
      <div className="flex flex-col justify-center items-start gap-2">
        <h1 className="text-xl font-medium">
          {item.school_name}
        </h1>
        {item.status.toLowerCase() === "unfinished" && (
          <p>
            {item.start_date} - {item.end_date} (Unfinished)
          </p>
        )}
        {item.status.toLowerCase() === "ongoing" && (
          <p>{item.start_date} - Ongoing</p>
        )}
        {item.status.toLowerCase() === "finished" &&
          !item.school_name.toLowerCase().includes("matriculation") && (
            <p>
              {item.start_date} - {item.end_date}
            </p>
          )}
        {item.status.toLowerCase() === "finished" &&
          item.school_name.toLowerCase().includes("highschool") && (
            <p>{item.date}</p>
          )}
      </div>
      <div className="text-xl font-medium">
        {item.transcript.latest_cgpa}
      </div>
    </div>
  );
}

export default EducationCard;
