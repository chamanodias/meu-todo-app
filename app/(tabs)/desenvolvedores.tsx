import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function DesenvolvedoresScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FontAwesome name="laptop" size={54} color="#007bff" style={styles.topIcon} />
      <Text style={styles.title}>Desenvolvedores</Text>
      <View style={styles.profile}>
        <Image
          source={{ uri: 'https://github.com/chamanodias.png' }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>Lucas Dias</Text>
          <Text style={styles.role}>Desenvolvedor Full Stack</Text>
        </View>
      </View>
      <View style={styles.profile}>
        <Image
          source={{ uri: 'https://github.com/Lucavinini.png' }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>Lucas Vinícius</Text>
          <Text style={styles.role}>Desenvolvedor Full Stack</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', padding: 24, backgroundColor: '#fff' },
  topIcon: { marginBottom: 8 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  profile: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  avatar: { width: 80, height: 80, borderRadius: 40, marginRight: 16, borderWidth: 2, borderColor: '#007bff', backgroundColor: '#eee' },
  name: { fontSize: 18, fontWeight: 'bold' },
  role: { fontSize: 16, color: '#666' },
}); 