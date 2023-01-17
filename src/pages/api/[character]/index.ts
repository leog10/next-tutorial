// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { character } = req.query;

  const getCharacher = await fetch(
    `https://rickandmortyapi.com/api/character/?name=${character}`
  );
  const result = await getCharacher.json();

  res.status(200).json(result);
}
