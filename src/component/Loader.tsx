import { Image, Modal, StyleSheet, View} from 'react-native';
import React from 'react';
import { Images } from '../assets/Index';

type LoaderProps = {
  visible: boolean;
};

export default function Loader({visible}: LoaderProps) {
  return (
    <Modal transparent visible={visible}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgb(255, 255, 255)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View>
          <Image source={Images.LOADER} style={{height: 120,
            width: 120,}}  resizeMode='center' />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
