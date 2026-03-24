import React from "react";
import * as XLSX from "xlsx";
import axios from "axios";

function ExcelUpload() {
  const token = localStorage.getItem("token");

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const json = XLSX.utils.sheet_to_json(sheet);

      // Format data to match backend
      const questions = json.map((row) => ({
        question: row.Question,
        options: [row.Option1, row.Option2, row.Option3, row.Option4],
        correct_option: row.Answer, // should be 1-based index
      }));

      const title = file.name.replace(/\..+$/, ""); // use filename as quiz title

      await axios.post(
        "http://127.0.0.1:8000/api/quizzes/create/",
        {
          title,
          description: "Created from Excel",
          time_limit: 10,
          questions,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      alert("✅ Quiz uploaded successfully from Excel!");
    } catch (err) {
      console.error(err);
      alert("❌ Error uploading quiz. Check console.");
    }
  };

  return (
    <div className="text-center mt-4">
      <input type="file" accept=".xlsx, .xls" onChange={handleFile} />
    </div>
  );
}

export default ExcelUpload;