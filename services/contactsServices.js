import Contact from "../db/models/Contact.js";


export function listContacts() {
    return Contact.findAll();
}

export function getContactById(contactId) {
    return Contact.findByPk(contactId);
}

export async function removeContact(contactId) {
    const contact = await Contact.findByPk(contactId);
    if (!contact) return null;
    await contact.destroy();
    return contact;
}

export function addContact(data) {
    return Contact.create(data);
}

export async function updateContact(contactId, data) {
    const contact = await Contact.findByPk(contactId);
    if (!contact) return null;
    await contact.update(data);
    return contact;
}