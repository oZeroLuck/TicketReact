import {InfoBtn} from '../custom-button/btn-cfg'

const EventTbCfg = {
    headers: [
        { key: 'type', label: 'Type' },
        { key: 'title', label: 'Title' },
        { key: 'date', label: 'Date'},
        { key: 'hours', label: 'Hours'},
        { key: 'locationName', label: 'Location'}
    ],
    order: {defaultColumn: 'type', orderType: 'ascending'},
    // The first search object will be the default column
    search: [
        {column: 'type', label:'Event Type'},
        {column: 'title', label: 'Title'},
        {column: 'locationName', label: 'Location'}
        ],
    pagination: {itemPerPage: 5, itemPerPageOption: [5, 10, 15, 20]},
    buttons: [InfoBtn]
}

export {EventTbCfg};
