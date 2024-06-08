let contacts = [
  {
    'firstName': 'Max',
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

function addContact(firstName, lastName){
  contacts.push({
    'firstName': firstName, 
    'lastName': lastName
  })
}

addContact('Max', 'Mustermann');
addContact('Peter', 'Mußermann');
