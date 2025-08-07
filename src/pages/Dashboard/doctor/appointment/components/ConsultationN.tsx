import React, { useEffect, useRef, useState } from "react";
import { Mic, Printer, StopCircle } from "lucide-react";

const ConsultationN: React.FC = () => {
  const [notes, setNotes] = useState<string>("");
  const [prescription, setPrescription] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  const handleVoiceToText = () => {
    setIsModalOpen(true);
  };

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      setAudioChunks([]);

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setAudioChunks((prev) => [...prev, e.data]);
        }
      };

      mediaRecorder.onstart = () => {
        setIsRecording(true);
      };

      mediaRecorder.start();
    } catch (error) {
      console.error("Microphone access denied or error occurred:", error);
      alert("Microphone permission is required.");
      setIsModalOpen(false);
    }
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current?.stop();
    mediaRecorderRef.current?.stream.getTracks().forEach((track) => track.stop());
    setIsRecording(false);

    // Send blob to API
    setTimeout(() => {
      const blob = new Blob(audioChunks, { type: "audio/webm" });
      const formData = new FormData();
      formData.append("file", blob, "recording.webm");

      fetch("/api/upload-voice", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Upload success:", data);
          alert("Voice uploaded successfully!");
        })
        .catch((err) => {
          console.error("Upload error:", err);
          alert("Failed to upload voice.");
        });

      setIsModalOpen(false);
    }, 500);
  };

  useEffect(() => {
    if (isModalOpen) {
      handleStartRecording();
    }
  }, [isModalOpen]);

  return (
    <div className="w-full h-auto rounded-lg bg-white">
      <div className="py-5 px-5">
        <div className="w-full h-auto border border-gray-200 rounded-lg p-5 bg-white">
          <h2 className="text-xl font-bold text-gray-700 mb-2">
            Consultation Notes
          </h2>
          <hr className="mb-4 border-gray-200" />

          <div className="border border-gray-200 rounded-lg bg-white p-4 mb-4">
            <textarea
              className="w-full rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              rows={4}
              placeholder="Write consultation notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>

          <button
            className="flex items-center gap-2 px-8 py-4 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition mb-6"
            onClick={handleVoiceToText}
          >
            <Mic className="w-5 h-5" />
            Voice to Text
          </button>

          <h2 className="text-sm font-semibold text-gray-700 mb-2">
            E-Prescription
          </h2>

          <div className="border border-gray-200 rounded-lg bg-white p-4 mb-4">
            <textarea
              className="w-full rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              rows={4}
              placeholder="Write e-prescription or use voice-to-text..."
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
            ></textarea>
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
            <h2 className="text-lg font-bold mb-4">Recording...</h2>

            {/* Pulsing Animation */}
            {isRecording && (
              <div className="w-4 h-4 mx-auto mb-4 rounded-full bg-red-500 animate-ping" />
            )}

            <button
              onClick={handleStopRecording}
              className="mt-4 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center justify-center mx-auto gap-2"
            >
              <StopCircle className="w-5 h-5" />
              Stop Recording
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultationN;
