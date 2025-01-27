"use client";

import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import React, { useState } from "react";
import customImageLoader from "@/app/utils/supabase/loader";

type PhotosProps = {
  uploadedImages: string[];
  setUploadedImages: React.Dispatch<React.SetStateAction<string[]>>;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const Photos: React.FC<PhotosProps> = ({
  uploadedImages,
  setUploadedImages,
}) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newImage, setNewImage] = useState(false);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      alert("Please select an image to upload.");
      return;
    }

    setLoading(true);

    const fileName = `${Date.now()}-${image.name}`;
    const filePath = `tasks/${fileName}`;
    const { error } = await supabase.storage
      .from("milestone_tasks") // Replace with your bucket name
      .upload(filePath, image);

    if (error) {
      console.error("Error uploading image:", error.message);
      setLoading(false);
      return;
    }

    const { data: publicData } = supabase.storage
      .from("milestone_tasks")
      .getPublicUrl(fileName);

    setNewImage(true);
    setUploadedImages((prev) => [...prev, publicData.publicUrl]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button
          onClick={uploadImage}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
        {newImage && <p>Images uploaded successfully:</p>}
        <div className="flex flex-wrap w-72 justify-center items-center">
          {uploadedImages.length > 0 &&
            uploadedImages.map((url, index) => (
              <Image
                key={index}
                loader={customImageLoader}
                src={
                  url.toString().split("/")[
                    url.toString().split("/").length - 1
                  ]
                }
                alt="Uploaded"
                className="w-24 h-24 object-cover p-1"
                width={75}
                height={75}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Photos;
