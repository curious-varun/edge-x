'use client';

import { useState, useRef } from 'react';
import * as tus from 'tus-js-client';

export default function VideoUploader() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle'); // idle, preparing, uploading, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const uploadRef = useRef(null);

  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      // Use file name as default title if none is set
      if (!title) {
        setTitle(selectedFile.name.split('.')[0]);
      }
    }
  };

  const startUpload = async () => {
    if (!file) {
      setErrorMessage('Please select a file first');
      return;
    }

    try {
      setStatus('preparing');
      setErrorMessage('');

      // Step 1: Create video in Bunny Stream via our API
      const createResponse = await fetch('/api/uploads/create-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          //@ts-ignore
          title: title || file.name.split('.')[0],
        }),
      });

      if (!createResponse.ok) {
        const error = await createResponse.text();
        throw new Error(error || 'Failed to create video');
      }

      const { videoId, libraryId, authSignature, authExpire } = await createResponse.json();

      // Step 2: Initialize tus upload
      const upload = new tus.Upload(file, {
        endpoint: 'https://video.bunnycdn.com/tusupload',
        retryDelays: [0, 3000, 5000, 10000, 20000, 60000],
        headers: {
          AuthorizationSignature: authSignature,
          AuthorizationExpire: authExpire,
          VideoId: videoId,
          LibraryId: libraryId,
        },
        metadata: {
          //@ts-ignore
          filetype: file.type,
          //@ts-ignore
          title: title || file.name.split('.')[0],
        },
        onError: (error) => {
          console.error('Upload error:', error);
          setStatus('error');
          setErrorMessage(`Upload failed: ${error.message || 'Unknown error'}`);
        },
        onProgress: (bytesUploaded, bytesTotal) => {
          const percentage = Math.round((bytesUploaded / bytesTotal) * 100);
          setProgress(percentage);
          setStatus('uploading');
        },
        onSuccess: (data) => {
          alert(JSON.stringify(data));
          setStatus('success');
          setProgress(100);
          // Reset form after successful upload
          setTimeout(() => {
            setFile(null);
            setTitle('');
            setProgress(0);
            setStatus('idle');
          }, 3000);
        },
      });

      //@ts-ignore
      uploadRef.current = upload;

      // Check for previous uploads to resume
      const previousUploads = await upload.findPreviousUploads();
      if (previousUploads.length) {
        upload.resumeFromPreviousUpload(previousUploads[0]);
      }

      // Start the upload
      upload.start();

    } catch (error) {
      console.error('Upload preparation error:', error);
      setStatus('error');
      // @ts-ignore
      setErrorMessage(error.message || 'Failed to start upload');
    }
  };

  const cancelUpload = () => {
    if (uploadRef.current) {
      // @ts-ignore
      uploadRef.current.abort();
      uploadRef.current = null;
      setStatus('idle');
      setProgress(0);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Upload Video</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Video Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter video title"
          disabled={status === 'uploading'}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Video File
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          accept="video/*"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={status === 'uploading'}
        />
        {file && (
          <p className="mt-1 text-sm text-gray-500">
            {/*  @ts-ignore */}
            Selected: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
          </p>
        )}
      </div>

      {status === 'uploading' && (
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="mt-1 text-sm text-center">{progress}% Uploaded</p>
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
          {errorMessage}
        </div>
      )}

      {status === 'success' && (
        <div className="mb-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded">
          Upload completed successfully!
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={startUpload}
          disabled={!file || status === 'uploading' || status === 'preparing'}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
        >
          {status === 'preparing' ? 'Preparing...' : 'Upload Video'}
        </button>

        {status === 'uploading' && (
          <button
            onClick={cancelUpload}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Cancel
          </button>
        )}
      </div>

    </div >
  );
}
