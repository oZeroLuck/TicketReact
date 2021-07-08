import {
    EditBtn,
    DeleteBtn, InfoBtn,
} from '../custom-button/btn-cfg'

const EventTbCfg = {
    headers: [
        { key: 'type', label: 'Type' },
        { key: 'title', label: 'Title' },
        { key: 'date', label: 'Date'},
        { key: 'hours', label: 'Hours'},
        { key: 'locationName', label: 'Location'}
    ],
    order: {defaultColumn: 'type', orderType: 'ascending'},
    search: {columns: ['type', 'title']},
    pagination: {itemPerPage: 5, itemPerPageOption: [5, 10, 15, 20]},
    buttons: [InfoBtn]
}

export {EventTbCfg};
