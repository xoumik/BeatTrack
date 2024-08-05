// src/App.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Loader } from 'lucide-react';

const ImagePrediction = () => {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction('');
    const formData = new FormData();
    formData.append('imagefile', image);

    try {
      const response = await axios.post('http://localhost:5000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error uploading the image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-100 via-green-200 to-green-300 p-4">
      <div className="w-full max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">Brain Tumor Classifier</h1>
        <p className="text-base text-gray-700 mb-6 text-center">
          Upload an MRI image to check for the presence of brain tumors. Our model can identify glioma, meningioma, pituitary tumors, and healthy brain tissues.
        </p>

        <form
          onSubmit={handleImageSubmit}
          method="post"
          encType="multipart/form-data"
          className="flex flex-col gap-4"
        >
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-600 p-3"
            type="file"
            name="imagefile"
            onChange={handleImageChange}
          />
          <button
            className="w-full px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
            type="submit"
          >
            Predict Image
          </button>
        </form>

        {loading ? (
          <div className="flex justify-center items-center mt-6">
            <Loader size={32} className="animate-spin text-green-600" />
          </div>
        ) : (
          prediction && (
            <p className="text-center text-xl mt-6 text-gray-800">
              The MRI image is classified as <span className="font-semibold text-green-600">{prediction}</span>.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default ImagePrediction;
