import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  TouchableOpacity,
} from 'react-native';
import WebView from 'react-native-webview';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState('Pending');

  const handleResponse = data => {
    if (data.title === 'success') {
      setShowModal(false);
      setStatus('Complete');
    } else if (data.title === 'cancel') {
      setShowModal(false);
      setStatus('Cancelled');
    } else {
      return;
    }
  };

  return (
    <View style={styles.container}>
      <Modal visible={showModal} onRequestClose={() => setShowModal(false)}>
        <WebView
          source={{uri: 'http://1936-49-204-112-89.ngrok.io/'}}
          onNavigationStateChange={data => handleResponse(data)}
          injectedJavaScript={'document.f1.submit()'}
        />
      </Modal>
      <Text>Paypal Payment</Text>
      <Button title="Pay now" onPress={() => setShowModal(true)} />
      <Text>Payment Status: {status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
