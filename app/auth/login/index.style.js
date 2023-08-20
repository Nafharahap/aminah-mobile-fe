import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 28,
    alignItems: 'center',
    flexDirection: 'column'
  },
  containerForm: {
    width: '100%',
    marginTop: 36,
    flexDirection: 'column',
    paddingHorizontal: 40,
    gap: 16
  },
  logo: {
    height: 120,
    width: 132,
  },
  logoText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600'
  },
  textInputEmail: {
    borderWidth: 2,
    textAlign: 'center',
    borderRadius: 24,
    borderColor: '#199B57',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  textInputPassword: {
    borderWidth: 2,
    textAlign: 'center',
    borderRadius: 24,
    borderColor: '#199B57',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonLogin: {
    alignSelf: 'center',
    marginTop: '16',
    paddingHorizontal: 36,
    paddingVertical: 10,
    borderWidth: 2,
    textAlign: 'center',
    borderRadius: 32,
    backgroundColor: '#076E5B',
    borderColor: '#076E5B',
  }
});

export default styles