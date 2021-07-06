import {
    EditBtn,
    DeleteBtn, InfoBtn,
} from '../custom-button/btn-cfg'

class UserTbCfg {
    headers = [
        {key: 'firstName', label: 'Nome'},
        {key: 'lastName', label: 'Cognome'}
    ];
    order = {defaultColumn: 'firstName', orderType: 'ascending'};
    search = {columns: ['firstName', 'lastName']};
    pagination = {itemPerPage: 5, itemPerPageOption: [5, 7, 10, 15, 20]};
    buttons = [EditBtn, DeleteBtn];
}

const EventTbCfg = {
    headers: [
        { key: 'type', label: 'Type' },
        { key: 'title', label: 'Title' },
    ],
    order: {defaultColumn: 'type', orderType: 'ascending'},
    search: {columns: ['type', 'title']},
    pagination: {itemPerPage: 5, itemPerPageOption: [5, 10, 15, 20]},
    buttons: [InfoBtn, EditBtn]
}

export {UserTbCfg, EventTbCfg};
