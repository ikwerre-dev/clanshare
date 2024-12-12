import React, { useState, useCallback, useRef, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { Link2, Upload, Check, Copy, X, Download } from 'lucide-react'
import Lenis from '@studio-freight/lenis'


const FileTunnel = () => {
    const [tunnelMode, setTunnelMode] = useState(null)
    const [tunnelCode, setTunnelCode] = useState('')
    const [joinCode, setJoinCode] = useState('')
    const [isJoined, setIsJoined] = useState(false)
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [receivedFiles, setReceivedFiles] = useState([])
    const [isUploading, setIsUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [copiedCode, setCopiedCode] = useState(false)
    const [connectedUsers, setConnectedUsers] = useState(0)
    const dropzoneRef = useRef(null)
    console.log(receivedFiles)
    // console.log(uploadedFiles)
    console.log(receivedFiles && receivedFiles.flat().map((file, index) => file.name));
    
    const generateTunnelCode = () => {
        return Math.floor(100000 + Math.random() * 900000).toString()
    }

    const handleCreateTunnel = () => {
        const newCode = generateTunnelCode()
        setTunnelMode('create')
        setTunnelCode(newCode)
        socket.emit('generateCode', newCode)
        setIsJoined(true)
    }

    const handleJoinTunnel = () => {
        if (joinCode.length === 6) {
            setTunnelMode('join')
            setIsJoined(true)
            socket.emit('joinCode', joinCode)
        }
    }

    const handleCloseTunnel = () => {
        socket.emit('leaveRoom')
        setTunnelMode(null)
        setTunnelCode('')
        setJoinCode('')
        setIsJoined(false)
        setUploadedFiles([])
        setReceivedFiles([])
    }

    const onDrop = useCallback((acceptedFiles) => {
        if (connectedUsers > 1) {
            setIsUploading(true)
            let progress = 0
            const interval = setInterval(() => {
                progress += 10
                setUploadProgress(progress)
                if (progress >= 100) {
                    clearInterval(interval)
                    setTimeout(() => {
                        setIsUploading(false)
                        setUploadProgress(0)
                        const newFiles = acceptedFiles.map(file => ({
                            name: file.name,
                            url: URL.createObjectURL(file)
                        }))
                        setUploadedFiles(prev => [...prev, ...newFiles])
                        socket.emit('sendFile', newFiles)
                    }, 500)
                }
            }, 100)
        } else {
            alert("Please wait for at least one other user to join before uploading files.")
        }
    }, [connectedUsers])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: true,
        disabled: connectedUsers <= 1
    })

    const handleCopyCode = () => {
        navigator.clipboard.writeText(tunnelCode)
        setCopiedCode(true)
        setTimeout(() => setCopiedCode(false), 2000)
    }
    // const renderFileList = (files) => (
    //     <ul className="mt-4 space-y-2">
    //         {files.flat().map((file, index) => (
    //             <li key={index} className="text-gray-300 py-2 flex justify-between items-center">
    //                 <p className="text-gray-300 underline underline-offset-4 cursor-pointer">{file.name}</p>
    //                 <a href={file.url} download={file.name} className="text-purple-400 hover:text-purple-300">
    //                     <Download className="w-5 h-5" />
    //                 </a>
    //             </li>
    //         ))}
    //     </ul>
    // );
    const renderFileList = (files) => (
        <ul className="mt-4 space-y-2">
            {files.flat().map((file, index) => (
                <li key={index} className="text-gray-300 py-2 flex justify-between items-center">
                    <p className="text-gray-300 underline underline-offset-4 cursor-pointer">{file.name}</p>
                    <a
                        href={file.url}
                        download={file.name}
                        className="text-purple-400 hover:text-purple-300"
                        onClick={(e) => {
                            e.preventDefault();
                            fetch(file.url)
                                .then(response => response.blob())
                                .then(blob => {
                                    const url = window.URL.createObjectURL(blob);
                                    const a = document.createElement('a');
                                    a.style.display = 'none';
                                    a.href = url;
                                    a.download = file.name;
                                    document.body.appendChild(a);
                                    a.click();
                                    window.URL.revokeObjectURL(url);
                                });
                        }}
                    >
                        <Download className="w-5 h-5" />
                    </a>
                </li>
            ))}
        </ul>
    );
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-purple-900/30 to-black">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mt-10 mb-6">
                        <span className="text-purple-400">File Tunnel</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-8">
                        Create a secure tunnel to share files instantly.
                    </p>
                </div>

                {!tunnelMode && (
                    <div className="flex flex-col md:flex-row justify-center gap-2 md:space-x-4 mb-[10rem]">
                        <button
                            onClick={handleCreateTunnel}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
                        >
                            Create Tunnel
                        </button>
                        <button
                            onClick={() => setTunnelMode('join')}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
                        >
                            Join Tunnel
                        </button>
                    </div>
                )}

                <div className="w-full flex justify-center items-center mb-16">
                    {tunnelMode &&
                        <div
                            ref={dropzoneRef}
                            className="relative max-w-4xl w-full h-[25rem] rounded-lg border-2 border-dashed border-gray-400 transition-colors hover:border-purple-400 overflow-hidden"
                        >
                            {tunnelMode === 'create' && (
                                <div className="absolute z-20 top-4 left-4 right-4 flex justify-between items-center">
                                    <div className="flex items-center space-x-2 bg-purple-500/20 px-4 py-2 rounded-2xl backdrop-blur-sm">
                                        <Link2 className="w-5 h-5 text-purple-400" />
                                        <p className="text-purple-400">Tunnel Code: {tunnelCode}</p>
                                    </div>
                                    <button
                                        onClick={handleCopyCode}
                                        className="flex items-center space-x-2 text-sm text-gray-400 hover:text-purple-400"
                                    >
                                        {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                                    </button>
                                </div>
                            )}

                            {tunnelMode === 'join' && !isJoined && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-black p-6 rounded-lg shadow-lg w-80">
                                        <input
                                            type="text"
                                            value={joinCode}
                                            onChange={(e) => setJoinCode(e.target.value)}
                                            placeholder="Enter 6-digit code"
                                            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mb-4"
                                            maxLength={6}
                                        />
                                        <button
                                            onClick={handleJoinTunnel}
                                            className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                                            disabled={joinCode.length !== 6}
                                        >
                                            Join Tunnel
                                        </button>
                                    </div>
                                </div>
                            )}

                            {(tunnelMode === 'create' || (tunnelMode === 'join' && isJoined)) && (
                                <div {...getRootProps()} className="absolute inset-0">
                                    <input {...getInputProps()} />

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
                                        ) : (
                                            <div className="text-center text-gray-300 z-10">
                                                <Upload className="w-16 h-16 mx-auto mb-4 text-purple-400" />
                                                <p className="text-lg mb-2">
                                                    {connectedUsers > 1
                                                        ? "Drop your files here, or click to select"
                                                        : "Waiting for other users to join..."}
                                                </p>
                                                <p className="text-sm text-gray-400">Maximum file size: 100MB</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    }
                </div>

                {(tunnelMode === 'create' || (tunnelMode === 'join' && isJoined)) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        <div className="bg-purple-900/10 p-6 rounded-lg backdrop-blur-sm">
                            <h3 className="text-xl font-semibold text-white mb-4">Uploaded Files</h3>
                            {renderFileList(uploadedFiles)}
                        </div>
                        <div className="bg-purple-900/10 p-6 rounded-lg backdrop-blur-sm">
                            <h3 className="text-xl font-semibold text-white mb-4">Received Files</h3>
                            {renderFileList(receivedFiles)}
                           
                        </div>
                    </div>
                )}

                {tunnelMode && (
                    <div className="text-center">
                        <button
                            onClick={handleCloseTunnel}
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
                        >
                            Close Tunnel
                        </button>
                    </div>
                )}

                {(tunnelMode === 'create' || (tunnelMode === 'join' && isJoined)) && (
                    <div className="text-center mt-4">
                        <p className="text-gray-300">Connected Users: {connectedUsers}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FileTunnel

