import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ckaizdecuiyetakptbnk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrYWl6ZGVjdWl5ZXRha3B0Ym5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NTE0OTYsImV4cCI6MjA3ODUyNzQ5Nn0.rMajdanADpKmDR9SZBUjCWIMJgR65GY9IfbPKa-XMXI"
);

export default function MediaUpload(file) {
  const promise = new Promise((resolve, reject) => {
    if (file == null) {
      reject("No file selected");
    }
    const timeStamp = new Date().getTime();
    const newFileName = timeStamp + file.name;

    supabase.storage
      .from("images")
      .upload(newFileName, file, {
        cacheControl: "3600",
        upsert: false,
      })
      .then(() => {
        const url = supabase.storage.from("images").getPublicUrl(newFileName)
          .data.publicUrl;
        resolve(url);
      })
      .catch((error) => {
        console.log(error);
        reject("File upload failed");
      });
  });
  return promise;
}

