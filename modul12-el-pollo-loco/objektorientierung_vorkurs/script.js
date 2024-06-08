let contacts = [
  {
  'firstName': 'Habnit',
   'surName': 'Mustermann',
   'address': 'Alexianergraben 40, 52062 Aachen',	
  }
];

class Contact {
  constructor(firstName, surName, address){
    this.firstName = firstName
    this.surName = surName
    this.address = address
  }
}

function addContact(fn, ln, add) {
  let myNewContact = new Contact(fn, ln, add);
  contacts.push(myNewContact)
}

addContact('Max', 'Mustermann', "Alexianergraben 40, 52062 Aachen");
addContact('Peter', 'Mußermann', "Alexianergraben 40, 52062 Aachen");
console.log(contacts[1]["firstName"])
