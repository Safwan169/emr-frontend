import React, { useEffect, useRef, useState } from "react";
import { Mic, Printer, StopCircle } from "lucide-react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

const ffmpeg = new FFmpeg();
const ConsultationN: React.FC = () => {
  const [notes, setNotes] = useState<string>("");
  const [prescription, setPrescription] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  // Initialize FFmpeg once when component mounts
  useEffect(() => {
    const initFFmpeg = async () => {
      if (!ffmpeg.loaded) {
        try {
          console.log("Initializing FFmpeg...");
          await ffmpeg.load();
          console.log("FFmpeg initialized successfully");
        } catch (error) {
          console.error("Failed to initialize FFmpeg:", error);
        }
      }
    };
    initFFmpeg();
  }, []);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus' // Specify codec for better compatibility
      });
      mediaRecorderRef.current = mediaRecorder;
      setAudioChunks([]);

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setAudioChunks((prev) => [...prev, e.data]);
        }
      };

      mediaRecorder.onstop = () => {
        console.log("Recording stopped, chunks collected:", audioChunks.length);
      };

      mediaRecorder.onstart = () => setIsRecording(true);
      mediaRecorder.start(100); // Collect data every 100ms
    } catch (error) {
      console.error("Microphone access denied or error:", error);
      alert("Microphone permission is required.");
      setIsModalOpen(false);
    }
  };

  const handleStopRecording = async () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current?.stop();
    }
    mediaRecorderRef.current?.stream.getTracks().forEach((track) => track.stop());
    setIsRecording(false);
    setIsProcessing(true);

    setTimeout(async () => {
      try {
        console.log("Audio chunks available:", audioChunks.length);
        
        if (audioChunks.length === 0) {
          throw new Error("No audio data available");
        }

        const webmBlob = new Blob(audioChunks, { type: "audio/webm" });
        console.log("WebM blob size:", webmBlob.size);

        if (webmBlob.size === 0) {
          throw new Error("Audio blob is empty");
        }

        if (!ffmpeg.loaded) {
          console.log("Loading FFmpeg...");
          await ffmpeg.load();
          console.log("FFmpeg loaded successfully");
        }

        const inputFileName = `input_${Date.now()}.webm`;
        const outputFileName = `output_${Date.now()}.mp3`;
        
        console.log("Writing input file to FFmpeg...");
        await ffmpeg.writeFile(inputFileName, await fetchFile(webmBlob));
        
        console.log("Converting to MP3...");
        // More robust FFmpeg command
        await ffmpeg.exec([
          "-i", inputFileName,
          "-vn", // No video
          "-acodec", "mp3", // Use MP3 codec explicitly
          "-ar", "44100", // Sample rate
          "-ac", "2", // Stereo
          "-ab", "128k", // Audio bitrate
          "-f", "mp3", // Force MP3 format
          "-y", // Overwrite output file if exists
          outputFileName
        ]);

        console.log("Conversion completed, reading output...");
        
        let mp3Data;
        try {
          mp3Data = await ffmpeg.readFile(outputFileName);
        } catch (readError) {
          console.error("Failed to read output file:", readError);
          
          console.log("Trying alternative conversion...");
          const altOutputName = `alt_output_${Date.now()}.mp3`;
          
          await ffmpeg.exec([
            "-i", inputFileName,
            "-codec:a", "libmp3lame",
            "-b:a", "128k",
            "-ar", "44100",
            altOutputName
          ]);
          
          mp3Data = await ffmpeg.readFile(altOutputName);
          await ffmpeg.deleteFile(altOutputName);
        }
        
        if (!mp3Data || (mp3Data as Uint8Array).length === 0) {
          throw new Error("MP3 conversion failed - output file is empty");
        }
        
        const mp3Blob = new Blob([mp3Data as Uint8Array], { type: "audio/mpeg" });
        console.log("MP3 blob size:", mp3Blob.size);

        try {
          await ffmpeg.deleteFile(inputFileName);
          await ffmpeg.deleteFile(outputFileName);
          console.log("Cleanup completed");
        } catch (cleanupError) {
          console.warn("Cleanup warning:", cleanupError);
        }

        const formData = new FormData();
        formData.append("audioFile", mp3Blob, "recording.mp3");
        formData.append("appointment_id", "4");
        formData.append("patient_id", "2");
        formData.append("doctor_id", "3");
        
        console.log("Uploading MP3 to backend...");
        
        // Upload to backend
        const response = await fetch("http://localhost:5000/Conversations", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Upload failed: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const result = await response.json();
        console.log("Upload success:", result);
        alert("Voice uploaded successfully!");
        
      } catch (error) {
        console.error("Conversion/upload error:", error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        alert(`Failed to convert or upload voice: ${errorMessage}`);
      } finally {
        setIsModalOpen(false);
        setIsProcessing(false);
        setAudioChunks([]); // Clear chunks for next recording
      }
    }, 1000); // Increased timeout to ensure chunks are ready
  };

  // When modal opens, start recording
  useEffect(() => {
    if (isModalOpen) {
      handleStartRecording();
    }
  }, [isModalOpen]);

  return (
    <div className="w-full h-auto rounded-lg bg-white">
      <div className="py-5 px-5">
        <div className="w-full h-auto border border-gray-200 rounded-lg p-5 bg-white">
          <h2 className="text-xl font-bold text-gray-700 mb-2">Consultation Notes</h2>
          <hr className="mb-4 border-gray-200" />

          <div className="border border-gray-200 rounded-lg bg-white p-4 mb-4">
            <textarea
              className="w-full rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              rows={4}
              placeholder="Write consultation notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <button
            className="flex items-center gap-2 px-8 py-4 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setIsModalOpen(true)}
            disabled={isProcessing}
          >
            <Mic className="w-5 h-5" />
            {isProcessing ? "Processing..." : "Voice to Text"}
          </button>

          <h2 className="text-sm font-semibold text-gray-700 mb-2">E-Prescription</h2>

          <div className="border border-gray-200 rounded-lg bg-white p-4 mb-4">
            <textarea
              className="w-full rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              rows={4}
              placeholder="Write e-prescription or use voice-to-text..."
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
            />
          </div>

          <div className="flex gap-4 mt-6">
            <button className="flex items-center justify-center px-8 py-4 bg-blue-900 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-800 transition">
              Save & Continue
            </button>
            <button className="flex items-center justify-center gap-2 px-8 py-4 bg-gray-300 text-blue-800 text-sm font-medium rounded-lg shadow hover:bg-gray-400 transition">
              <Printer className="w-5 h-5" />
              Print Prescription
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md text-center relative">
            {isProcessing ? (
              <>
                <h2 className="text-lg font-bold mb-4">Converting to MP3...</h2>
                <div className="w-8 h-8 mx-auto mb-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-gray-600">Please wait while we process your audio</p>
              </>
            ) : (
              <>
                <h2 className="text-lg font-bold mb-4">Recording...</h2>
                {/* Pulsing Animation */}
                {isRecording && <div className="w-4 h-4 mx-auto mb-4 rounded-full bg-red-500 animate-ping" />}
                <button
                  onClick={handleStopRecording}
                  className="mt-4 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center justify-center mx-auto gap-2"
                  disabled={isProcessing}
                >
                  <StopCircle className="w-5 h-5" />
                  Stop Recording
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultationN;