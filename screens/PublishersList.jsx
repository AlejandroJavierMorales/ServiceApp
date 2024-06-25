
import { View, Text, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import { PublisherRow } from '../components/shared';
import { useDispatch, useSelector } from "react-redux";
import { setPublisher} from "../fetures/Publishers/PublishersSlice";



const PublishersList = ({ navigation, route }) => {

  const { width } = useWindowDimensions(); // Obtiene el ancho de la pantalla
  
  const publishersStored =useSelector((state)=>state.publishers.value.publishers);
  const publisherStored =useSelector((state)=>state.publishers.value.publisher);
  const dispatch = useDispatch();

  const onHandleLocation = (item)=>{
    console.log(JSON.stringify('Location '+item,null,2))
  }
  const onHandleWhatsapp = (item)=>{
    console.log(JSON.stringify('Whatsapp '+item,null,2))
  }
  const onHandleDetail = (item)=>{
    dispatch(setPublisher(item));
    navigation.navigate('PublisherDetail', item?.company_name);
    console.log(JSON.stringify('Detail '+item,null,2))
  }

  const cardWidth = (width - 10) / 3; // Calcula el ancho de cada tarjeta para 3 tarjetas por fila



  return (
    <View>
      {
      publishersStored[0]?.firstname  && (
        publishersStored.map((item, index) => (
        <PublisherRow 
          key={index} 
          item={item} 
          onHandleLocation={() => onHandleLocation(item)}
          onHandleWhatsapp={() => onHandleWhatsapp(item)}
          onHandleDetail={() => onHandleDetail(item)}
        />
      ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10
  },
  listCards: {
    paddingBottom: 10,
    paddingTop: 10,
    alignItems: 'center'
  }
});

export default PublishersList;
