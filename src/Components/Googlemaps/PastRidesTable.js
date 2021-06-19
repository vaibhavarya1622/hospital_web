import React,{useState,useEffect} from 'react'
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import MenuIcon from '@material-ui/icons/Menu';
import Modal from '@material-ui/core/Modal';
import PastRideMap from './PastRideMap'
import Drawer from '@material-ui/core/Drawer'
import axios from 'axios'
import moment from 'moment'
import MaterialTable from 'material-table';
import FilterListIcon from '@material-ui/icons/FilterList';
import CloseIcon from '@material-ui/icons/Close';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Row,
  Col,
} from "reactstrap";
import './../../css/pastRide.css'
import "bootstrap/dist/css/bootstrap.min.css";

const PastRides=()=>{
  const [cardOpen, setCardOpen] = useState(false);
  const [rides,setRides]=useState([])
  const [rideDetail,setRideDetail]=useState({})
  const [tableOpen,setTableOpen]=useState(false)

  const handleDrawerToggle=()=>{
    setTableOpen(!tableOpen)
  }

  useEffect(() => {
    axios
      .get("https://server.prioritypulse.co.in/hosp/hospitalPastRides", {
        headers: { 'Authorization':`Bearer ${localStorage.getItem('token')}`},
      })
      .then((res) => {
        const data = res.data;
        const arr = data.map((data) => {
        console.log(data);
          return {
            name: data['name'],
            age: data.age,
            caseprior: data.casePrior,
            driverNo: data.pickedBy?data['pickedBy'].mobileNo:'Not Available',
            driverName:data.pickedBy?data['pickedBy'].name:'Not Available',
            isVerified:data.pickedBy?data['pickedBy'].isVerified:'Not Available',
            pcase: data.pcase,
            date: moment(data['createdAt']).format('D/MM/YYYY'),
            rideid: data.RideId,
            driverID:data.pickedBy?data['pickedBy'].d:'Not Available',
            guardianNo: data.guardianNo,
            patientNo: data.patientNo,
            pickupcoordinates: data["pickUplocation"].coordinates,
            hospitalcoordinates:
              data["hospital"]["hospitalLocation"].coordinates,
          };
        });
        setRides(arr);
      })
      .catch(err=>{
        console.log(err)
      })
  }, []);

   const columns=[
     {field:'id',  title:'Id',hidden:true},
     {field:'name',title:'Name'},
     {field:'case',title:'Case'},
     {field:'date',title:'Date'},
     {field:'age',title:'Age',hidden:true,type:'numeric'},
     {field:'casePrior',title:'Case Prior',hidden:true},
     {field:'isVerified',title:'is Verified',hidden:true},
     {field:'driverNo',title:'Driver Number',hidden:true},
     {field:'driverName',title:'Driver Name',hidden:true},
     {field:'guardianNo',title:'Guardian Number',hidden:true},
     {field:'patientNo',title:'Patient Number',hidden:true},
     {field:'patientpolyline',title:'Patient Polyline',hidden:true},
     {field:'hospitalpolyline',title:'Hospital Polyline',hidden:true},
     {field:'hospitalcoordinates',title:'Hospital Coordinates',hidden:true},
     {field:'pickupcoordinates',title:'Pick Up Coordinates',hidden:true},

   ]
  const rows=rides.map((ride)=>{
    return {id:ride['_id'],name:ride['name'],case:ride['pcase'],date:ride['date'],'age':ride['age'],
    casePrior:ride['caseprior'],driverNo:ride['driverNo'],driverName:ride['driverName'],
    guardianNo:ride['guardianNo'],patientNo:ride['patientNo'],isVerified:ride['isVerified'],
    hospitalcoordinates:ride['hospitalcoordinates'],hospitalpolyline:ride['hospitalpolyline'],patientpolyline:ride['patientpolyline'],
    pickupcoordinates:ride['pickupcoordinates']
  }
  })

const showRideDetail=(event,rowData)=>{
  console.log(rowData)
  setRideDetail(rowData)
  setCardOpen(true)
  setTableOpen(false)
}
const hideRideDetail=()=>{
  setCardOpen(false)
}
const rideDetailBox=(
  <div className="carddetails">
          <div className="card-header">
              Ride details :
          <CloseIcon style={{cursor:'pointer',fontSize:'2rem'}} onClick={hideRideDetail}/>
          </div>
          <div className="card-body">
            <Container>
              <Row>
                <Col><div className='card-box'>Name:{rideDetail.name}</div></Col>
                <Col><div className='card-box'>Case:{rideDetail.case}</div></Col>
                <Col><div className='card-box'>Age:{rideDetail.age}</div></Col>
                <Col><div className='card-box'>Guardian {rideDetail.guardianNo}</div></Col>
              </Row>
              <Row>
              <Col><div className='card-box'>Driver Name:{rideDetail.driverName}</div></Col>
              <Col><div className='card-box'>Case Priority:{rideDetail.casePrior}</div></Col>
              <Col><div className='card-box'>Driver Number:{rideDetail.driverNo}</div></Col>
              <Col><div className='card-box'>{rideDetail.isVerified?'Verified Driver':'Not Verified Driver'}</div></Col>
              </Row>
            </Container>
          </div>
        </div>
)

return (
      <main>
      <ButtonDropdown
      direction='right'
      isOpen={tableOpen}
      toggle={handleDrawerToggle}
      style={{zIndex:'10',backgroundColor:'white'}}>
        <DropdownToggle style={{border:'none',backgroundColor:'white'}}>
          <MenuIcon color='primary' size='large' />
        </DropdownToggle>
        <DropdownMenu style={{maxWidth:'99vw',padding:'0',minWidth:'30vw'}}>
        <MaterialTable 
        columns={columns}
        data={rows} 
        icons={{
         Filter:FilterListIcon,
         FirstPage:FirstPageIcon,
         LastPage:LastPageIcon,
         PreviousPage:ArrowBackIcon,
         NextPage:ArrowForwardIcon,
         SortArrow:ArrowUpwardIcon
       }}
       onRowClick={showRideDetail}
       options={{
         filtering:true,
         search:false,
         toolbar:false,
         pageSizeOptions:[]
         }}/>
        </DropdownMenu>
      </ButtonDropdown>
      <PastRideMap rideDetail={rideDetail}/>
      {cardOpen && rideDetailBox}
        </main>
)
}
export default PastRides