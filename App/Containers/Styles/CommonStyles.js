import {StyleSheet} from 'react-native'
import {Fonts, Metrics, Colors} from '../../Themes/'
export var defaultTxtColor = 'black';
export var plusMinusIconColor = '#2196f3';
export var arrowDropdownIconColor = '#1A237E';
export var customerIconColor = '#FAFAFA';
export var dropdownColor = '#039be5';
export var radioColor = '#9575b2';
export var orderColor  = ['#3949ab', '#f44336', '#00a152', '#ff5722'];
export default StyleSheet.create({
    txtStyle: {
        color: '#42484C',
        fontSize: 25,
        fontWeight: 'normal'
    },
    smTxtStyle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#42484C'
    },
    tableTxtStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#42484C',
        justifyContent: 'flex-start',
    },
    whiteTxtStyle: {
        color: 'white',
        fontSize: 25,
        fontFamily: 'Avenir-Book',
        fontWeight: 'bold'
    },
    smWhiteTxtStyle: {
        color: 'white',
        fontSize: 17,
        fontFamily: 'Avenir-Book',
        fontWeight: 'bold'
    },
    buttonStyle: {
        flex: 1,
        flexDirection: 'row',
        alignContent:'space-around',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#64B5F6',
        borderRadius: 5,
        width: 150,
        height: 50,
        marginHorizontal: 10
    },
    smButtonStyle: {
        height: 50,
        width: 200,
        alignContent:'space-around',
        justifyContent: 'center',
        alignItems: 'center',
    },
    smCustButtonStyle: {
        height: 50,
        width: 200,
        alignContent:'space-around',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50
    },
    xsButtonStyle: {
        height: 30,
        width: 200,
        flexDirection: 'row',
        alignContent:'space-around',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#64B5F6',
        marginHorizontal: 10,
        color: '#000'
    },
    customButtonStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 60,
        borderBottomWidth: 1,
        marginHorizontal: 10
    },
    headerBackgroundStyle: {
        backgroundColor: '#039be5',
        flex:1,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        height:60,
        paddingTop:15,
        elevation:2
    },
    headerWhitetxtStyle:{
        fontSize:30,
        fontWeight: 'bold',
        fontFamily:'Avenir-Black',
        color:'white'
    },
    localDiningIconStyle: {
        color: "#fbc02d"
    },
    localGroceryStoreIconStyle: {
        color: "#ff9800"
    },
    personIconStyle: {
        color: "#039be5"
    },
    settingIconStyle: {
        color: "#039be5"
    },
    subOrderStyle: {
        color: "#1A237E"
    },
    colContainer: {
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    cardStyle: {
        height: 300,
        width: 350,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2
    },
    mdCardStyle:{
        height:300,
        width:250,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2
    },
    smCardStyle: {
        height: 370,
        width: 280,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2
    },
    smCardCustStyle: {
        height: 250,
        width: 280,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2
    },
    xsCardStyle: {
        height: 90,
        width: 260,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        paddingTop: 10
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    horizontal: {
        zIndex: 999,
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10
    },
    flexEnd: {
        flex: 1,
        flexDirection: 'row',
        marginRight: 10,
        alignItems: 'flex-end',
        justifyContent: 'flex-end' 
    },
    circleOccupied:
    {
        width:60,
        height:60,
        borderRadius:250,
        borderColor: '#000',
        borderWidth: 0.5,
        opacity: 0.7,
        alignItems:'center',
        fontSize:30,
        color:'#fff',
        lineHeight:50,
        textAlign:'center',
        backgroundColor:'#CC3232'
    },
  circleFree:
    {
        width:60,
        height:60,
        borderRadius:250,
        borderColor: '#000',
        borderWidth: 0.5,
        opacity: 0.5,
        alignItems:'center',
        fontSize:30,
        color:'#fff',
        lineHeight:50,
        textAlign:'center',
        backgroundColor:'#2dc937' // #16641B
    },
    filled: {
        backgroundColor: '#CC3232',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        height: 50,
        opacity: 0.5,
        marginVertical: 10
    },
    empty: {
        backgroundColor: '#2dc937',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        height: 50,
        opacity: 0.5,
        marginVertical: 10
    },
    catagoryStyle: {
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor:'#EEEEEE',
        marginTop:5,
        height:60,
        borderWidth:1,
        borderColor:'#9E9E9E'
    },
    marginBottom10: {
        marginBottom: 10
    }
})