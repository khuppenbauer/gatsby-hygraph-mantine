export default function handler(req, res) {
  const { body, headers, params, query } = req;
  res.status(200).json({ headers, body, params, query });
}
