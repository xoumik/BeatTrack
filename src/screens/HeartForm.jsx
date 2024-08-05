import React, { useState } from "react";
import Papa from "papaparse";

const HeartForm = () => {
  const [bpm, setBpm] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [formData, setFormData] = useState({
    userFirstName: "",
    userLastName: "",
    userSex: "",
    userAge: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBpmCheck = () => {
    // Check if required fields are filled
    if (!formData.userFirstName || !formData.userAge || !formData.userSex) {
      alert("Please fill out all required fields: First Name, Age, and Sex.");
      return;
    }

    fetch("/data.csv")
      .then((response) => response.text())
      .then((data) => {
        Papa.parse(data, {
          complete: (result) => {
            const bpmValues = result.data.flat();
            if (bpmValues.length > 0) {
              const bpmValue = bpmValues[0]; // Assuming we want the first BPM value
              setBpm(bpmValue);
              predictBpm(bpmValue);
            }
          },
        });
      });
  };

  const predictBpm = (bpmValue) => {
    const age = parseInt(formData.userAge, 10);
    let predictionText = "";
    let suggestions = "";

    if (bpmValue < 60) {
      predictionText = `Hi ${formData.userFirstName}, your BPM is too low.`;
      suggestions = "Consider consulting a doctor. Ensure you're eating a balanced diet and staying hydrated.";
    } else if (bpmValue >= 60 && bpmValue <= 100) {
      predictionText = `Hi ${formData.userFirstName}, your BPM is normal.`;
      suggestions = "Maintain a healthy lifestyle. Continue regular physical activity and a balanced diet.";
    } else {
      predictionText = `Hi ${formData.userFirstName}, your BPM is too high.`;
      suggestions = "Consider consulting a doctor. Avoid caffeine and reduce stress. Engage in regular physical activity.";
    }

    // Adjust suggestions based on age
    if (age >= 60) {
      suggestions += " For older adults, regular check-ups are recommended to monitor heart health.";
    }

    setPrediction({ predictionText, suggestions });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-green-700 mb-6">
          Check Your Heart
        </h1>
        <form className="space-y-4">
          <div>
            <input
              className="w-full py-3 px-4 bg-gray-200 rounded-lg"
              type="text"
              name="userFirstName"
              id="userFirstName"
              placeholder="First Name"
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <input
              className="w-full py-3 px-4 bg-gray-200 rounded-lg"
              type="text"
              name="userLastName"
              id="userLastName"
              placeholder="Last Name"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <select
              name="userSex"
              id="userSex"
              className="w-full py-3 px-4 bg-gray-200 rounded-lg"
              onChange={handleInputChange}
              required
            >
              <option value="" disabled selected>
                Sex
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <input
              className="w-full py-3 px-4 bg-gray-200 rounded-lg"
              type="number"
              name="userAge"
              id="userAge"
              placeholder="Age"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col items-center">
            <button
              className="w-full py-3 px-4 bg-green-700 text-white rounded-lg hover:bg-green-600"
              type="button"
              onClick={handleBpmCheck}
            >
              Check your BPM
            </button>
            {bpm && (
              <div className="mt-4 p-3 w-full bg-gray-200 rounded-lg text-center">
                BPM: {bpm}
              </div>
            )}
          </div>
          {prediction && (
            <div className="mt-4 p-3 w-full bg-gray-200 rounded-lg text-center">
              <p>{prediction.predictionText}</p>
              <p>{prediction.suggestions}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default HeartForm;
