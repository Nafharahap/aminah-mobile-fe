import { View, Text, SafeAreaView, ImageBackground, ScrollView, Pressable, StyleSheet, RefreshControl } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useRouter, useFocusEffect, useLocalSearchParams, useNavigation } from 'expo-router';
import { getDetailMitra } from '../../../../services/publicService';
import { API_BASE_URL } from '@env'
import { Entypo, Ionicons } from '@expo/vector-icons';
import { useSession } from '../../../../context/auth';
import { formatCurrencyRp } from '../../../../helpers/formatNumber';
import { StackProfilePicture } from '../../../../components';
import { BUSINESS_TYPE_LABEL, PENDANAAN_TYPE, PENDANAAN_TYPE_LABEL, PENDANAAN_TYPE_LABEL_COLOR } from '../../../../constants/general';

const BusinessDetailPage = () => {
  const router = useRouter()
  const navigation = useNavigation()
  const params = useLocalSearchParams();
  const { id } = params
  const [business, setBusiness] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const [unitCount, setUnitCount] = useState(1)
  const { session } = useSession()

  const getData = async () => {
    setRefreshing(true);
    try {
      const response = await getDetailMitra(id)
      if (response) {
        setBusiness(response.data.payload.funding)
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
    }, [id])
  );

  const onRefresh = useCallback(() => {
    getData();
  }, [id]);

  const onButtonBuyPressed = () => {
    router.push({ pathname: '/(app)/lender/mitra/modalCartDetails', params: { id: business.id, count: unitCount } })
  }

  const subtractCount = () => {
    if (unitCount > 1) {
      setUnitCount(unitCount - 1)
    }
  }

  const addCount = () => {
    if (unitCount < business?.sisa_unit) {
      setUnitCount(unitCount + 1)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ flex: 1 }}>
          <View style={{
            flex: 1,
            width: '100%',
            height: 360,
            maxHeight: 360,
            minHeight: 360
          }}>
            <ImageBackground
              source={{ uri: `${API_BASE_URL}/pendaftaran/${business?.borrower.business_image}` }}
              resizeMode="cover"
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
                position: 'relative'
              }}
            >
              <Pressable
                onPress={navigation.goBack}
                style={{
                  width: 40,
                  height: 40,
                  position: 'absolute',
                  top: 32,
                  left: 16
                }}
              >
                <Ionicons name="arrow-back" size={32} color="black" />
              </Pressable>
              <View style={{
                position: 'absolute',
                bottom: 32,
                left: 0,
                paddingLeft: 16,
                paddingRight: 16,
                paddingVertical: 8,
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                backgroundColor: 'rgba(255, 255, 255, 0.70)'
              }}>
                <Text style={{
                  textAlign: 'justify',
                  fontWeight: 'bold',
                  fontSize: 32,
                  color: '#076e5b'
                }}>
                  {business?.borrower.business_name}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={{
            flex: 1,
            padding: 16
          }}>
            <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center', justifyContent: 'space-between' }}>
              <View>
                <Text style={{ color: '#076e5b', fontSize: 16, fontWeight: 'bold' }}>
                  {business?.borrower.name}
                </Text>
                <Text style={{ color: '#000000', fontSize: 12, fontWeight: 300 }}>
                  {business?.borrower.address}
                </Text>
                <Text style={{ color: '#000000', fontSize: 12, fontWeight: 300 }}>
                  {BUSINESS_TYPE_LABEL[business?.borrower.business_type]}
                </Text>
              </View>

              <View style={{ borderWidth: 1, borderRadius: 8, borderColor: PENDANAAN_TYPE_LABEL_COLOR[business?.status], paddingHorizontal: 12, paddingVertical: 8 }}>
                <Text style={{ color: PENDANAAN_TYPE_LABEL_COLOR[business?.status], fontSize: 16, fontWeight: 700 }}>{PENDANAAN_TYPE_LABEL[business?.status]}</Text>
              </View>
            </View>

            <View style={{ borderBottomColor: '#D9D9D9', borderBottomWidth: StyleSheet.hairlineWidth, marginTop: 16, marginBottom: 4 }}
            />

            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 8
            }}>
              <View>
                <StackProfilePicture fundingLenders={business?.fundinglenders} />
              </View>
              <View>
                <Text style={{ color: '#076E5B', fontWeight: 300 }}>
                  <Text style={{ color: '#076E5B', fontWeight: 700, marginRight: 8 }}>
                    {business?.fundinglenders.length > 0 ? business?.fundinglenders.length : 0}
                  </Text>
                  Donatur
                </Text>
              </View>
            </View>

            <View style={{ borderBottomColor: '#D9D9D9', borderBottomWidth: StyleSheet.hairlineWidth, marginTop: 4, marginBottom: 16 }}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
              <Text style={{ fontWeight: 500, fontSize: 12 }}>Total Pendanaan Dibutuhkan:</Text>
              <Text style={{ fontWeight: 300, fontSize: 12 }}>{formatCurrencyRp(business?.borrower.borrower_first_submission)}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
              <Text style={{ fontWeight: 500, fontSize: 12 }}>Nilai Per Unit Pendanaan:</Text>
              <Text style={{ fontWeight: 300, fontSize: 12 }}>Rp100.000</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
              <Text style={{ fontWeight: 500, fontSize: 12 }}>Estimasi Bagi Hasil:</Text>
              <Text style={{ fontWeight: 300, fontSize: 12 }}>{business?.borrower.profit_sharing_estimate}%</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
              <Text style={{ fontWeight: 500, fontSize: 12 }}>Lama Pendanaan:</Text>
              <Text style={{ fontWeight: 300, fontSize: 12 }}>{business?.borrower.duration} Bulan</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
              <Text style={{ fontWeight: 500, fontSize: 12 }}>Siklus Bagi Hasil:</Text>
              <Text style={{ fontWeight: 300, fontSize: 12 }}>Per 1 Bulan</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
              <Text style={{ fontWeight: 500, fontSize: 12 }}>Penghasilan Perbulan:</Text>
              <Text style={{ fontWeight: 300, fontSize: 12 }}>{formatCurrencyRp(business?.borrower.borrower_monthly_income)}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
              <Text style={{ fontWeight: 500, fontSize: 12 }}>Akad:</Text>
              <Text style={{ fontWeight: 300, fontSize: 12 }}>Mudharabah</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
              <Text style={{ fontWeight: 500, fontSize: 12 }}>Progres Pendanaan:</Text>
              <Text style={{ fontWeight: 300, fontSize: 12 }}>{+business?.dana_terkumpul_persen.toFixed(2)}%</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={{ backgroundColor: '#D9D9D9', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 8 }}>
        <View>
          <Text style={{ fontSize: 10, fontWeight: 500 }}>Harga per unit:</Text>
          <Text style={{ fontSize: 16, fontWeight: 700, color: '#199B57' }}>Rp100.000</Text>
          <Text style={{ fontSize: 10, fontWeight: 300 }}>Estimasi Bagi Hasil: {business?.borrower.profit_sharing_estimate}%. Sisa {business?.sisa_unit} unit</Text>
        </View>

        <View style={{ display: session && session.role == 'lender' ? 'flex' : 'none' }}>
          <View style={{ padding: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', width: 80, borderRadius: 20, marginBottom: 4 }}>
            <Entypo onPress={subtractCount} name="circle-with-minus" size={20} color="#076E5B" />
            <Text style={{ fontSize: 12 }}>{unitCount}</Text>
            <Entypo onPress={addCount} name="circle-with-plus" size={20} color="#076E5B" style={{ opacity: unitCount === business?.sisa_unit ? 0.3 : 1 }} />
          </View>
          <Pressable style={{ paddingHorizontal: 16, paddingVertical: 2, width: 80, borderRadius: 20, backgroundColor: business?.sisa_unit > 0 ? '#076E5B' : '#6C6C6C' }} onPress={onButtonBuyPressed} disabled={business?.sisa_unit === 0}>
            <Text style={{ textAlign: 'center', color: '#FFFFFF', fontWeight: 500, opacity: business?.sisa_unit > 0 ? 1 : 0.3 }}>Beli</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView >
  )
}

export default BusinessDetailPage