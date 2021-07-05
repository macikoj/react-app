import React from 'react';
import { forwardRef } from 'react';

import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
class PlayerStatisticsTable extends React.Component  {

constructor(props) {
    super(props);
    this.state = {
      data: props.dataa,
        columns: [
            { title: 'Liczba podań', field: 'totalPasses',type: 'numeric' ,emptyValue:0},
            { title: 'Celne podania', field: 'succesfulPasses',type: 'numeric',emptyValue:0 },
            { title: 'Liczba wślzigów', field: 'totalTackles', type: 'numeric',emptyValue:0 },
            { title: 'Udane wślizgi', field: 'succesfulTackles', type: 'numeric',emptyValue:0 },
            { title: 'Liczba strzałów', field: 'totalShots', type: 'numeric' ,emptyValue:0},
            { title: 'Strzały celne', field: 'succesfulShots', type: 'numeric' ,emptyValue:0},
            { title: 'Strzały zablokowane', field: 'shotsBlocked', type: 'numeric' ,emptyValue:0},
            { title: 'Asysty', field: 'assists', type: 'numeric',emptyValue:0 },
            { title: 'Straty', field: 'ballsLost', type: 'numeric',emptyValue:0 },
            { title: 'Faule', field: 'foulsCommited', type: 'numeric',emptyValue:0 },
            { title: 'Żółte', field: 'yellowCards', type: 'numeric',emptyValue:0 },
            { title: 'Czerwone', field: 'redCards', type: 'numeric',emptyValue:0 },
            { title: 'Obronione strzały', field: 'shorsDefended', type: 'numeric' ,emptyValue:0},
            { title: 'Stracone bramki', field: 'goals_lost', type: 'numeric',emptyValue:0 },
            { title: 'Minuty zagrane', field: 'minutesPlayed', type: 'numeric',emptyValue:0 },
            { title: 'Data', field: 'matchDate', type: 'date' },

          ],
          
        }
        
}
componentWillReceiveProps(nextProps){ 
  if(nextProps.dataa!== this.props.dataa){
      this.setState({data:nextProps.dataa});
  }
}
render(){


    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
      };
  return (

    <MaterialTable

    icons={tableIcons}
      title="Statystyki gracza"
      columns={this.state.columns}
      localization={{        header: {
        actions: 'Akcje'
    },
    toolbar:{searchPlaceholder:"Szukaj"},
    body:{emptyDataSourceMessage:"Brak statystyk do wyświetlenia"
	
    },
    pagination:{labelRowsSelect:"Wierszy"}

  }}

  pagination
      data={this.state.data}
      editable={{
        onRowAdd: newData =>
        
          new Promise(resolve => {
            
            setTimeout(() => {
              resolve();
              const dataup = [...this.state.data];
              dataup.push(newData);
              this.setState({data:dataup})
              this.props.onRowAdd(newData)
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                this.setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
              this.props.onRowUpdate(newData)
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              this.setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
              this.props.onRowDelete(oldData.id)
            }, 600);
          }),
      }}
    />
  
  );
}
}
export default PlayerStatisticsTable