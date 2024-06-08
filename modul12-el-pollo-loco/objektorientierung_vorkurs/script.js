let contacts = [
  {
    'firstName': 'Max',
    'lastName': 'Mustermann',
  }
];

function addContact(firstName, lastName){
  contacts.push({
    'firstName': firstName, 
    'lastName': lastName
  })
}

addContact('Max', 'Mustermann');
addContact('Peter', 'Mußermann');
