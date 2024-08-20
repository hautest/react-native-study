import { sttFetch } from "@/apis/sttFetch";
import { Audio } from "expo-av";
import { useState } from "react";

interface UseSTTProps {
  onSuccess: (text: string) => void;
}

export const useSTT = (props?: UseSTTProps) => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [text, setText] = useState("");

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync();
      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    setRecording(null);
    await recording?.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording?.getURI();

    // Send to Whisper API
    if (uri) {
      const result = await sttFetch({ uri });
      setText(result.text);
      props?.onSuccess(result.text);
    }
  };

  return {
    startRecording,
    text,
    stopRecording,
    isRecording: recording !== null,
  };
};
