import {
    EditBtn,
    DeleteBtn,
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

export {UserTbCfg};
