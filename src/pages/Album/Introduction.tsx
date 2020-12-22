import React from 'react';
import { View,Text, StyleSheet } from 'react-native';
import { RootState } from '@/models/index';
import { connect, ConnectedProps } from 'react-redux';

const mapStateToProps = ({album}:RootState) => {
    return {
        introduction:album.introduction,
    }
}

const connector = connect(mapStateToProps);

type MadelState = ConnectedProps<typeof connector>;

// interface

class Introduction extends React.Component<MadelState> {

    render() {
        const {introduction} =this.props;
        return (
            <View style={styls.container}>
                <Text>{introduction}</Text>
            </View>
        )
    }
}
const styls = StyleSheet.create({
    container:{
        padding:10,

    }
})


export default connector(Introduction);