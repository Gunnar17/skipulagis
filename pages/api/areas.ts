import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Only GET allowed' });
  }
  try {
    // Tókum sem dæmi að við höfum töflu 'areas' með dálkum 'id', 'name', og 'geojson_url'
    const { data, error } = await supabase
      .from('areas')
      .select('id, name');
    if (error) throw error;
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error fetching areas' });
  }
}