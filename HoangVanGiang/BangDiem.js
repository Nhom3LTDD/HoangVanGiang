import React from 'react';
import { Button, View, Text,ActivityIndicator,FlatList} from 'react-native';
export default class BangDiem extends React.Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }
  componentDidMount(){
    return fetch('http://192.168.2.150:82/TracNghiem/BangDiem.php')
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
        <Text style={{ marginBottom: 20 }}>Điểm Đạt Được:</Text>  
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text> {item.tencauhoi}  Điểm.{item.result} </Text>}
          keyExtractor={({id}, index) => id}
        />
        <Button
          title="Quay lại"
          color="green"
         
        /> 
        
      </View>
    );
  }
}

