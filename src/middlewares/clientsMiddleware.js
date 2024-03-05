const validateClientRequest = (schemaClient) => async (request, response, next) => {
    try {
      await schemaClient.validateAsync(request.body);

      next();
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  };


module.exports = { validateClientRequest };
