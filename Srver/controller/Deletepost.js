const { connection } = require("../DataBaseMySQL/config");
module.exports = {
  Deletepost: (req,res) => {
    console.log(req.params.id)
    const query = `DELETE FROM postestext WHERE id=${req.params.id}`
    connection.query(query, (err, result) => {
      err ? res.status(500).send(err) : res.status(200).send("post deleted")
    })
  },
};
