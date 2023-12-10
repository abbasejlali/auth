// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from "cookie";


export default function handler(
  req,
  res
) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("user_token" , req.body.token ,{
      httpOnly : true,
      maxAge : 60 * 60 * 24, // time expire cookie 
      sameSite : "lax",
      path: "/"
      // domain : '.'
      // secure : 
    })
  )
  res.status(200).json({ status: 'success' })
}
