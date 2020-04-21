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
  console.log(contactToFind);
}
async function removeContact(contactId) {
  const contacts = await getContactFromDB();
  const filtredContacts = contacts.filter(({ id }) => id !== contactId);
  const contactsToWrite = JSON.stringify(filtredContacts);
  fsPromises.writeFile(contactsPath, contactsToWrite);
}

async function addContact(name, email, phone) {
  const contacts = await getContactFromDB();
  contacts.push({ name, email, phone });
  const contactsToWrite = JSON.stringify(contacts);
  fsPromises.writeFile(contactsPath, contactsToWrite);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
