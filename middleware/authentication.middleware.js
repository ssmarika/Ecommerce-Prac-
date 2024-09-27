const validateReqBody = (validationSchema) => {
  return async (req, res, next) => {
    //extract data from req.body
    const data = req.body;

    //validate data
    // imported the the validation schema

    try {
      // validate data
      const validateData = await validationSchema.validate(data);
      req.body = validateData;
    } catch (error) {
      //if validation fails, throw error
      return res.status(400).send({ message: error.message });
    }
    next();
  };
};

export default validateReqBody;
