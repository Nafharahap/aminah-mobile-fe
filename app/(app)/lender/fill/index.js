import { useRouter } from "expo-router";
import { Pressable, SafeAreaView, ScrollView, Text, TextInput, View, StyleSheet, Platform } from "react-native";
import Checkbox from "expo-checkbox";
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { useState } from "react";
import { postLenderSubmission } from "../../../../services/lenderService";
import MaskInput, { Masks } from 'react-native-mask-input';
import { useSession } from "../../../../context/auth";

export default function FilProfilePage() {
  const router = useRouter()

  const { session } = useSession()

  const [nama, setNama] = useState(session.name);
  const [jenisKelamin, setJenisKelamin] = useState(1);
  const [tempatLahir, setTempatLahir] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [noHp, setNoHp] = useState('');
  const [nik, setNik] = useState('');
  const [alamat, setAlamat] = useState('');
  const [pemilikRekeningName, setPemilikRekeningName] = useState('');
  const [nomorRekening, setNomorRekening] = useState('');
  const [bankName, setBankName] = useState('');
  const [fileDiri, setFileDiri] = useState(null);
  const [fileKtp, setFileKtp] = useState(null);
  const [check, setCheck] = useState(false);

  const pickImage = async (typeInput) => {
    try {
      // No permissions request is necessary for launching the image library
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: true,
        allowsEditing: false,
        quality: 1,
      });

      let file = undefined
      if (Platform.OS === 'web') {
        const res = await fetch(`data:image/png;base64,${result.assets[0].base64}`);
        const blob = await res.blob();
        const type = blob.type.split('/').pop()
        file = new File([blob], `file.${type}`);
      } else {
        let localUri = result.assets[0].uri;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        file = { uri: localUri, name: filename, type }
      }


      if (!result.canceled) {
        if (typeInput === 'diri') {
          setFileDiri(file);
        } else if (typeInput === 'ktp') {
          setFileKtp(file);
        }
      } else {
        alert('Anda tidak memilih gambar');
      }
    } catch (error) {
      console.log(error);
      alert(error.message)
    }

  };

  const onRegisterUmkmButtonPressed = async () => {
    try {
      const data = new FormData();
      data.append('nama', nama)
      data.append('jenisKelamin', jenisKelamin)
      data.append('tempatLahir', tempatLahir)
      data.append('tanggalLahir', tanggalLahir)
      data.append('noHp', noHp)
      data.append('nik', nik)
      data.append('alamat', alamat)
      data.append('pemilikRekeningName', pemilikRekeningName)
      data.append('nomorRekening', nomorRekening)
      data.append('bankName', bankName)
      data.append('approvedCheck', check)

      data.append('file-diri', fileDiri)
      data.append('file-ktp', fileKtp)

      const response = await postLenderSubmission(data)

      console.log('Registrasi Berhasil')
      alert('Registrasi Berhasil')
      router.back()
    } catch (error) {
      console.log('Pengajuan Gagal', error)
      alert('Pengajuan Gagal')
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: 16 }}>
          <Text style={styles.textSubHeader}>
            Lengkapi informasi di bawah ini dengan benar.
          </Text>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Nama Lengkap (Sesuai KTP)</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setNama}
              value={nama}
              placeholder='Nama Lenkap'
              placeholderTextColor="#6C6C6C"
              editable={false}
              selectTextOnFocus={false}
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Jenis Kelamin</Text>
            <Picker
              style={styles.pickerInput}
              selectedValue={jenisKelamin}
              onValueChange={(itemValue, itemIndex) =>
                setJenisKelamin(itemValue)
              }>
              <Picker.Item label="Laki-laki" value="1" />
              <Picker.Item label="Wanita" value="2" />
            </Picker>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Tempat Lahir (Sesuai KTP)</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setTempatLahir}
              value={tempatLahir}
              placeholder='Tempat Lahir'
              placeholderTextColor="#6C6C6C"
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Tanggal Lahir (Sesuai KTP)</Text>
            <MaskInput
              style={styles.textInput}
              value={tanggalLahir}
              onChangeText={setTanggalLahir}
              mask={Masks.DATE_YYYYMMDD}
              placeholder="YYYY/MM/DD"
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Nomor Hp Aktif</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setNoHp}
              value={noHp}
              placeholder='Nomor Hp Aktif'
              placeholderTextColor="#6C6C6C"
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>NIK (Nomor Induk Kependudukan)</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setNik}
              value={nik}
              placeholder='NIK (Nomor Induk Kependudukan)'
              placeholderTextColor="#6C6C6C"
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Alamat (Sesuai KTP)</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setAlamat}
              value={alamat}
              placeholder='Alamat (Sesuai KTP)'
              placeholderTextColor="#6C6C6C"
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Nama Pemilik Rekening</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setPemilikRekeningName}
              value={pemilikRekeningName}
              placeholder='Nama Pemilik Rekening'
              placeholderTextColor="#6C6C6C"
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Nomor Rekening</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setNomorRekening}
              value={nomorRekening}
              placeholder='Nomor Rekening'
              placeholderTextColor="#6C6C6C"
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Nama Bank</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setBankName}
              value={bankName}
              placeholder='Nama Bank'
              placeholderTextColor="#6C6C6C"
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Foto Diri</Text>
            <Pressable
              style={styles.textInput}
              onPress={() => pickImage('diri')}>
              {fileDiri
                ? <Text style={{ textAlign: 'center', fontWeight: 700 }}>Gambar Terpilih</Text>
                : <Text style={{ textAlign: 'center', color: '#6C6C6C' }}>Pilih Gambar...</Text>
              }
            </Pressable>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Foto KTP</Text>
            <Pressable
              style={styles.textInput}
              onPress={() => pickImage('ktp')}>
              {fileKtp
                ? <Text style={{ textAlign: 'center', fontWeight: 700 }}>Gambar Terpilih</Text>
                : <Text style={{ textAlign: 'center', color: '#6C6C6C' }}>Pilih Gambar...</Text>
              }
            </Pressable>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 20 }}>
            <Checkbox
              style={styles.checkbox}
              value={check}
              onValueChange={setCheck}
              color={check ? '#4630EB' : undefined}
            />
            <Text>Saya menyatakan bahwa data yang saya masukkan adalah benar.</Text>
          </View>

          <Pressable style={styles.buttonRegister} onPress={onRegisterUmkmButtonPressed}>
            <Text style={{ textAlign: 'center', color: '#FFFFFF' }}>Lengkapi Profil Saya Sekarang</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: '16',
    textAlign: 'center',
    paddingVertical: 12,
    borderRadius: 32,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 12
  },
  buttonRegister: {
    alignSelf: 'center',
    paddingHorizontal: 36,
    paddingVertical: 10,
    borderWidth: 2,
    textAlign: 'center',
    borderRadius: 32,
    marginTop: 20,
    backgroundColor: '#076E5B',
    borderColor: '#076E5B',
  },
  textHeader: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12
  },
  textSubHeader: {
    color: '#6C6C6C',
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 12
  },
  textLabel: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12
  },
  textInput: {
    borderRadius: 5,
    backgroundColor: '#D9D9D9',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  pickerInput: {
    borderRadius: 5,
    backgroundColor: '#D9D9D9',
    paddingLeft: 16,
    paddingRight: 16,
    paddingVertical: 10,
  },
  checkbox: {
    borderRadius: 5,
    borderWidth: 1,
    width: 24,
    height: 24,
    borderColor: '#076E5B',
    backgroundColor: '#D9D9D9'
  },
})