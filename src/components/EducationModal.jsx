import { useEffect } from "react";
import { createPortal } from "react-dom";

function formatLabel(text) {
  return text.replace("_", " ").replace(/^\w/, (c) => c.toUpperCase());
}

function TransformData(data) {
  if (data.school_name.includes("Highschool"))
    return Object.entries(data.transcript)
      .filter(([key]) => key !== "latest_cgpa" && key !== "url")
      .map(([course_name, grade]) => ({
        course_name,
        grade,
      }));
  else
    return Object.entries(data.transcript).map(([year, periods]) => ({
      year: formatLabel(year),
      semesters: Object.entries(periods).map(([period, courses]) => ({
        semester: formatLabel(period), // Semester 1 or Term 1
        courses: Object.entries(courses).map(([course_name, grade]) => ({
          course_name,
          grade,
        })),
      })),
    }));
}

function EducationDetailsModal({ data, ModalStateHandler }) {
  // [
  //   {
  //     "id": 2,
  //     "school_name": "University of the People",
  //     "start_date": "Apr 2026",
  //     "end_date": "",
  //     "status": "Ongoing",
  //     "transcript": {
  //       "year_1": {
  //         "Online Education Strategy": 4,
  //         "Introduction to Computer Science": 4
  //       },
  //       "latest_cgpa": "4.0/4",
  //       "url": "https://transcript-url.com/check"
  //     }
  //   },
  //   {
  //     "id": 1,
  //     "school_name": "University of Information Technology",
  //     "status": "Unfinished",
  //     "start_date": "Dec 2018",
  //     "end_date": "Mar 2020",
  //     "transcript": {
  //       "year_1": {
  //         "semester_1": {
  //           "Burmese Literature": 2.67,
  //           "English Language Proficiency": 2.67,
  //           "Physics (Mechanics)": 3.67,
  //           "Fundamentals of Computer System": 3.33,
  //           "Discrete Structure I & Calculus": 4,
  //           "Basic Data Structures": 4
  //         },
  //         "semester_2": {
  //           "Burmese Literature": 2.33,
  //           "English Language Proficiency II": 2.67,
  //           "General Physics": 3.67,
  //           "Web Technology": 4,
  //           "Discrete Structure": 3.33,
  //           "Programming in C++": 4
  //         }
  //       },
  //       "latest_cgpa": "3.36/4",
  //       "url": "https://transcript-url.com/check"
  //     }
  //   },
  //   {
  //     "id": 3,
  //     "school_name": "Highschool Matriculation",
  //     "start_date": ""
  //     "end_date": "Feb 2018",
  //     "status": "Graduated",
  //     "transcript": {
  //       "Burmese Literature": 72,
  //       "English": 69,
  //       "Mathematics": 91,
  //       "Chemistry": 92,
  //       "Physics": 89,
  //       "Biology": 95,
  //       "latest_cgpa": "508/600",
  //       "url": "https://transcript-url.com/check"
  //     }
  //   }
  // ]
  useEffect(() => console.log("KOJOK" + data));

  return createPortal(
    <div className="fixed inset-0 w-screen h-screen bg-gray-700/50 flex items-center justify-center">
      <div className="w-2/3 h-2/3 flex flex-col gap-6 m-auto bg-white dark:bg-gray-900 border border-gray-600 dark:border-gray-300 rounded-lg p-8 dark:text-white">
        <div className="flex flex-row gap-6 w-full overflow-hidden">
          <img src="" className="w-24 h-24 hidden xl:block"></img>
          <div className="flex flex-col gap-2 justify-evenly items-start">
            <h1 className="text-lg md:text-xl lg:text-2xl font-medium">
              {data.school_name} &nbsp;
            </h1>
            <div>
              {data.status !== "Unfinished"
                ? data.status === "Graduated"
                  ? data.school_name.toLowerCase().includes("highschool")
                    ? data.end_date
                    : data.start_date + " - " + data.end_date
                  : data.start_date
                : data.start_date + " - " + data.end_date}
            </div>
            <div>{data.status}</div>
          </div>
          <button
            className="px-4 py-2 m-auto mr-0 bg-gray-500 text-sm text-white hidden md:block"
            onClick={ModalStateHandler}
          >
            Close
          </button>
        </div>
        <div className="w-full border-gray-500 border-b-[0.5px]"></div>
        <div className="flex-1 overflow-scroll flex flex-col">
          {data.school_name.toLowerCase().includes("highschool") ? (
            <div className="w-full h-fit border-[0.5px] border-gray-600 rounded-md overflow-hidden">
              {TransformData(data).map((item) => (
                <div className="py-2 border-b-[0.2px] border-b-gray-400/50 flex justify-between pl-4 pr-6">
                  <span>{item.course_name}</span>
                  <a className="text-gray-700">{item.grade}</a>
                </div>
              ))}
            </div>
          ) : (
            TransformData(data).map((item) => (
              <div
                key={item.year}
                className="w-full h-fit flex flex-col gap-4 px-4 py-2"
              >
                <h2 className="text-xl font-medium">{item.year}</h2>
                <div className="w-full h-fit border-[0.5px] border-gray-600 rounded-lg overflow-hidden px-4 py-2 pt-4">
                  {item.semesters.map((semester) => (
                    <div key={semester.semester} className="flex flex-col gap-2 mb-4">
                      <h1 className="text-base font-medium">{semester.semester}</h1>
                      <div className="flex flex-col">
                        {semester.courses.map((course) => (
                          <div className="py-2 border-b-[0.2px] border-b-gray-400/50 flex justify-between pl-4 pr-6">
                            <div>{course.course_name}</div>
                            <div>{course.grade}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default EducationDetailsModal;
