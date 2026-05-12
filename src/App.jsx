import { Search, Plus, Pencil, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";

export default function App() {
  const [create, setCreate] = useState(false);

  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("note");
    return savedData ? JSON.parse(savedData) : [];
  });

  const [noteheading, setNoteheading] = useState("");
  const [notestext, setNotestext] = useState("");

  // save data in localStorage
  useEffect(() => {
    localStorage.setItem("note", JSON.stringify(data));
  }, [data]);

  const createNote = () => {
    setCreate(!create);
  };

  const formHandler = (e) => {
    e.preventDefault();
  };

  const getData = (type, value) => {
    if (type === "heading") {
      setNoteheading(value);
    } else {
      setNotestext(value);
    }
  };

  const addData = () => {
    if (noteheading.trim() === "") {
      return setCreate(false);
    }

    const letters = "BCDEF";
    let newColor = "#";

    for (let i = 0; i < 6; i++) {
      newColor += letters[Math.floor(Math.random() * letters.length)];
    }

    const newObj = {
      heading: noteheading,
      note: notestext,
      color: newColor,
      date: new Date().toLocaleDateString(),
    };

    setData([...data, newObj]);

    setCreate(false);
    setNoteheading("");
    setNotestext("");
  };

  const noteDelete = (deleteidx) => {
    const updatenote = data.filter((_, index) => index !== deleteidx);

    setData(updatenote);
  };

  return (
    <div className="min-h-screen bg-[#E9EEF6] p-3 md:p-4">
  <div className="flex flex-col lg:flex-row lg:h-[95vh] rounded-3xl bg-white overflow-hidden">
    
    {/* Sidebar */}
    <div className="w-full lg:w-[120px] border-b lg:border-b-0 lg:border-r border-gray-200 px-4 py-6 flex lg:block items-center justify-between">
      
      <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
        Notes
      </h1>

      <button
        onClick={createNote}
        className="mt-0 lg:mt-10 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-black text-white transition hover:scale-105"
      >
        <Plus size={22} />
      </button>
    </div>

    {/* Create Note Form */}
    <form
      onSubmit={formHandler}
      style={{ display: !create ? "none" : "flex" }}
      className="absolute left-1/2 top-1/2 z-50 w-[90%] max-w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-xl bg-white p-5 md:p-10 shadow-[0_0_20px_rgba(0,0,0,0.25)]"
    >
      <h1 className="mb-6 text-center text-2xl md:text-4xl font-bold text-gray-800">
        Create Note
      </h1>

      <input
        onChange={(e) => getData("heading", e.target.value)}
        value={noteheading}
        type="text"
        placeholder="Enter Note Title"
        className="mb-5 w-full rounded border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
      />

      <textarea
        onChange={(e) => getData("notetext", e.target.value)}
        value={notestext}
        placeholder="Write Note"
        rows="5"
        className="mb-6 w-full resize-none rounded border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
      ></textarea>

      <button
        onClick={addData}
        className="w-full rounded bg-blue-600 py-3 text-lg font-medium text-white transition hover:bg-blue-700"
      >
        ADD
      </button>
    </form>

    {/* Main Content */}
    <div className="flex-1 px-4 md:px-8 lg:px-16 py-6 overflow-hidden">
      
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black">
        Notes
      </h1>

      <div
        style={{ scrollbarWidth: "none" }}
        className="mt-10 md:mt-16 flex flex-wrap justify-center lg:justify-start gap-4 pb-4 h-[70vh] overflow-y-scroll"
      >
        {data.map((note, idx) => (
          <div
            key={idx}
            style={{ backgroundColor: note.color }}
            className="relative h-[280px] w-full sm:w-[260px] rounded-xl px-5 py-4"
          >
            {/* Title */}
            <h2 className="max-w-[190px] text-lg md:text-[20px] font-medium leading-7 text-[#2D2D2D]">
              {note.heading}
            </h2>

            <p className="mt-2 text-sm md:text-base break-words">
              {note.note}
            </p>

            {/* Bottom */}
            <div className="absolute bottom-6 left-5 right-5 flex items-center justify-between">
              
              <p className="text-xs md:text-sm text-gray-700">
                {note.date}
              </p>

              <button className="flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full bg-black text-white">
                <MdDeleteForever
                  onClick={() => noteDelete(idx)}
                  size={22}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
  );
}
