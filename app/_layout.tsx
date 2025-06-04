import React, { useEffect, useState } from 'react'; // Adicionado useState
import { Slot, useRouter, useSegments } from 'expo-router';
import { useAuthStore } from '../store/authStore'; // Verifique se o caminho está correto
import { ActivityIndicator, View, StyleSheet } from 'react-native'; // Para um indicador de carregamento

export default function RootLayoutNav() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  // O isLoading do authStore é para o processo de login/registro, não para o carregamento inicial do app em si.
  // const isLoadingAuthProcess = useAuthStore((state) => state.isLoading);

  const router = useRouter();
  const segments = useSegments();

  // Novo estado para controlar se o roteador processou os segmentos iniciais
  const [isRouterInitialized, setIsRouterInitialized] = useState(false);

  useEffect(() => {
    // Apenas definimos isRouterInitialized como true quando temos certeza
    // que 'segments' é um array (o que useSegments deve retornar).
    // Isso indica que o hook useSegments resolveu seu valor inicial.
    if (Array.isArray(segments)) { // <--- MUDANÇA AQUI
      setIsRouterInitialized(true);
    }
  }, [segments]); // Executa quando 'segments' muda

  useEffect(() => {
    // Só executa a lógica de redirecionamento se o roteador estiver inicializado
    if (!isRouterInitialized) {
      return;
    }

    const inAuthGroup = segments[0] === '(auth)';

    if (isAuthenticated) {
      // Se o usuário está autenticado...
      if (inAuthGroup) {
        // ... e está em uma tela do grupo de autenticação (ex: /login),
        // redireciona para a tela principal do app.
        router.replace('/(tabs)/tarefas');
      }
      // Se já estiver no grupo (tabs) ou outro lugar do app, não faz nada, já está onde deveria.
    } else {
      // Se o usuário NÃO está autenticado...
      if (!inAuthGroup) {
        // ... e NÃO está em uma tela do grupo de autenticação (ex: tentou acessar /tarefas diretamente),
        // redireciona para a tela de login.
        router.replace('/(auth)/login');
      }
      // Se já estiver no grupo (auth) (ex: na tela de login), não faz nada.
    }
  }, [isAuthenticated, isRouterInitialized, segments, router]); // Dependências do efeito

  // Enquanto o roteador não estiver inicializado, mostramos um indicador de carregamento.
  // Isso evita que o <Slot /> tente renderizar algo prematuramente.
  if (!isRouterInitialized) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  // Se o roteador estiver inicializado, renderiza o Slot, que carregará
  // a rota apropriada (seja do grupo (auth) ou (tabs))
  return <Slot />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2f5', // Opcional: mesma cor de fundo das telas de auth
  },
});