import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 28,
    alignItems: 'center'
  },
  logo: {
    height: 120,
    width: 132,
    textAlign: 'center',
  },
  logoText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600'
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
  checkbox: {
    marginTop: 12,
    borderRadius: 5,
    borderWidth: 1,
    width: 24,
    height: 24,
    borderColor: '#076E5B',
    backgroundColor: '#D9D9D9'
  },
  buttonRegister: {
    alignSelf: 'center',
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