import React from "react";
import {Button, ButtonGroup, Card, Col, Container, Row, Table} from "react-bootstrap";
import {CustomButton} from "../custom-button/custom-button";
import '../components.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faChevronCircleLeft,
    faChevronCircleRight,
    faSortAlphaDown,
    faSortAlphaUp
} from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";

// Pass an array of object in dataSource
// Pass the configuration in tableCfg
// Pass the function to handle button clicks in parentCallback, the object provided is of type (itemId, buttonLabel)

class CustomTable extends React.Component {
    constructor(props) {
        super(props);
        this.dataSource = props.dataSource;
        this.firstTime = true;
        this.state = {
            searchTerm: '',
            searchedColumn: props.tableCfg.search[0].column,
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
        console.log(data)
        this.setState({
            orderKey: column,
            orderType: orderType,
            orderedData: data
        }, () => this.paginate());
    }

    handleSelectChange(input) {
        this.setState({
            orderedData: this.props.dataSource,
            searchedColumn: input,
            searchTerm: ''
        }, () => this.searchItem(''));
    }

    searchItem(input) {
        console.log("Searching for :" + input)
        console.log(this.state.orderedData)
        console.log(input)
        let data
        if (input === '') {
            data = this.props.dataSource
        } else {
            data = this.dataSource.filter(
                d => d[this.state.searchedColumn].toLowerCase().includes(input.toLowerCase())
            );
        }
        console.log(data)
        this.firstTime = true;
        this.setState({
            searchTerm: this.searchTerm,
            orderKey: this.props.tableCfg.order.orderKey,
            orderType: this.props.tableCfg.order.orderType === 'ascending',
            orderedData: data
        }, () => this.orderData(this.props.tableCfg.order.defaultColumn));
    }

    handlePageNumberChange(input) {
        this.setState({
            pagedList: [],
            itemPerPage: input
        }, () => this.paginate())
    }

    paginate() {
        let pages = [];
        const allData = this.state.orderedData;
        console.log(allData)
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
        this.setState({
            currentPage: pages[0],
            pagedList: pages,
            currentPageNumber: 0
            }
        )
    }

    setPage(number) {
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
        console.log("Item id: " + itemId)
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
                pageSelectors.push(
                    <Button variant='success'
                            active={this.state.currentPageNumber === index}
                            onClick={() => this.setPage(index)}>{index}</Button>
                )
                // TODO: handle big number of pages
            }

            return (
                <Container>
                    <Card>
                        <Card.Header>
                            <Container fluid>
                                <Row>
                                    <Col lg={8}/>
                                    <Col>
                                        <Form>
                                            <Row noGutters>
                                                <Col>
                                                    <Form.Control type={"text"} name={"searchItem"}
                                                                  placeholder={"Type to search"}
                                                           value={this.state.searchTerm} onChange={(event) => this.searchItem(event.target.value)}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row noGutters>
                                            <Col>
                                                <Form.Control as={"select"} onChange={event => this.handleSelectChange(event.target.value)}>
                                                    {this.props.tableCfg.search.map(column => (
                                                        <option key={"searchKey" + column.column} value={column.column}>{column.label}</option>
                                                    ))}
                                                </Form.Control>
                                            </Col>
                                                    <Col sm={3}>
                                                        <Form.Control as={"select"} onChange={event => this.handlePageNumberChange(event.target.value)}>
                                                            {this.props.tableCfg.pagination.itemPerPageOption.map(pageNumber => (
                                                                <option key={"NoOfPages" + pageNumber}>{pageNumber}</option>
                                                            ))}
                                                        </Form.Control>
                                                    </Col>
                                            </Row>
                                        </Form>
                                    </Col>
                                </Row>
                            </Container>
                        </Card.Header>
                        <Card.Body>
                            {this.state.orderedData.length === 0 ?
                                <Container>
                                    <Row>
                                        <p>Nothing was found </p>
                                    </Row>
                                </Container> :
                                <Table striped bordered responsive>
                                    <thead>
                                        <tr>
                                            {this.props.tableCfg.headers.map(header => (
                                            <th onClick={() => this.orderData(header.key)}>
                                                {header.label}
                                                {this.state.orderType ?
                                                    <FontAwesomeIcon icon={faSortAlphaDown}
                                                                     className={"ml-2"}
                                                    />
                                                 :
                                                    <FontAwesomeIcon icon={faSortAlphaUp}
                                                                     className={"ml-2"}
                                                    />
                                                }
                                            </th>
                                            ))}
                                            <th key={"Actions"} className={"text-center"} style={{width: "fit-content"}}>
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.currentPage === undefined ? null :
                                    this.state.currentPage.map(data => (
                                            <tr key={data.id}>
                                                {this.props.tableCfg.headers.map(header => (
                                                <td key={header.key + data.id}>{data[header.key]}</td>
                                                ))}
                                                <td key={"Actions" + data.id} className={"d-flex justify-content-center"}>
                                                        {this.props.tableCfg.buttons.map(button => (
                                                                <CustomButton
                                                                              buttoncfg={button}
                                                                              onPress={() => this.parentCallback(data.id, button.text)}/>
                                                        ))}
                                                </td>
                                            </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            }
                        </Card.Body>
                        <Card.Footer>
                            {pageSelectors.length > 1 ?
                                <Container fluid>
                                    <Row>
                                        <Col>
                                            <FontAwesomeIcon
                                                className={"hover-eff"}
                                                style={{margin: "auto"}}
                                                icon={faChevronCircleLeft} onClick={() =>
                                                this.setPage(this.state.currentPageNumber - 1)}/>
                                        </Col>
                                        <Col className={"align-content-center"}>
                                            <ButtonGroup>
                                                {pageSelectors}
                                            </ButtonGroup>
                                        </Col>
                                        <Col className={"d-flex flex-row-reverse"}>
                                            <FontAwesomeIcon
                                                className={"hover-eff"}
                                                icon={faChevronCircleRight} onClick={() =>
                                                this.setPage(this.state.currentPageNumber + 1)}/>
                                        </Col>
                                    </Row>
                                </Container> : null
                            }
                        </Card.Footer>
                    </Card>
                </Container>
            );
        }
    }
}

export {CustomTable}
