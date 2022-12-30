let data = [
  {id: 1, name: 'AWS', status: 'work'}
];

export const getAll = (req, res) => {
  res.json(data)
}