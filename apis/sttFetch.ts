const uriToBlob = async (uri: string) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
};

interface SttFetchParams {
  uri: string;
}

export const sttFetch = async ({ uri }: SttFetchParams) => {
  const formData = new FormData();

  const fileUri = uri.replace("file://", "");
  const file = { uri: fileUri, name: "recording.m4a", type: "audio/m4a" };

  // const blob = await uriToBlob(uri);
  formData.append("file", file as unknown as Blob);
  formData.append("model", "whisper-1");

  const result = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_KEY}`,
    },
    body: formData,
  }).then((data) => data.json());

  return result;
};
