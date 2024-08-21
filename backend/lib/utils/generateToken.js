import jwt from 'jsonwebtoken'

export const generateTokenAndSetCookie = (userId, res)=>{
    const token = jwt.sign({userId},"jPpMCVG9WPOx7T/d+AX9p104VHrZ/dpk2qOzjUq/OfQ=", {
        expiresIn: '15d'
    })

    res.cookie("jwt", token,{
        maxAge: 15*24*60*60*1000,
        httpOnly: true,
        sameSite: "strict"
    })
}