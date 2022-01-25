import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  word: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Record<string, any>>
) {
  if (
    !process.env.AUTHORIZATION ||
    req.headers.authorization !==
      `Bearer ${Buffer.from(process.env.AUTHORIZATION).toString('base64')}`
  ) {
    res.status(401).json({ status: 401, message: 'Unauthorized!' });
    return false;
  }

  // Fixed response for now
  res.status(200).json({ word: 'karhu' });
}
