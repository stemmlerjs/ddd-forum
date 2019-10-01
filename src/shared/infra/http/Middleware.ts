
import { isProduction } from "../../../config";
const rateLimit = require('express-rate-limit')

export class Middleware {

  public static createRateLimit (mins: number, maxRequests: number) {
    return rateLimit({
      windowMs: mins * 60 * 1000,
      max: maxRequests,
    })
  }

  public static restrictedUrl (req, res, next) {
  
    if (!isProduction) {
      return next();
    }
  
    const approvedDomainList = [
      'https://khalilstemmler.com'
    ]
  
    const domain = req.headers.origin;
  
    const isValidDomain = !!approvedDomainList.find((d) => d === domain);
    console.log(`Domain =${domain}, valid?=${isValidDomain}`)
  
    if (!isValidDomain) {
      return res.status(403).json({ message: 'Unauthorized' })
    } else {
      return next();
    }
  }
}