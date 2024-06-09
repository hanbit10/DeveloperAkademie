class Contact {
  constructor(firstName, surName, address, phone){
    this.firstName = firstName
    this.surName = surName
    this.address = address
    this.phone = phone
  }

  printFullName() {
    console.log(this.firstName + " " + this.surName)
  }

  call(){
    window.location.href = 'tel:' + this.phone
  }
}