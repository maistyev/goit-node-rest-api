import Contact from "../db/models/Contact.js";


export function listContacts(userId) {
    return Contact.findAll({ where: { userId } });
}

export function getContactById(contactId, userId) {
    return Contact.Contact.findOne({ where: { id: contactId, userId } });
}

export async function removeContact(contactId, userId) {
    const contact = await Contact.findOne({ where: { id: contactId, userId } });
    if (!contact) return null;
    await contact.destroy();
    return contact;
}

export function addContact(data, userId) {
    return Contact.create({ 
        ...data, 
        owner: userId 
    });
}

export async function updateContact(contactId, data, userId) {
    const contact = await Contact.findOne({ where: { id: contactId, userId } });
    if (!contact) return null;
    await contact.update(data);
    return contact;
}