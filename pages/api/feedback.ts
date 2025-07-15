import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/db';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }
  const { name, email, area, comment } = req.body;
  try {
    const { error } = await supabase
      .from('feedback')
      .insert([{ name, email, area, comment, created_at: new Date() }]);
    if (error) throw error;
    return res.status(200).json({ message: 'Feedback saved' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error saving feedback' });
  }
}