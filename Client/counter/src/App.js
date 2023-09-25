import React,{useState} from "react";
import axios from 'axios';
import { Chart } from "react-google-charts";
import "./App.css";
import manPhoto from './man.png';
import girlPhoto from './girl.png';
import boyPhoto from './boy.png';
import womanPhoto from './woman.png';

function App(){

  const [data, setData] = useState({
    men: 0,
    women: 0,
    boys: 0,
    girls:0,
  });

  const [bdata, setBData] = useState({
    men: 0,
    women: 0,
    boys: 0,
    girls:0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post('http://localhost:3000/api/give',data);
      const response = await axios.put(`http://localhost:3000/api/give/65114a80a2ecb0464cfd78c8`, data);
      console.log('Put request successful:', response.data);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
    getDataFromBackEnd();
  };

  const getDataFromBackEnd = async () =>{
    try{
      const res = await axios.get('http://localhost:3000/api/recieve');
      setBData(res.data[0]);
      console.log(res.data[0]);
      console.log('render');
    }catch(err){
      console.log(err);
    }
  }

  const chartdata = [
    ['Group', 'Count'],
    ['Men', bdata.men],
    ['Women', bdata.women],
    ['Girls', bdata.girls],
    ['Boys', bdata.boys]
  ];

  const options = {
    title: 'Groups',
    is3D: true,
    chartArea: { width: '90%', height: '90%' } ,
    backgroundColor: '#E4E4E4',
  };

  return (
    <div className="MainSection">
      <div className="SubmitSection">

        <div className="InputCard">
          <img src={manPhoto}/>
          <input type="number" name="men" onChange={handleChange}/>
        </div>

        <div className="InputCard">
          <img src={womanPhoto}/>
          <input type="number" name="women" onChange={handleChange}/>
        </div>

        <div className="InputCard">
          <img src={boyPhoto}/>
          <input type="number" name="boys" onChange={handleChange}/>
        </div>

        <div className="InputCard">
          <img src={girlPhoto}/>
          <input type="number" name="girls" onChange={handleChange}/>
        </div>
  
      </div>
      
      <div className="ButtonDiv">
        <button onClick={handleSubmit}>Submit</button>
      </div>

      <div className="PeopleSection">

        <div className="Card">
          <p>{bdata.men}</p>
          <img src={manPhoto}/>
        </div>
        <div className="Card">
          <p>{bdata.women}</p>
          <img src={womanPhoto}/>
        </div>
        <div className="Card">
          <p>{bdata.boys}</p>
          <img src={boyPhoto}/>
        </div>
        <div className="Card">
          <p>{bdata.girls}</p>
          <img src={girlPhoto}/>
        </div>

      </div>
      <div className="ChartDiv">
        <Chart
          chartType="PieChart"
          data={chartdata}
          options={options}
          width="500px"
          height="500px"
          loader={<div>Loading Chart</div>}
        />
      </div>
    </div>
  );
}

export default App;