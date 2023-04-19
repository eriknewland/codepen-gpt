/* eslint-disable no-unused-vars */
exports.handler = async (event, context) => {
  const { OPENAI_API_KEY } = process.env;

  return {
    statusCode: 200,
    body: JSON.stringify({ apiKey: OPENAI_API_KEY }),
  };
};
