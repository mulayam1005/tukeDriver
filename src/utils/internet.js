import NetInfo from '@react-native-community/netinfo'

export const _checkInternet = async () => {
    const netInfo = await NetInfo.fetch();
    if(netInfo.isConnected){
        return true
    }else{
        return false
    }
}