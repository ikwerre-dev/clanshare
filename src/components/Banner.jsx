"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import {
  Link2,
  Upload,
  Check,
  Copy,
  Zap,
  Shield,
  Globe,
  Users,
  Download,
  Redo,
  EyeIcon,
} from "lucide-react";
import Lenis from "@studio-freight/lenis";
import { MessageSquare, Lock, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function HeroSection() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const currentURL = window.location.href.replace(/\/$/, "");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isClickable, setIsClickable] = useState(true);
  const [shareLink, setShareLink] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const dropzoneRef = useRef(null);
  const [stats, setStats] = useState({
    links: 0,
    users: 0,
    downloads: 0,
  });
  const [statsAPi, setStatsAPi] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (statsAPi) {
        setStats((prev) => ({
          links:
            (statsAPi.total_files ?? 0),
          users:
            (statsAPi.total_views ?? 0)
             ,
          downloads:
           (statsAPi.total_downloads ?? 0)
            ,
        }));
      }
    }, 50);
  
    return () => clearInterval(interval);
  }, [statsAPi]);
 
  useEffect(() => {
    const fetchStats = () => {
      axios
        .get(`${apiUrl}/fetchStats`, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // console.log(response.data);
          setStatsAPi(response.data);
        })
        .catch((error) => {
          console.error("Error fetching stats:", error);
        });
    };

    fetchStats(); 

    const interval = setInterval(() => {
      fetchStats();
    }, 5000);  

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchStats = () => {
      axios
        .get(`${apiUrl}/fetchStats`, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          setStatsAPi(response.data);
        })
        .catch((error) => {
          console.error("Error fetching stats:", error);
        });
    };

    fetchStats(); 

    const interval = setInterval(() => {
      fetchStats();
    }, 5000);  

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length === 1) {
      const file = acceptedFiles[0];

      const maxSizeInBytes = 300 * 1024 * 1024; // 300MB
      if (file.size > maxSizeInBytes) {
        Swal.fire({
          icon: "error",
          title: "File Too Large",
          text: "The file exceeds the maximum size of 300MB.",
          confirmButtonText: "Ok",
        });
        return; // Prevent the upload if the file is too large
      }

      setIsUploading(true);
      setShareLink(null);

      const formData = new FormData();
      formData.append("file", file);

      axios
        .post(`${apiUrl}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );
            setUploadProgress(percentCompleted);
          },
        })
        .then((response) => {
          console.log(response.data);
          setIsUploading(false);
          setIsClickable(false);
          setUploadProgress(0);
          setShareLink(currentURL + "/d/" + response.data.access_code); 
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          setIsUploading(false);
          setUploadProgress(0);
          Swal.fire({
            icon: "error",
            title: "Upload Failed",
            text: "There was an error uploading the file. Please try again.",
            confirmButtonText: "Ok",
          });
        });
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
  });

  const handleCopyLink = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(shareLink);  
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleRestart = (e) => {
    e.preventDefault();
    setIsClickable(true);
    setIsUploading(false);
    setShareLink(null);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-purple-900/30 to-black">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="text-purple-400">Share files instantly</span> with
            <br />
            anyone, anywhere
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Upload your file and get a shareable link in seconds.
          </p>
          {/* <div className="flex flex-row justify-center items-center gap-5">
            <p className="text-white">or</p>
            <Link
              to={"/tunnel"}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Use Tunnel
            </Link>
          </div> */}
        </div>

        <div className="w-full flex justify-center items-center mb-16">
          <div
            {...getRootProps()}
            ref={dropzoneRef}
            className="relative cursor-pointer max-w-4xl w-full h-[25rem] rounded-lg border-2 border-dashed border-gray-400 transition-colors hover:border-purple-400 overflow-hidden"
          >
            {isClickable && <input {...getInputProps()} />}

            {/* Background Circles */}
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

            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatePresence>
                {isDragActive && (
                  <>
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 2, opacity: 0.1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute w-48 h-48 rounded-full border border-purple-400"
                    />
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1.5, opacity: 0.2 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute w-48 h-48 rounded-full border border-purple-400"
                    />
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.3 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute w-48 h-48 rounded-full border border-purple-400"
                    />
                  </>
                )}
              </AnimatePresence>

              {isUploading ? (
                <div className="flex flex-col items-center space-y-4 z-10">
                  <div className="w-20 h-20 rounded-full border-4 border-purple-500 border-t-transparent animate-spin" />
                  <p className="text-purple-400">{uploadProgress}%</p>
                </div>
              ) : shareLink ? (
                <div
                  className="flex flex-col items-center space-y-4  z-50"
                  onClick={handleCopyLink}
                >
                  <div className="flex items-center space-x-2  z-50 bg-purple-500/20 px-4 py-2 rounded-2xl backdrop-blur-sm">
                    <Link2 className="w-5 h-5 text-purple-400" />
                    <p className="text-purple-400">{shareLink}</p>
                  </div>
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center  z-50 space-x-2 text-sm text-gray-400 hover:text-purple-400"
                  >
                    {copiedLink ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    <span>{copiedLink ? "Copied!" : "Click to copy link"}</span>
                  </button>

                  <button
                    onClick={handleRestart}
                    className="flex items-center  z-50 space-x-2 text-sm text-gray-400 hover:text-purple-400"
                  >
                    <Redo className="w-4 h-4" />
                    <span>Restart</span>
                  </button>
                </div>
              ) : (
                <div className="text-center text-gray-300 z-10">
                  <Upload className="w-16 h-16 mx-auto mb-4 text-purple-400" />
                  <p className="text-lg mb-2">
                    Drop your file here, or click to select
                  </p>
                  <p className="text-sm text-gray-400">
                    Maximum file size: 300MB
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="text-center pt-5 mb-5">
          <h2 className="text-4xl text-white font-bold mb-2">
            <span className="text-purple-500">Product</span> Stats
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center p-8 bg-purple-900/10 rounded-lg backdrop-blur-sm"
          >
            <Link2 className="w-8 h-8 text-purple-400 mb-4" />
            <div className="text-4xl font-bold text-white mb-2">
              {stats && stats.links && stats.links.toLocaleString()}
            </div>
            <div className="text-gray-400">Links Created</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center justify-center p-8 bg-purple-900/10 rounded-lg backdrop-blur-sm"
          >
            <EyeIcon className="w-8 h-8 text-purple-400 mb-4" />
            <div className="text-4xl font-bold text-white mb-2">
              {stats && stats.users && stats.users.toLocaleString()}
            </div>
            <div className="text-gray-400">Total Link Views</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center justify-center p-8 bg-purple-900/10 rounded-lg backdrop-blur-sm"
          >
            <Download className="w-8 h-8 text-purple-400 mb-4" />
            <div className="text-4xl font-bold text-white mb-2">
              {stats && stats.downloads && stats.downloads.toLocaleString()}
            </div>
            <div className="text-gray-400">Total Downloads</div>
          </motion.div>
        </div>

        <div className="w-full  text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-2">
                <span className="text-purple-500">Privacy</span> Built-in
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
              {/* Opt-in Feature */}
              <div className="flex gap-6">
                <MessageSquare className="w-6 h-6 text-purple-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-xl mb-2">
                    Opt-in to Superhuman AI
                  </h3>
                  <p className="text-gray-400">
                    You decide whether you want to use Superhuman AI. You can
                    opt-out at any time.
                  </p>
                </div>
              </div>

              {/* No Third-Party Storage */}
              <div className="flex gap-6">
                <Lock className="w-6 h-6 text-purple-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-xl mb-2">
                    No Third-Party Data Storage
                  </h3>
                  <p className="text-gray-400">
                    We have a Zero Day Data Retention agreement, so your data
                    will not be saved or retained by OpenAI.
                  </p>
                </div>
              </div>

              {/* Minimal Data Logs */}
              <div className="flex gap-6">
                <Settings className="w-6 h-6 text-purple-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-xl mb-2">
                    Minimal Data Logs
                  </h3>
                  <p className="text-gray-400">
                    We log custom instructions sent to OpenAI, which do not
                    include any email data. We do not log any AI responses.
                  </p>
                </div>
              </div>

              {/* Data Protection */}
              <div className="flex gap-6">
                <Shield className="w-6 h-6 text-purple-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-xl mb-2">
                    Data Protection Policies
                  </h3>
                  <p className="text-gray-400">
                    We have not and will not opt-in to sharing your data with
                    OpenAI so they can train their models.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <h2 className="text-3xl font-bold text-center mb-12">
                Quick Note from the Creator...
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-purple-900/10 rounded-lg p-6">
                  <p className="text-gray-300 mb-4">
                    Been able to Build a secure sharing tunnel for you to share
                    files and Apps within yourself, This Project is open source,
                    Feel Free to Star, Fork this repo... Happy Coding :)
                  </p>
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-semibold">Robinson Honour</p>
                      <p className="text-gray-400 text-sm">
                        FullStack Developer
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mb-5">
          <h2 className="text-4xl text-white font-bold mb-2">
            <span className="text-purple-500">Key</span> Features
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8  mb-16 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-8 bg-purple-900/20 rounded-lg backdrop-blur-sm"
          >
            <Zap className="w-12 h-12 mx-auto mb-4 text-purple-400" />
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-gray-300">
              Upload and share your files in seconds, not minutes.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-8 bg-purple-900/20 rounded-lg backdrop-blur-sm"
          >
            <Shield className="w-12 h-12 mx-auto mb-4 text-purple-400" />
            <h3 className="text-xl font-semibold mb-2">Secure Sharing</h3>
            <p className="text-gray-300">
              Your files are encrypted and protected during transfer.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="p-8 bg-purple-900/20 rounded-lg backdrop-blur-sm"
          >
            <Globe className="w-12 h-12 mx-auto mb-4 text-purple-400" />
            <h3 className="text-xl font-semibold mb-2">Global Access</h3>
            <p className="text-gray-300">
              Share your files with anyone, anywhere in the world.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
