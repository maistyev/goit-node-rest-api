import contactsService from "../services/contactsServices.js";
import { HttpError } from "../helpers/HttpError.js";

export const getAllContacts = (req, res) => {
    const contacts = contactsService.listContacts();
    res.json(contacts);
};

export const getOneContact = (req, res) => {
    const {id} = req.params;
    const contact = contactsService.getContactById(id);
    if (!contact) {
        throw HttpError(404);
    }
    res.json(contact);
};

export const deleteContact = (req, res) => {
    const {id} = req.params;
    const removedContact = contactsService.removeContact(id);
    if (!removedContact) {
        throw HttpError(404);
    }
    res.json(removedContact);
};

export const createContact = (req, res) => {
    const contact = contactsService.addContact(req.body);
    res.status(201).json(contact);
};

export const updateContact = (req, res) => {
    const {id} = req.params;
    const updatedContact = contactsService.updateContact(id, req.body);
    if (!updatedContact) {
        throw HttpError(404);
    }
    res.json(updatedContact);
};
