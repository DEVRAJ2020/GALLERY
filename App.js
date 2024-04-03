

import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

// app for searching image //
const App = () => {
  const [data, setData] = useState([]);
  const [txt, setTxt] = useState(null)
  const [filteredData, setFilteredData] = useState([]);
  const getData = async () => {
    const resp = await fetch('https://api.sampleapis.com/beers/ale');  //sample API 
    const json = await resp.json();
        setData(json.slice(0, 10));
  }


  useEffect(() => {
    getData(); // getting data fro the API
  }, []);
  const ImageRender = (item) => {
    return (<>
      <View style={{ height: 150, width: WIDTH * 0.3,overflow:'hidden', margin: 5, alignSelf: 'center', justifyContent: 'space-between',   backgroundColor: '#B3C8CF', borderWidth: 1, }}>

        <Image
          resizeMode="stretch"
          style={{ height: 100, width: WIDTH * 0.29,margin:1, backgroundColor: 'black', alignSelf: 'center' }}
          source={{ uri: item.item.image }} />

        <View style={{ maxHeight: 45, width: WIDTH * 0.29,margin: 5, alignSelf: 'center' }}>

          <Text key={item.id} style={{fontWeight:'400' }}>
            {item.item.name}

          </Text>

        </View>
      </View>
    </>)

  }

  const searchFilterFunction = (text) => { // execute the search functionality
    if (text) {
      const newData = data.filter(item => {

        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        console.log("filter data array is ", itemData, "ff", itemData.indexOf(textData));
        return itemData.indexOf(textData) > -1;
      })
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  }
  return (<>

    <View style={styles.mainView}>

      <TextInput
        style={{ height: 50, width: WIDTH * 0.95, backgroundColor: 'white', marginVertical: 20, alignSelf: 'center',borderRadius:20,borderWidth:1 }}
        onChangeText={(txt) => {
          setTxt(txt)
          searchFilterFunction(txt)
        }}
        value={txt}
        placeholder="Search Here"
      />
      <ScrollView style={styles.ImageArea}>
        <FlatList
          data={txt == null ? data : filteredData}
          numColumns={3}
          renderItem={ImageRender}
        />
      </ScrollView>
    </View>
  </>)
}

const styles = StyleSheet.create({
  mainView: {
    height: HEIGHT,
    width: WIDTH
  },
  ImageArea: {
    marginTop: 10,
    height: HEIGHT * 0.8,
    width: WIDTH
  }

})

export default App;