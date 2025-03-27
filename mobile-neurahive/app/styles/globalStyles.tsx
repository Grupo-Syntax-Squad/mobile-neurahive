import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  userContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  formLabel: {
    color: '#FF9500',
    textAlign: 'left'
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  neuhiveIcon: {
      width: 50,
      height: 50,
      marginBottom: 20,
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orangeText: {
      color: '#FF9500',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  WhiteText: {
      color: 'white',
      textAlign: 'center',
  },
  orangeButton: {
      backgroundColor: '#FC801F',
      padding: 10,
      margin: 10,
      borderRadius: 5,
    },
  textCenter: {
    textAlign: 'center',
  },
  permissionContainer: {
    backgroundColor: 'orange',
    padding: 5,
    borderRadius: 5,
    color: 'white',
  },
  grayContainer: {
    backgroundColor: 'gray',
    padding: 5,
    borderRadius: 5,
    color: 'white',
  },
  spaceAround: {
    display : 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,

    elevation: 10,
  },
  agentBox: {
    width: 150,
    height: 150,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,

    elevation: 10,
  },
  accessBox: {
    width: 180,
    marginBottom: 5,
    height: 150,
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    padding: 10,
  },
  boxContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: 10,
    gap: 10,
  },
  agentContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: 10,
    gap: 10,
  },
  middleButton: {
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  Submitbutton: {
    width: "100%",
    height: 50,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
},
  SubmitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
