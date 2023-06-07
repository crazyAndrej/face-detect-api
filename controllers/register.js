const handleRegister = (req, res, db, bcrypt) => {
  console.log('Handle Register Called');
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json('incorrect form submission');
  }
  const hash = bcrypt.hashSync(password);
  db.transaction((trx) => {
    console.log('Transaction Started'); // Add this line
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into('login')
      .returning('email')
      .then((loginEmail) => {
        console.log('Inserted into login table:', loginEmail); // Add this line
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0].email,
            name: name,
            joined: new Date(),
          })
          .then((user) => {
            console.log('Inserted into users table:', user);
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch((err) => {
        console.log('Transaction Error:', err); // Add this line
        trx.rollback;
      });
  }).catch((err) => res.status(400).json('unable to register'));
};

module.exports = {
  handleRegister: handleRegister,
};
