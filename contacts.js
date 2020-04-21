"use strict";

const fs = require("fs");
const { promises: fsPromises } = fs;
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function getContactFromDB() {
  const data = await fsPromises.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

async function listContacts() {
  const contacts = await getContactFromDB();
  contacts.map((contact) => console.table(contact));
}

async function getContactById(contactId) {
  const contacts = await getContactFromDB();
  const contactToFind = contacts.find(({ id }) => id === contactId);
  console.log(`The contact with ${contactId} has been found: `, contactToFind);
}

async function removeContact(contactId) {
  const contacts = await getContactFromDB();
  const filtredContacts = contacts.filter(({ id }) => id !== contactId);
  const contactsToWrite = JSON.stringify(filtredContacts);

  fsPromises.writeFile(contactsPath, contactsToWrite);
  console.log(`The contact with ${contactId} has been deleted!`);
  console.log(`Now the contact list looks like this: `, filtredContacts);
}

async function addContact(id, name, email, phone) {
  const contacts = await getContactFromDB();
  contacts.push({ id, name, email, phone });
  const contactsToWrite = JSON.stringify(contacts);
  fsPromises.writeFile(contactsPath, contactsToWrite);
  console.log(`The contact with ${name} has been added!`);
  console.log(`Now the contact list looks like this: `, contacts);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
