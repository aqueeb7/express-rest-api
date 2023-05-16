exports.current_user = (req, res) => {
  return res.status(200).send({
    message: 'Current user data successfully fetched',
    data: req.user
  })
}