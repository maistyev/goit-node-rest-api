import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
    const contacts = await contactsService.listContacts(req.user.id);
    res.json(contacts);
};

export const getOneContact = async (req, res) => {
    const {id} = req.params;
    const contact = await contactsService.getContactById(id, req.user.id);
    if (!contact) {
        throw HttpError(404);
    }
    res.json(contact);
};

export const deleteContact = async (req, res) => {
    const {id} = req.params;
    const removedContact = await contactsService.removeContact(id, req.user.id);
    if (!removedContact) {
        throw HttpError(404);
    }
    res.json(removedContact);
};

export const createContact = async (req, res) => {
    const contact = await contactsService.addContact(req.body, req.user.id);
    res.status(201).json(contact);
};

export const updateContact = async (req, res) => {
    const {id} = req.params;
    const updatedContact = await contactsService.updateContact(id, req.body, req.user.id);
    if (!updatedContact) {
        throw HttpError(404);
    }
    res.json(updatedContact);
};

export const updateStatusContact = async (req, res) => {
    const {id} = req.params;
    const updatedContact = await contactsService.updateContact(id, req.body, req.user.id);
    if (!updatedContact) {
        throw HttpError(404);
    }
    res.json(updatedContact);
};