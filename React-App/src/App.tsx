import React, { useRef } from "react";
import './App.css';
import {readInputCSV, processCSVtoJSON} from './utils/csvParser'

// comment for diff
const App: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log("Selected file:", file.name);
      // You can add logic here to process the file

      const data = await readInputCSV(file)

    }
  };

  return (
    <div >
      <h1>CSV Parser</h1>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

    </div>
  );
};

export default App;