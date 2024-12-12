import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { motion } from "framer-motion";
import axios from "axios";
import { useParams } from "react-router-dom";
import { saveAs } from "file-saver";
import fileDownload from "js-file-download";

const FileTunnel = () => {
  const { access } = useParams(); // Extracting the :access parameter
  const [fileData, setFileData] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchFileData = async () => {
      try {
        const response = await axios.post(`${apiUrl}/fetch`, {
          file_id: access,
        });
        setFileData(response.data);
      } catch (error) {
        console.error("Error fetching file data:", error);
      }
    };

    fetchFileData();
  }, [access]);

  const handleDownload = async (mylink) => {
    try {
      await axios.post(`${apiUrl}/addDownloadCount`, {
        file_id: access,
      });

      // saveAs(`${apiUrl}${mylink}`);
      console.log(mylink)
      

      downloadFile(apiUrl + mylink, access);
    } catch (error) {
      console.error(
        "Error updating download count or triggering download:",
        error,
      );
    }
  };

  const downloadFile = async (url, filename) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = filename; // This forces the browser to download the file
    link.click();
  };
  const formatFileSize = (sizeInBytes) => {
    return (sizeInBytes / (1024 * 1024)).toFixed(2) + " MB"; // Convert bytes to MB with two decimal places
  };

  if (!fileData) {
    return (
      <div className="bg-[#000] min-h-screen flex items-center justify-center text-white">
        Loading file data...
      </div>
    );
  }
  if (fileData.error) {
    return (
      <div className="bg-[#000] min-h-screen flex items-center justify-center text-white">
        {fileData.error}
      </div>
    );
  }

  return (
    <div className="bg-[#000] min-h-screen">
      <Header />
      <div className="relative min-h-screen bg-gradient-to-b from-black via-purple-900/30 to-black">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="text-purple-400">Download</span> Zone
              <br />
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Securely download your files at light speed.
            </p>
          </div>

          <div className="w-full flex justify-center items-center mb-16">
            <div className="relative max-w-4xl w-full h-[25rem] rounded-lg border-2 border-dashed border-gray-400 transition-colors hover:border-purple-400  overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1.4, 1.6, 1.8],
                    opacity: [0.1, 0.2, 0.4, 0.2, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                  className="absolute w-full h-full"
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-400/20"
                      style={{
                        width: `${(i + 1) * 20}%`,
                        height: `${(i + 1) * 20}%`,
                      }}
                    />
                  ))}
                </motion.div>
              </div>
              <div className="absolute flex w-full flex-col items-center justify-center space-y-4 z-50 p-8  rounded-lg">
                <p className="text-purple-400 text-lg font-semibold">
                  File Name:{" "}
                  <span className="text-white">{fileData.filename}</span>
                </p>
                <p className="text-purple-400 text-lg font-semibold">
                  File Size:{" "}
                  <span className="text-white">
                    {formatFileSize(fileData.file_size)}
                  </span>
                </p>
                <p className="text-purple-400 text-lg font-semibold">
                  File Type:{" "}
                  <span className="text-white">{fileData.file_type}</span>
                </p>
                <p className="text-purple-400 text-lg font-semibold">
                  Uploaded at:{" "}
                  <span className="text-white">{fileData.uploaded_at}</span>
                </p>
                <p className="text-purple-400 text-lg font-semibold">
                  Total Views:{" "}
                  <span className="text-white">{fileData.view_count}</span>
                </p>
                <p className="text-purple-400 text-lg font-semibold">
                  Total Downloads:{" "}
                  <span className="text-white">{fileData.download_count}</span>
                </p>
                <button
                  onClick={() => handleDownload(fileData.link)}
                  className="block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg mt-4"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FileTunnel;
