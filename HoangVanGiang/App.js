import React from 'react';
import { Button, View, Text,ActivityIndicator,FlatList} from 'react-native';
export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }
  componentDidMount(){
    return fetch('http://192.168.2.150:82/TracNghiem/DapAn.php')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }
  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <View style={{ flex: 1, margin:20 }}>
       <Text style={{ marginBottom: 20, textAlign: 'center', backgroundColor: 'green' }}>CÂU HỎI TRẮC NGHIỆM</Text>
        <Text style={{ marginBottom: 20 }}>Đáp Án:</Text>  
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text> {item.tencauhoi} : {item.dapancauhoi} </Text>}
          keyExtractor={({id}, index) => id}
        />
       <Button
          title="Tiếp"
          color="green"
          
        /> 
        
      </View>
    );
  }
}

