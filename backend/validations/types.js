const z = require('zod');

const emailSchema = z.string().email();

const passwordSchema = z.string().min(8);

module.exports = {
  emailSchema,
  passwordSchema,
};
