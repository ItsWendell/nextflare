import type { NextApiRequest, NextApiResponse } from 'next'
const nodeApi =  (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ name: 'John Doe' })
}

export const config = {
    runtime: 'nodejs',
}

export default nodeApi;