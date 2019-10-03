"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../../../config");
const rateLimit = require('express-rate-limit');
class Middleware {
    static createRateLimit(mins, maxRequests) {
        return rateLimit({
            windowMs: mins * 60 * 1000,
            max: maxRequests,
        });
    }
    static restrictedUrl(req, res, next) {
        if (!config_1.isProduction) {
            return next();
        }
        const approvedDomainList = [
            'https://khalilstemmler.com'
        ];
        const domain = req.headers.origin;
        const isValidDomain = !!approvedDomainList.find((d) => d === domain);
        console.log(`Domain =${domain}, valid?=${isValidDomain}`);
        if (!isValidDomain) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        else {
            return next();
        }
    }
}
exports.Middleware = Middleware;
//# sourceMappingURL=Middleware.js.map