let contacts = [
  new Contact('Hanbit', 'Mustermann', "Alex"),
  new Friend('Max', 'Mustermann', "Alexianergraben 40, 52062 Aachen", '1234567890'),
];

function addContact(fn, ln, add, tel) {
  let myNewContact = new Contact(fn, ln, add, tel);
  contacts.push(myNewContact)
}

addContact('Max', 'Mustermann', "Alexianergraben 40, 52062 Aachen", '1234567890');
addContact('Peter', 'Mußermann', "Alexianergraben 40, 52062 Aachen", '12345678');
console.log(contacts[0]["firstName"])
