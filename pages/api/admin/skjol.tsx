import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import { uploadFile, getFileUrl } from '../../../lib/s3';
import { supabase } from '../../../lib/db';

export const config = { api: { bodyParser: false } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).send(err);
    const file = files.file as formidable.File;
    const data = fs.readFileSync(file.filepath);
    const key = `skjol/${Date.now()}_${file.originalFilename}`;
    try {
      const uploadRes = await uploadFile(key, data);
      // Vista í gagnagrunn með geojson_url eða PDF URL
      const { error } = await supabase
        .from('documents')
        .insert([{ area_id: fields.areaId, url: getFileUrl(key), uploaded_at: new Date() }]);
      if (error) throw error;
      res.status(200).json({ url: uploadRes.Location });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Upload error' });
    }
  });
}