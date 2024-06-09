class Contact extends Person {
  constructor(firstName, surName, address, phone, ){
    super(firstName, surName, address, phone)
  }

  printFullName() {
    console.log(this.firstName + " " + this.surName)
  }

  call(){
    window.location.href = 'tel:' + this.phone
  }
}
