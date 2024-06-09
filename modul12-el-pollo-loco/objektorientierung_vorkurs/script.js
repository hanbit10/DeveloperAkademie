let contacts = [
  new Contact('Hanbit', 'Mustermann', "Alex"),
];

function addContact(fn, ln, add) {
  let myNewContact = new Contact(fn, ln, add);
  contacts.push(myNewContact)
}

addContact('Max', 'Mustermann', "Alexianergraben 40, 52062 Aachen", '1234567890');
addContact('Peter', 'Mußermann', "Alexianergraben 40, 52062 Aachen", '12345678');
console.log(contacts[1]["firstName"])
