import ratelimit from "express-rate-limit";

const requestLimit = ratelimit ({
    windowMs: 15 * 60 * 1000,
    max: 100
})

export default requestLimit