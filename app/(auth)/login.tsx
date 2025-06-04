import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useAuthStore } from '../../store/authStore'; // Ajuste o caminho
import { useRouter, Link } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const login = useAuthStore((state) => state.login);
    const isLoading = useAuthStore((state) => state.isLoading);
    const error = useAuthStore((state) => state.error);
    const router = useRouter();

  const handleLogin = async () => {
    const success = await login(email, password);
    if (success) {
      router.replace('/(tabs)/tarefas'); // Navega para a home do app após login
    } else {
      // O erro já é setado no store, podemos exibir um Alert se quisermos
      // Alert.alert('Erro no Login', error || 'Não foi possível fazer login.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
          autoCapitalize="none"
/>
<TextInput
style={styles.input}
placeholder="Senha"
value={password}
onChangeText={setPassword}
secureTextEntry
/>
{isLoading ? (
<ActivityIndicator size="large" color="#007bff" />
) : (
<Button title="Entrar" onPress={handleLogin} />
)}
{error && <Text style={styles.errorText}>{error}</Text>}
<Link href="/(auth)/register" style={styles.link}>
Não tem uma conta? Cadastre-se
</Link>
</View>
);
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f0f2f5' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 30, color: '#333' },
  input: { backgroundColor: 'white', paddingHorizontal: 15, paddingVertical: 12, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#ddd' },
  errorText: { color: 'red', textAlign: 'center', marginTop: 10 },
  link: { marginTop: 20, color: '#007bff', textAlign: 'center', fontSize: 16 },
});