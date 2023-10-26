import { Image, View, Text } from "react-native";
import * as Progress from 'react-native-progress';

const Business = ({ business, index }) => {
  return (
    <View style={[
      {
        flex: 1,
      },
      index % 2 === 0
        ? {
          paddingRight: 6,
        } : {
          paddingLeft: 6
        }
    ]}>
      <Image
        source={business.image}
        style={{
          width: '100%',
          minHeight: 108,
          maxHeight: 108,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      />
      <View style={{ justifyContent: 'space-between', minHeight: 120, maxHeight: 120, paddingBottom: 16, paddingHorizontal: 8, paddingTop: 4, backgroundColor: 'white', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
        <Text style={{ fontWeight: 500, fontSize: 12 }}>{business.businessesName}</Text>

        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Text style={{ fontWeight: 500, fontSize: 12, color: '#199B57', flex: 3 }}>Rp 100.000</Text>
            <Text style={{
              color: 'white',
              fontSize: 8,
              flex: 1,
              backgroundColor: '#076E5B',
              borderRadius: 10,
              paddingHorizontal: 8,
              paddingVertical: 2
            }}>
              Keterangan
            </Text>
          </View>
          <Text style={{ fontWeight: 500, fontSize: 10 }}>Terkumput <Text style={{ color: '#199B57' }}>2 jt</Text></Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
            <Text style={{ color: '#199B57', fontWeight: 500, fontSize: 10, marginBottom: 2 }}>20 %</Text>
            <Text style={{ fontWeight: 500, fontSize: 10 }}>Dari <Text style={{ color: '#199B57', fontWeight: 500, fontSize: 10 }}>Rp 10 jt</Text></Text>
          </View>
          <Progress.Bar progress={0.3} color="#076E5B" unfilledColor="#D9D9D9" borderWidth={0} borderRadius={8} width={null} height={4} />
        </View>
      </View>
    </View>
  )
}

export default Business;
