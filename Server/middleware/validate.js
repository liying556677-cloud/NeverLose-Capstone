// Generic body validation middleware using JOI schemas.

function validateBody(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        error: "VALIDATION_ERROR",
        details: error.details.map(d => d.message)
      });
    }

    // Replace body with the validated/sanitized value.
    req.body = value;
    next();
  };
}

module.exports = { validateBody };
