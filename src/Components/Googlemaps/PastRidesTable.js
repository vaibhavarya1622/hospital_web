import React,{useState,useEffect} from 'react'
import {withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Modal from '@material-ui/core/Modal';
import PastRideMap from './PastRideMap.js'
import Drawer from '@material-ui/core/Drawer'
import '@material-ui/icons'
import axios from 'axios'
import moment from 'moment'
import MaterialTable from 'material-table';
import FilterListIcon from '@material-ui/icons/FilterList';
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

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles=makeStyles(theme=>({
  root:{
    width:'100%'
  },
  paper:{
    top:'20%',
  },
  drawerPaper: {
    width: 450,
    background: 'seashell',
    [theme.breakpoints.up('1650')]:{
      width:'20%'
    }
  }
}))

const PastRides=()=>{
  const classes=useStyles()
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
        console.log(data);
        const arr = data.map((data) => {
          return {
            name: data['name'],
            age: data.age,
            caseprior: data.casePrior,
            pname: data.name,
            driverno: data["pickedBy"].mobileNo,
            pcase: data.pcase,
            date: moment(data['createdAt']).format('D/MM/YYYY'),
            rideid: data.RideId,
            _id: data["pickedBy"]._id,
            guardianNo: data.guardianNo,
            patientNo: data.patientNo,
            polyline: data.patientPolyline,
            pickupcoordinates: data["pickUplocation"].coordinates,
            hospitalcoordinates:
              data["hospital"]["hospitalLocation"].coordinates,
            ispicked: data.isPicked,
            hospitalpolyline: data.hospitalPolyline,
          };
        });
        setRides(arr);
      });
  }, []);

   const columns=[
     {field:'id',  title:'Id',hidden:true},
     {field:'name',title:'Name'},
     {field:'case',title:'Case'},
     {field:'date',title:'Date',type:'date'}
   ]
  const rows=rides.map((ride)=>{
    return {id:ride['_id'],name:ride['name'],case:ride['pcase'],date:ride['date']}
  })

 
  // const rows=[
  //   {name:'fskd',case:'fsdf',date:'22/03/2020',id:1},
  //   {name:'fskd',case:'fsdf',date:'22/03/2020',id:2},
  //   {name:'fskd',case:'fsdf',date:'22/03/2020',id:3},
  //   {name:'fskd',case:'fsdf',date:'22/03/2020',id:4},
  //   {name:'fskd',case:'fsdf',date:'22/03/2020',id:5},
  //   {name:'fskd',case:'fsdf',date:'22/03/2020',id:6},
  //   {name:'fskd',case:'fsdf',date:'22/03/2020',id:7},
  //   {name:'fskd',case:'fsdf',date:'22/03/2020',id:8},
  //   {name:'fskd',case:'fsdf',date:'22/03/2020',id:9},
  //   {name:'fskd',case:'fsdf',date:'22/03/2020',id:10},
  //   {name:'fskd',case:'fsdf',date:'22/03/2020',id:11},
  //   {name:'fskd',case:'fsdf',date:'22/03/2020',id:12},
  //   {name:'fskd',case:'fsdf',date:'22/03/2020',id:13},
  //   {name:'fskd',case:'fsdf',date:'22/03/2020',id:14},
  //   {name:'fskd',case:'fsdf',date:'22/03/2020',id:15},
  //   {name:'fskd',case:'fsdf',date:'22/03/2020',id:16},
  //   {name:'fskd',case:'fsdf',date:'22/03/2020',id:17},
  //   {name:'fskd',case:'fsdf',date:'22/03/2020',id:18},
  //   {name:'fskd',case:'fsdf',date:'22/03/2020',id:19},
  //   {name:'fskd',case:'fsdf',date:'22/03/2020',id:20},
  //   {name:'fskd',case:'fsdf',date:'22/03/2020',id:21},
  //   {name:'fskd',case:'fsdf',date:'22/03/2020',id:22},
  //   {name:'fskd',case:'fsdf',date:'22/03/2020',id:23},
  //   {name:'fskd',case:'fsdf',date:'22/03/2020',id:24},
  //   {name:'fskd',case:'fsdf',date:'22/03/2020',id:25},
  //   {name:'fskd',case:'fsdf',date:'22/03/2020',id:26},
  //   {name:'fskd',case:'fsdf',date:'22/03/2020',id:27},
  //   {name:'fskd',case:'fsdf',date:'22/03/2020',id:28},
  //   {name:'fskd',case:'fsdf',date:'22/03/2020',id:29},
  //   {name:'fskd',case:'fsdf',date:'22/03/2020',id:30},
  //   {name:'fskd',case:'fsdf',date:'22/03/2020',id:31},
  // ]
const showRideDetail=()=>{
  console.log('Click')
}

return (
      <main>
      <ButtonDropdown
      direction='right'
      isOpen={tableOpen}
      toggle={handleDrawerToggle}
      style={{zIndex:'10',color:'#6610f2'}}>
        <DropdownToggle >
        <ArrowForwardIosIcon color='primary' size='medium' />
        </DropdownToggle>
        <DropdownMenu style={{maxWidth:'99vw',width:'500px',height:'500px',padding:'0'}}>
        <MaterialTable 
        columns={columns}
        data={rows} 
        icons={{
         Filter:FilterListIcon,
         FirstPage:FirstPageIcon,
         LastPage:LastPageIcon,
         PreviousPage:ArrowBackIcon,
         NextPage:ArrowForwardIcon
       }}
       onRowClick={showRideDetail}
       options={{
         filtering:true,
         search:false,
         toolbar:false
         }}/>
        </DropdownMenu>
      </ButtonDropdown>
      <PastRideMap />
        </main>
)
}
export default PastRides