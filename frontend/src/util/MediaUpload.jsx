// MediaUpload.js
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://gayymubrgezxycotrfvm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdheXltdWJyZ2V6eHljb3RyZnZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMzAyMDMsImV4cCI6MjA2OTgwNjIwM30.V8qJ604beO--JfQuM826Um0XNnKpnUGhT_Ehcc4WvBw"
);

export const uploadImage = (file) => {
  return new Promise(async (resolve, reject) => {
    if (!file) return reject("No file selected");

    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;

    try {
      const { error } = await supabase.storage
        .from("mern-bucket")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) return reject(error.message);

      const { data } = supabase.storage
        .from("mern-bucket")
        .getPublicUrl(fileName);
      resolve(data.publicUrl);
    } catch (err) {
      console.log(err);
      reject("Upload failed");
    }
  });
};
