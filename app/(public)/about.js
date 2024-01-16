import { View, SafeAreaView, Text, Image, ScrollView } from "react-native"
import { FontAwesome } from '@expo/vector-icons';
import { Link } from "expo-router";

export default function AboutUsPage() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF', padding: 20 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={{ justifyContent: 'center' }}>
          <Image
            source={require('../../assets/images/logo-aminah-01.png')}
            style={{ width: 'auto', height: 120, paddingVertical: 100 }}
          />
        </View>

        <Text style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Apa Itu Aminah?</Text>
        <Text style={{ color: '#6C6C6C', fontSize: 16, textAlign: 'justify', marginBottom: 16 }}>Aminah merupakan sebuah platform yang memfasilitasi bertemunya antara pemilik dana dengan para pemilik UMKM yang sedang membutuhkan dana.</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 12 }}>
          <FontAwesome name="angle-double-right" size={32} color="#199B57" />
          <Text style={{ color: '#6C6C6C', fontSize: 16, textAlign: 'justify' }}>Dengan menjadi sobat Aminah, anda dapat membantu dalam memajukan UMKM dan membantu sesama.</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <FontAwesome name="angle-double-right" size={32} color="#199B57" />
          <Text style={{ color: '#6C6C6C', fontSize: 16, textAlign: 'justify' }}>Dengan menjadi sobat Aminah, anda dapat membantu dalam memajukan UMKM dan membantu sesama.</Text>
        </View>

        <Text style={{ fontSize: 28, fontWeight: 700, marginTop: 32, marginBottom: 16 }}>Ingin jadi sobat atau mitra Aminah?</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <FontAwesome name="angle-double-right" size={32} color="#199B57" />
          <Link href={'/auth/register'} style={{ color: '#199B57', fontSize: 20, fontWeight: 700 }}>Daftar Disini!!</Link>
        </View>
      </ScrollView>
    </SafeAreaView >
  );
}