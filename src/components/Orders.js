import React, { Component } from "react";
import firebase from "firebase";
import "./Pract.css";
import Modal from "react-responsive-modal";
export default class Orders extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Orders: [],
      currentPage: 1,
      todosPerPage: 5,
      Bucket: [],
      Orders: [],
      searchVal: "",
      modelData: ""


    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this)
    this.fetchData = this.fetchData.bind(this)
    this.handleModel = this.handleModel.bind(this)
    this.messageIdGenerator = this.messageIdGenerator.bind(this)
    this.handlefilter = this.handlefilter.bind(this)
  }
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }
  handleSearch(e) {
    this.setState({ searchVal: e.target.value }, function () {
      this.handlefilter()
    })
  }
  handlefilter() {
    let filteredOrders = this.state.Orders.filter(order => {
      return (
        order.first_name.toLowerCase().indexOf(this.state.searchVal) !==
        -1
      );
    } ,function(){
      this.setState({
        Orders : filteredOrders
      })
     console.log(this.state.Orders)
    })
  }
  messageIdGenerator() {
    // generates uuid.
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
      let r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
  componentDidMount() {
    this.fetchData()
  }
  fetchData() {
    this.setState({
      Orders: [],
      currentPage: 1,
      todosPerPage: 5,
      Bucket: [],
      Orders: [],
      searchVal: ""
    })
    let arr = [];
    let firebaseRef = firebase.database().ref("bucket");
    firebaseRef.once("value", snap => {
      snap.forEach(Key => {
        let dataRef = firebaseRef.child(Key.ref.key).key;

        let data = snap.child(dataRef).val();

        data.firebasekEY = dataRef
        data.id = this.messageIdGenerator()

        arr.push(data)
        this.setState({
          Orders: arr
        });
        console.log(this.state.Orders)
      });
    });

  }
  handleDelete(key) {
    let firebaseRef = firebase.database().ref("bucket").child(key)
    firebaseRef.remove().then(() => {
      this.fetchData()
    })

  }
  onOpenModal = (key) => {

    this.handleModel(key)
  };
  handleModel(key) {
    let result = this.state.Orders.filter(obj => {
      return (
        obj.id === key
      )
    })
    console.log(result)
    this.setState({
      modelData: result,
      open: true
    })

  }
  onCloseModal = () => {
    this.setState({ open: false });

  };

  render() {
    const { open, Orders, currentPage, todosPerPage } = this.state;
    // Logic for displaying current todos
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = Orders.slice(indexOfFirstTodo, indexOfLastTodo);


    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(Orders.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <button className="buttonS"
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </button>
      );
    });
 
    return (
      <div className="col-sm-10">
        <div className="aside">
          <center>
            <h3>Ordersioners</h3>{" "}
          </center>
          {/* electronic functionality*/}
          <div className="d-flex align-items-start E-fucn-con">
            <div className="p-2 E-fucn-con1">
              <span className="e-func-inherit" style={{ "color": "black" }} ><h2>  Parents {this.state.Orders.length}</h2> </span>
            </div>
            {/*drop down */}
            <div className="p-2 drop">
              <div className="btn-group" class="drop-btn">
                <button type="button" class="btn btn-danger">
                  Action
                </button>
                <button
                  type="button"
                  class="btn btn-danger dropdown-toggle dropdown-toggle-split"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false">
                  <span className="sr-only">Toggle Dropdown</span>
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item" href="#">
                    Separated link
                  </a>
                </div>
              </div>
            </div>
            {/*dropdown end */}
          </div>

          {/*search bar */}

          <form>
            <div class="col-auto">
              <i class="fas fa-search h4 text-body" />
            </div>
            {/*end of col */}
            <div class="col">
              <input onChange={this.handleSearch.bind(this)}
                value={this.state.searchVal}
                name="searchVal"
                class="form-control form-control-lg form-control-borderless"
                type="search"
                placeholder="Search topics or keywords"
              />
            </div>
            {/*end of col */}

            {/*end of col */}
          </form>

          {/*end of col */}

          {/*search bar */}
          {/*table start */}
          <div class="col-s-12">
            <div class="table-responsive">
              <table style={{ "color": "black", "textAlign": "center", "backgroundColor": "white", "border": "1" }} class="w3-table">
                <tr>
                  <th>checkout flag</th>
                  <th>checkout time</th>
                  <th>link expiration</th>
                  <th>Price  </th>
                  <th>Actions</th>
                </tr>
                {currentTodos.map((item, index) => {
                  return (
                    <tr key={item.firebaseRef}>
                      <td>{item.checkout_flag}</td>
                      <td>{item.checkout_time}</td>
                      <td>{item.link_expiration}</td>
                      <td>{item.price}</td>
                      <td>
                        <button onClick={() => this.handleDelete(item.firebasekEY)} className="btn btn-primery"> Delete </button>
                        <button onClick={() => this.onOpenModal(item.id)} className="btn btn-primery"> View </button>
                      </td>
                    </tr>
                  )
                })}
                <ul id="page-numbers">
                  {renderPageNumbers}
                </ul>
              </table>
            </div>
          </div>
          {/*main table end */}
        </div>
        <div>
          <Modal open={open} onClose={this.onCloseModal} center>

            <div className="Model">
              {this.state.modelData &&
                <div>
                  <h2>Email : {this.state.modelData[0].practitioner_email}</h2>
                  <h2> Price : {this.state.modelData[0].price}</h2>
               
                 
                </div>
              }


            </div>




          </Modal>
        </div>
      </div>
    );
  }
}
