//business logic
function Contact(first, last) {
  this.firstName = first;
  this.lastName = last;
  this.addresses = [];
}

function Address(street, city, state) {
  this.street = street;
  this.city = city;
  this.state = state;
}
Contact.prototype.fullName = function(){
  return this.firstName + " " + this.lastName;
}
Address.prototype.fullAddress = function(){
  return this.street + ', ' + this.city + ', ' + this.state;
}


// user interface logic
function displayContactInfo(contactObj){
  $("#show-contact").show();
  $("#show-contact h2").text(contactObj.fullName());
  $(".first-name").text(contactObj.firstName);
  $(".last-name").text(contactObj.lastName);
  $("ul#addresses").text("");
  contactObj.addresses.forEach(function(address) {
  $("ul#addresses").append("<li>" + address.fullAddress() + "</li>");
});
}

function resetFields() {
  $("input.address").val('');
}

function appendAddressDiv(place) {
  $(place).append('<div class="new-address">' +
                               '<div class="form-group">' +
                                 '<label for="new-street">Street</label>' +
                                 '<input type="text" class="form-control new-street address">' +
                               '</div>' +
                               '<div class="form-group">' +
                                 '<label for="new-city">City</label>' +
                                 '<input type="text" class="form-control new-city address">' +
                               '</div>' +
                               '<div class="form-group">' +
                                 '<label for="new-state">State</label>' +
                                 '<input type="text" class="form-control new-state address">' +
                               '</div>' +
                             '</div>');
}

$(document).ready(function() {

  $("#add-address").click(function() {
    appendAddressDiv("#new-addresses");
  });

  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var newContact = new Contact(inputtedFirstName, inputtedLastName);
    $(".new-address").each(function() {
      var inputtedStreet = $(this).find("input.new-street").val();
      console.log(inputtedStreet);
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      var newAddress = new Address(inputtedStreet, inputtedCity, inputtedState);
      newContact.addresses.push(newAddress);
    });

    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");
    resetFields();


    $(".contact").last().click(function() {
      // $("#show-contact").show();
      // $("#show-contact h2").text(newContact.fullName());
      // $(".first-name").text(newContact.firstName);
      // $(".last-name").text(newContact.lastName);
      // $("ul#addresses").text("");
      // newContact.addresses.forEach(function(address) {
      // $("ul#addresses").append("<li>" + address.fullAddress() + "</li>");
      // });
      displayContactInfo(newContact);
    });
  });
});
