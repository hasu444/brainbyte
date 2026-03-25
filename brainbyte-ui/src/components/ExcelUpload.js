import React, { useState } from "react";
import * as XLSX from "xlsx";
import { createQuiz } from "../services/api";

function ExcelUpload() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setMessage("");

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const json = XLSX.utils.sheet_to_json(sheet);

      if (!json.length) {
        throw new Error("Excel file is empty");
      }

      // ✅ Convert Excel → Backend format
      const questions = json.map((row, index) => {
        if (
          !row.Question ||
          !row.Option1 ||
          !row.Option2 ||
          !row.Option3 ||
          !row.Option4 ||
          !row.Answer
        ) {
          throw new Error(`Invalid data in row ${index + 1}`);
        }

        return {
          question: row.Question,
          options: [
            row.Option1,
            row.Option2,
            row.Option3,
            row.Option4,
          ],
          correct_option: Number(row.Answer), // must be 1-4
        };
      });

      const title = file.name.replace(/\..+$/, "");

      // 🔥 USE CORRECT API
      await createQuiz({
        title,
        description: "Created from Excel",
        time_limit: 10,
        category: "Excel Upload",
        questions,
      });

      setMessage("✅ Quiz uploaded successfully!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Upload failed. Check Excel format.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4 text-center">
      <h4 className="mb-3">📊 Upload Quiz via Excel</h4>

      <input
        type="file"
        accept=".xlsx, .xls"
        className="form-control w-50 mx-auto"
        onChange={handleFile}
      />

      {loading && (
        <p className="mt-3 text-primary">Uploading... ⏳</p>
      )}

      {message && (
        <div className="alert mt-3 alert-info">
          {message}
        </div>
      )}
    </div>
  );
}

export default ExcelUpload;