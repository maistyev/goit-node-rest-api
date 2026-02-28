import {readFile, writeFile} from "node:fs/promises";
import {resolve, join} from "node:path";
import { nanoid } from "nanoid";

const contactsPath = resolve("db", "contacts.json");

function updateContactsFile(contacts) {
    return writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

export async function listContacts() {
    return JSON.parse(await readFile(contactsPath, "utf-8"));
}

export async function getContactById(contactId) {
    const contacts = await listContacts();
    return contacts.find(contact => contact.id === contactId) || null;
}

export async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
        return null;
    }
    const [removedContact] = contacts.splice(index, 1);
    await updateContactsFile(contacts);
    return removedContact;
}

export async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };
    contacts.push(newContact);
    await updateContactsFile(contacts);
    return newContact;
}

export async function updateContact(contactId, name, email, phone) {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
        return null;
    }
    const updatedContact = { id: contactId, name, email, phone };
    contacts[index] = updatedContact;
    await updateContactsFile(contacts);
    return updatedContact;
}