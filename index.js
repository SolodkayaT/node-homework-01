const contacts = require("./contacts");

contacts.listContacts();
contacts.addContact(11, "Tata", "tata@mail.com", "076-980-00-00");
contacts.getContactById(5);
contacts.removeContact(6);
