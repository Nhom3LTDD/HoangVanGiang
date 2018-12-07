import React from 'react';
import { Button, View, Text,ActivityIndicator,FlatList, ImageBackground, StyleSheet} from 'react-native';
export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }
  componentDidMount(){
    return fetch('http://192.168.3.166:82/TracNghiem/DapAn.php')
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
      <ImageBackground source={require('./bg.png')} style={styles.container}>
      <View style={{ flex: 1, margin:20}}>
      <Text style={{ marginBottom: 20, textAlign: 'center', backgroundColor: 'green', fontSize: 20, color: "white" }}>CÂU HỎI TRẮC NGHIỆM</Text>
        <Text style={{ marginBottom: 20, color: "white", textAlign: "center" , fontSize: 15, marginBottom: 100}}>ĐÁP ÁN:</Text>  
        <FlatList 
          data={this.state.dataSource}
          renderItem={({item}) => <Text style = {{textAlign: "center", marginBottom: 10, }}> {item.tencauhoi} : {item.dapancauhoi} </Text>}
          keyExtractor={({id}, index) => id}
        />
       <Button
          title="Tiếp"
          color="green"
          //onPress={() => this.props.navigation.navigate('Diem')}
        /> 
        
      </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    
    justifyContent: 'center',
    //marginTop: 0, 
},
});

