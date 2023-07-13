import contactsService from "./contacts.js";

import { program } from "commander";

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contactsService.getContactsList();
      return console.table(allContacts);
    case "getById":
      const contact = await contactsService.getContactById(id);
      return console.table(contact);
    case "removeById":
      const removeContact = await contactsService.removeContact(id);
      return console.table(removeContact);
    case "add":
      const newContact = await contactsService.addContact({
        name,
        email,
        phone,
      });
      return console.table(newContact);
  }
};

program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");

program.parse();

const options = program.opts();
invokeAction(options);
