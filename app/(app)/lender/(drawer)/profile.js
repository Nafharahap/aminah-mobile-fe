import { View, SafeAreaView, Text, Pressable, Image, ScrollView, StyleSheet, RefreshControl, ImageBackground } from "react-native"
import { Link, useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";
import { API_BASE_URL } from '@env'
import { getProfileLender } from "../../../../services/lenderService";
import { formatCurrencyRp } from "../../../../helpers/formatNumber";
import { MaterialIcons, FontAwesome5, FontAwesome, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { useSession } from "../../../../context/auth";

export default function LenderProfile() {
  const [profile, setProfile] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const { signOut } = useSession()

  const getData = async () => {
    try {
      const response = await getProfileLender()
      if (response) {
        setProfile(response.data.payload.user)
      }
    } catch (error) {
      alert(error)
    } finally {
      setRefreshing(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData();
  }, []);

  const onLogoutPressed = () => {
    signOut()
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {
          !profile?.checkProfile
            ? (
              <Text style={{ fontSize: 12, textAlign: 'center', paddingVertical: 16, backgroundColor: '#fff3cd' }}>
                Profil kamu belum lengkap, lengkapi profil kamu
                <Link href={'/(app)/lender/fill'}>
                  <Text style={{ fontSize: 12, color: '#5fcf80' }}> disini!!</Text>
                </Link>
              </Text>
            )
            : null
        }
        <ImageBackground source={require('../../../../assets/images/headerBg.png')} style={{ height: 'auto', width: '100%' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
            <Image
              style={{ width: 96, height: 96, borderRadius: '50%' }}
              source={`${API_BASE_URL}/profile/${profile?.lender?.lender_image}`}
              defaultSource={require('../../../../assets/images/profile-placeholder.jpeg')}
            />
            <View style={{ marginLeft: 20, flex: 1 }}>
              <Text style={{ color: '#000000', fontSize: 24, fontWeight: 'bold', marginBottom: 4 }}>
                {profile?.name}
              </Text>
              <View style={{ alignSelf: 'flex-start', backgroundColor: '#076E5B', borderRadius: 20 }}>
                <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: 'bold', textAlign: 'center', paddingVertical: 4, paddingHorizontal: 12 }}>
                  {profile?.lender?.status || 'Unverified'}
                </Text>
              </View>

              <View style={{ borderBottomColor: '#076E5B', borderBottomWidth: StyleSheet.hairlineWidth, marginVertical: 8 }}
              />

              <Text>Saldo:</Text>
              <Text style={{ color: '#076E5B', fontSize: 20, fontWeight: 700 }}>{formatCurrencyRp(profile?.sumAmount)}</Text>
            </View>
          </View>
        </ImageBackground>

        <View style={{ flex: 1, padding: 16 }}>

          <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center', marginBottom: 28 }}>
            <View style={{ borderRadius: '50%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#D9D9D9', padding: 12 }}>
              <MaterialIcons name="email" size={36} color="#FFFFFF" />
            </View>
            <View>
              <Text style={{ color: '#076E5B', fontSize: 16, fontWeight: 700 }}>Email</Text>
              <Text style={{ fontSize: 12, fontWeight: 300 }}>{profile?.email}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center', marginBottom: 28 }}>
            <View style={{ borderRadius: '50%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#D9D9D9', padding: 12 }}>
              <FontAwesome5 name="address-card" size={32} color="white" />
            </View>
            <View>
              <Text style={{ color: '#076E5B', fontSize: 16, fontWeight: 700 }}>NIK</Text>
              <Text style={{ fontSize: 12, fontWeight: 300 }}>{profile?.lender?.nik}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center', marginBottom: 28 }}>
            <View style={{ borderRadius: '50%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#D9D9D9', padding: 12 }}>
              <FontAwesome name="bank" size={32} color="white" />
            </View>
            <View>
              <Text style={{ color: '#076E5B', fontSize: 16, fontWeight: 700 }}>Bank</Text>
              <Text style={{ fontSize: 12, fontWeight: 300 }}>{profile?.lender?.bank_name}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center', marginBottom: 28 }}>
            <View style={{ borderRadius: '50%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#D9D9D9', padding: 12 }}>
              <MaterialIcons name="switch-account" size={32} color="white" />
            </View>
            <View>
              <Text style={{ color: '#076E5B', fontSize: 16, fontWeight: 700 }}>Nomor Rekening</Text>
              <Text style={{ fontSize: 12, fontWeight: 300 }}>{profile?.lender?.account_number}</Text>
            </View>
          </View>

          <Link href={'/(app)/lender/topup'} >
            <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center', marginBottom: 28 }}>
              <View style={{ borderRadius: '50%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#D9D9D9', padding: 12 }}>
                <MaterialCommunityIcons name="bank-transfer-in" size={36} color="white" />
              </View>
              <View>
                <Text style={{ color: '#076E5B', fontSize: 16, fontWeight: 700 }}>Isi Saldo</Text>
              </View>
              <View>
                <MaterialCommunityIcons name="chevron-right" size={24} color="black" />
              </View>
            </View>
          </Link>

          <Link href={'/(app)/lender/tarik-dana'} >
            <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center', marginBottom: 28 }}>
              <View style={{ borderRadius: '50%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#D9D9D9', padding: 12 }}>
                <MaterialCommunityIcons name="bank-transfer-out" size={36} color="white" />
              </View>
              <View>
                <Text style={{ color: '#076E5B', fontSize: 16, fontWeight: 700 }}>Tarik Saldo</Text>
              </View>
              <View>
                <MaterialCommunityIcons name="chevron-right" size={24} color="black" />
              </View>
            </View>
          </Link>

          <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
            <View style={{ borderRadius: '50%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#D9D9D9', padding: 12 }}>
              <Entypo name="log-out" size={32} color="white" />
            </View>
            <Pressable onPress={onLogoutPressed}>
              <Text style={{ color: '#076E5B', fontSize: 16, fontWeight: 700 }}>Keluar</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}