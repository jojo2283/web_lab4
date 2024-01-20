import React from 'react';

import { useSelector } from 'react-redux';
import DataTable from './DataTable';
import FormComponent from './FormComponent';
import CanvasComponent from './CanvasComponent';
import Header from './Header';
import '../index.css'
const MainApp = () => {
  const userData = useSelector(state => state.user.userData);
 

  return (
    <div>
      <Header/>
      <table id='hit-table'>
        <tbody>
          <tr>
            <td><FormComponent/></td>
            <td><CanvasComponent/></td>
          </tr>
          <tr>
            <td colSpan="2"><DataTable data={userData} /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MainApp;