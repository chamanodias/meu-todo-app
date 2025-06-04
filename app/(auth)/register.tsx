import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useAuthStore } from '../../store/authStore'; // Ajuste o caminho
import { useRouter, Link } from 'expo-router';

  export default function RegisterScreen() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const register = useAuthStore((state) => state.register);
const isLoading = useAuthStore((state) => state.isLoading);
const error = useAuthStore((state) => state.error);
const router = useRouter();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }
    const success = await register(email, password);
    if (success) {
      Alert.alert('Sucesso!', 'Cadastro realizado. Faça o login para continuar.');
      router.replace('/(auth)/login'); // Redireciona para o login após registro
    } else {
      // Alert.alert('Erro no Cadastro', error || 'Não foi possível fazer o cadastro.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none"/>
      <TextInput style={styles.input} placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirmar Senha" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
      {isLoading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <Button title="Cadastrar" onPress={handleRegister} />
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Link href="/(auth)/login" style={styles.link}>
        Já tem uma conta? Faça Login
      </Link>
    </View>
  );
}
// Use os mesmos estilos do LoginScreen ou crie novos
const styles = StyleSheet.create({ /* ... mesmos estilos do LoginScreen ... */
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f0f2f5' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 30, color: '#333' },
  input: { backgroundColor: 'white', paddingHorizontal: 15, paddingVertical: 12, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#ddd' },
  errorText: { color: 'red', textAlign: 'center', marginTop: 10 },
  link: { marginTop: 20, color: '#007bff', textAlign: 'center', fontSize: 16 },
});