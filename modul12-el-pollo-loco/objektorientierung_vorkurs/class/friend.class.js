class Friend extends Person {
  constructor(firstName, surName, address, phone, relation) {
    super(firstName, surName, address, phone);
    this.relation = relation
  }
}