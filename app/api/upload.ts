import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import shortid from "shortid";
import { v4 as uuidv4 } from "uuid";
import { query } from "../lib/db";
import { sql } from '@vercel/postgres';


const upload = multer({ dest: "uploads/" });

export default async function handler(req: any, res: any) {
  try {
    // Use the 'upload' middleware to handle file uploads
    upload.single("file")(req, res, async function (err) {
      if (err) {
        console.error("Error uploading file:", err);
        return res.status(500).json({ error: "Failed to upload file" });
      }

      const fileId = uuidv4();
      const shortLink = shortid.generate();

      // Store file in cloud storage (e.g., AWS S3) or local server
      // Cloud storage implementation goes here

      // Store short link and file information in the PostgreSQL database
      await query(
        "INSERT INTO uploaded_files (id, short_link, file_name) VALUES ($1, $2, $3)",
        [fileId, shortLink, req.file.filename]
      );

      res.status(200).json({ shortLink, fileId });
    });
  } catch (error) {
    console.error("Error handling upload request:", error);
    res.status(500).json({ error: "Failed to process upload request" });
  }
}
