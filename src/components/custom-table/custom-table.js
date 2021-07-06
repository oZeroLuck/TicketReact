import React from "react";
import {Button, Card, Col, Row, Table} from "react-bootstrap";
import {CustomButton} from "../custom-button/custom-button";
import '../components.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faChevronCircleLeft,
    faChevronCircleRight,
    faSortAlphaDown,
    faSortAlphaUp
} from "@fortawesome/free-solid-svg-icons";

class CustomTable extends React.Component {
    constructor(props) {
        super(props);
        this.dataSource = props.dataSource;
        this.firstTime = true;
        this.searchColumns = props.tableCfg.search.columns;
        this.state = {
            searchTerm: '',
            searchedColumn: this.searchColumns[0],
            orderKey: props.tableCfg.order.defaultColumn,
            orderType: props.tableCfg.order.orderType === 'ascending',
            orderedData: props.dataSource,
            itemPerPage: props.tableCfg.pagination.itemPerPage,
            currentPageNumber: 0,
            currentPage: [],
            pagedList: []
        }
    }

    componentDidMount() {
        this.orderData(this.state.orderKey);
        this.paginate();
        this.firstTime = false;
    }

    orderData(column) {
        console.log("I'm ordering data")
        let data = this.state.orderedData;
        let orderType = this.state.orderType;
        if (column === this.state.orderKey && !this.firstTime) {
            orderType = !orderType;
            data = data.reverse();
        } else {
            data = this.state.orderedData.sort(function (a, b) {
                if (a[column] < b[column]) {
                    return -1;
                }
                if (b[column] > a[column]) {
                    return 1;
                }
                return 0;
            });
        }
        this.setState({
            orderKey: column,
            orderType: orderType,
            orderedData: data
        }, () => this.paginate());
    }

    handleSelectChange(input) {
        console.log("The searched column key has changed :" + input)
        this.setState({
            dataSource: this.state.dataSource,
            searchedColumn: input
        },() => console.log(this.state));
    }

    searchItem(input) {
        console.log("Keylogging search :" + input)
        const searchTerm = input;
        let data = this.dataSource.filter(
            (d) => {return d[this.state.searchedColumn].toLowerCase().includes(searchTerm.toLowerCase())}
        );
        this.firstTime = true;
        this.setState({
            searchTerm: this.searchTerm,
            orderKey: this.props.tableCfg.order.orderKey,
            orderType: this.props.tableCfg.order.orderType === 'ascending',
            orderedData: data
        });
    }

    handlePageNumberChange(input) {
        console.log("Page size has changed :" + input)
        this.setState({
            pagedList: [],
            itemPerPage: input
        }, () => this.paginate())
    }

    paginate() {
        console.log("Paginating by: " + this.state.itemPerPage)
        let pages = [];
        const allData = this.state.orderedData;
        const numberOfPages = Math.ceil(allData.length / this.state.itemPerPage);
        const entryPerPage = this.state.itemPerPage
        for (let i = 0; i < numberOfPages; i++) {
            let page;
            let start = i * entryPerPage
            let end = start + parseInt(entryPerPage)
            if (end < allData.length) {
                page = allData.slice(start, end);
            } else {
                page = allData.slice(start, allData.length);
            }
            pages.push(page);
        }
        console.log("New pages")
        console.log(pages)
        console.log("Current Page")
        console.log(pages[0])
        this.setState({
            currentPage: pages[0],
            pagedList: pages,
            currentPageNumber: 0
            }
        )
    }

    setPage(number) {
        console.log("The page has been choosen to be :" + number)
        if (number >= 0 && number < this.state.pagedList.length) {
            const currentPage = this.state.pagedList[number]
            this.setState({
                currentPageNumber: number,
                currentPage: currentPage
            })
        } else {
            console.log("How did you do it?")
        }
    }

    parentCallback(itemId, buttonType) {
        console.log("I have been clicked! :" +  itemId + " " + buttonType)
        this.props.parentCallback(itemId, buttonType)
    }

    render() {
        if (this.state.currentPage === [] && !this.firstTime) {
            return <div>
                <p>Loading</p>
            </div>
        } else {
            const pageSelectors = []
            for (const [index] of this.state.pagedList.entries()) {
                pageSelectors.push(<Button variant='success' onClick={() => this.setPage(index)}>{index}</Button>)
            }

            return (
                <Card>
                    <Card.Header>
                        <Row>
                            <Col>
                                <form>
                                    <input type={"text"} name={"searchItem"}
                                           value={this.state.searchTerm} onChange={event => this.searchItem(event.target.value)}
                                    />
                                </form>
                            </Col>
                            <Col>
                                <select onChange={event => this.handleSelectChange(event.target.value)}>
                                    {this.searchColumns.map(column => (
                                        <option key={"searchKey" + column}>{column}</option>
                                    ))}
                                </select>
                            </Col>
                            <Col>
                                <select onChange={event => this.handlePageNumberChange(event.target.value)}>
                                    {this.props.tableCfg.pagination.itemPerPageOption.map(pageNumber => (
                                        <option key={"NoOfPages" + pageNumber}>{pageNumber}</option>
                                    ))}
                                </select>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Table responsive>
                            <thead>
                                <tr>
                                    {this.props.tableCfg.headers.map(header => (
                                    <th key={header.key} onClick={() => this.orderData(header.key)}>
                                        {header.label}
                                        {this.state.order ? (
                                            <FontAwesomeIcon icon={faSortAlphaUp}/>
                                        ) : (
                                            <FontAwesomeIcon icon={faSortAlphaDown}/>
                                        )}
                                    </th>
                                    ))}
                                    <th key={"Actions"}>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.currentPage.map(data => (
                                    <tr key={data.id}>
                                        {this.props.tableCfg.headers.map(header => (
                                        <td key={header.key + data.id}>{data[header.key]}</td>
                                        ))}
                                        <td key={"Actions" + data.id}>
                                            <Row>
                                                {this.props.tableCfg.buttons.map(button => (
                                                    <Col id={data.id + button.text}>
                                                        <CustomButton buttoncfg={button}
                                                                      onPress={() => this.parentCallback(data.id, button.text)}/>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </td>
                                    </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                    <Card.Footer>
                        <Row>
                            <Col>
                                <FontAwesomeIcon icon={faChevronCircleLeft} onClick={() =>
                                    this.setPage(this.state.currentPageNumber - 1)}/>
                            </Col>
                            <Col>
                                <Row>
                                    {pageSelectors}
                                </Row>
                            </Col>
                            <Col>
                                <FontAwesomeIcon icon={faChevronCircleRight} onClick={() =>
                                    this.setPage(this.state.currentPageNumber + 1)}/>
                            </Col>
                        </Row>
                    </Card.Footer>
                </Card>
            );
        }
    }
}

export {CustomTable}
