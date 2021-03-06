const crypto = require("crypto")
const logger = require("./logger")(module)

// this private key is for testing only, use it together with cubeBatch "01"
const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQCiWpvDnwYFTqgSWPlA3VO8u+Yv9r8QGlRaYZFszUZEXUQxquGl
FexMSVyFeqYjIokfPOEHHx2voqWgi3FKKlp6dkxwApP3T22y7Epqvtr+EfNybRta
15snccZy47dY4UcmYxbGWFTaL66tz22pCAbjFrxY3IxaPPIjDX+FiXdJWwIDAQAB
AoGAOc63XYz20Nbz4yyI+36S/UWOLY/W8f3eARxycmIY3eizilfE5koLDBKm/ePw
2dvHJTdBDI8Yu9vWy3Y7DWRNOHJKdcc1gGCR36cJFc4/h02zdaK+CK4eAaZLXhdK
H8DljEx6QAeRtxVLZGeYa4actY+3GeujYvkQ5QwNprchTSECQQDO4VMmLB+iIT/N
jnADYOuWKe3iLBoTKHmVfAaTRMMeHATMkpgyVzTLO7jMYCWy7+S0DL4wDNUTQv+P
Nna/hrAxAkEAyObfMAgjnW6s+CGoN+yWtdBC0LvDXDrzaT3KqmHxK2iCg2kQ9R6P
0vCvGJytuPxmIVZn54+KpKfR6ok6RJSbSwJAF+CRxDobfI7x2juyWfF5v18fgZct
e0CUp9gkuiKZkoQRWbshrc263ioKbiw6rahacR13ZfxVK1/0NwdGNVzKQQJBAJpw
QGpgF2DSz8z/sp0rFsA1lOd5L7ka6Dui8MUB/a9s68exYQPNtqpls3SsHS/zd19x
WPa9dcsV51zwmQZXZvkCQQChnQLBs6BbH6O85ePXSSbe7RUvHua6EEkmCNkIw+vT
3Jqmk4ecxCzmEv3xbzrCdgOhfjxqjrsqLLK6BH+lJsWS
-----END RSA PRIVATE KEY-----`

module.exports = (address, nonce) => {
  let data = address + "|" + nonce
  // logger.debug(data)

  let hash = crypto
    .createHash("sha256")
    .update(data)
    .digest("hex")
  let signature = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_NO_PADDING
    },
    new Buffer(hash, "hex")
  )
  let sig = signature.toString("hex")
  // logger.debug(sig)
  return sig
}
