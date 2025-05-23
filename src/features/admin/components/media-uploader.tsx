"use client"

import type React from "react"

import { useState, useRef, type ChangeEvent } from "react"
import * as tus from "tus-js-client"
import { Cloud } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MediaUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [fileType, setFileType] = useState<"image" | "video" | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [title, setTitle] = useState("")
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("idle") // idle, preparing, uploading, success, error
  const [errorMessage, setErrorMessage] = useState("")
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const uploadRef = useRef<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)

      // Use file name as default title if none is set
      if (!title) {
        setTitle(selectedFile.name.split(".")[0])
      }

      // Determine file type
      if (selectedFile.type.startsWith("image/")) {
        setFileType("image")
        createImagePreview(selectedFile)
      } else if (selectedFile.type.startsWith("video/")) {
        setFileType("video")
        createVideoPreview(selectedFile)
      } else {
        setErrorMessage("Unsupported file type")
        setFile(null)
        setFileType(null)
        setPreview(null)
      }
    }
  }

  const createImagePreview = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        setPreview(e.target.result as string)

        // Get image dimensions
        const img = new Image()
        img.onload = () => {
          setDimensions({
            width: img.width,
            height: img.height,
          })
        }
        img.src = e.target.result as string
      }
    }
    reader.readAsDataURL(file)
  }

  const createVideoPreview = (file: File) => {
    const videoUrl = URL.createObjectURL(file)
    setPreview(videoUrl)

    // Get video dimensions
    const video = document.createElement("video")
    video.onloadedmetadata = () => {
      setDimensions({
        width: video.videoWidth,
        height: video.videoHeight,
      })
    }
    video.src = videoUrl
  }

  const startUpload = async () => {
    if (!file) {
      setErrorMessage("Please select a file first")
      return
    }

    // For images, just notify the parent that we have an image ready
    // The actual upload logic will be handled by the parent component
    if (fileType === "image") {
      // This is where you would call your image upload handler
      alert("Image selected: " + file.name + ". Implement your image upload logic here.")
      return
    }

    // For videos, use the existing video upload logic
    try {
      setStatus("preparing")
      setErrorMessage("")

      // Step 1: Create video in Bunny Stream via our API
      const createResponse = await fetch("/api/uploads/create-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title || file.name.split(".")[0],
        }),
      })

      if (!createResponse.ok) {
        const error = await createResponse.text()
        throw new Error(error || "Failed to create video")
      }

      const { videoId, libraryId, authSignature, authExpire } = await createResponse.json()

      // Step 2: Initialize tus upload
      const upload = new tus.Upload(file, {
        endpoint: "https://video.bunnycdn.com/tusupload",
        retryDelays: [0, 3000, 5000, 10000, 20000, 60000],
        headers: {
          AuthorizationSignature: authSignature,
          AuthorizationExpire: authExpire,
          VideoId: videoId,
          LibraryId: libraryId,
        },
        metadata: {
          filetype: file.type,
          title: title || file.name.split(".")[0],
        },
        onError: (error) => {
          console.error("Upload error:", error)
          setStatus("error")
          setErrorMessage(`Upload failed: ${error.message || "Unknown error"}`)
        },
        onProgress: (bytesUploaded, bytesTotal) => {
          const percentage = Math.round((bytesUploaded / bytesTotal) * 100)
          setProgress(percentage)
          setStatus("uploading")
        },
        onSuccess: async () => {
          setStatus("success")
          setProgress(100)
          // Reset form after successful upload
          //TODO
          setTimeout(() => {
            setFile(null)
            setFileType(null)
            setPreview(null)
            setTitle("")
            setProgress(0)
            setStatus("idle")
            setDimensions({ width: 0, height: 0 })
          }, 3000)
        },
      })

      uploadRef.current = upload

      // Check for previous uploads to resume
      const previousUploads = await upload.findPreviousUploads()
      if (previousUploads.length) {
        upload.resumeFromPreviousUpload(previousUploads[0])
      }

      // Start the upload
      upload.start()
    } catch (error: any) {
      console.error("Upload preparation error:", error)
      setStatus("error")
      setErrorMessage(error.message || "Failed to start upload")
    }
  }

  const cancelUpload = () => {
    if (uploadRef.current) {
      uploadRef.current.abort()
      uploadRef.current = null
      setStatus("idle")
      setProgress(0)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]

      // Simulate file input change
      if (fileInputRef.current) {
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(droppedFile)
        fileInputRef.current.files = dataTransfer.files

        // Trigger change event manually
        const event = new Event("change", { bubbles: true })
        fileInputRef.current.dispatchEvent(event)
      }
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // Calculate container style based on media dimensions
  const getContainerStyle = () => {
    if (!preview) return {}

    const maxWidth = 640 // Maximum width for the container
    const maxHeight = 480 // Maximum height for the container

    let width = dimensions.width
    let height = dimensions.height

    // Scale down if needed while maintaining aspect ratio
    if (width > maxWidth) {
      const ratio = maxWidth / width
      width = maxWidth
      height = height * ratio
    }

    if (height > maxHeight) {
      const ratio = maxHeight / height
      height = maxHeight
      width = width * ratio
    }

    return {
      width: `${width}px`,
      height: `${height}px`,
    }
  }

  return (
    <div className="my-4">
      <div className="mb-4">
        <label className="block text-sm font-medium dark:text-stone-300 text-gray-700 mb-1">Media Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter media title"
          disabled={status === "uploading"}
        />
      </div>

      <div className="mb-4">
        <div
          onClick={triggerFileInput}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-accent/50 transition-colors"
        >
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            accept="image/*,video/*"
            className="hidden"
            disabled={status === "uploading"}
          />

          {!preview ? (
            <>
              <Cloud className="h-12 w-12 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 text-center">
                <span className="font-medium">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG, GIF or MP4, WebM, MOV</p>
            </>
          ) : (
            <div style={getContainerStyle()} className="relative overflow-hidden">
              {fileType === "image" ? (
                <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-contain" />
              ) : (
                <video src={preview} controls className="w-full h-full object-contain" />
              )}
            </div>
          )}
        </div>

        {file && (
          <p className="mt-1 text-sm text-gray-500">
            Selected: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
          </p>
        )}
      </div>

      {status === "uploading" && (
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="mt-1 text-sm text-center">{progress}% Uploaded</p>
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">{errorMessage}</div>
      )}

      {status === "success" && (
        <div className="mb-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded">
          Upload completed successfully!
        </div>
      )}

      <div className="flex justify-end ">
        <Button
          onClick={startUpload}
          disabled={!file || status === "uploading" || status === "preparing"}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
        >
          {status === "preparing" ? "Preparing..." : fileType === "image" ? "Process Image" : "upload media"}
        </Button>

        {status === "uploading" && (
          <Button
            onClick={cancelUpload}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  )
}

