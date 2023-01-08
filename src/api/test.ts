export default function handler(req, res) {
  const { body, headers, params, query } = req;
  console.log([headers, body, params, query]);
  res.status(200).json({ headers, body, params, query });
}
