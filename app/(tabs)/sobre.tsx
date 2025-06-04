import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity, Platform, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router'; // Importado useRouter
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAuthStore } from '../../store/authStore'; // Importado o authStore

// Componente para exibir informações de um desenvolvedor (mantido como antes)
const DeveloperInfo = ({
  name,
  matricula,
  linkedinUrl,
  githubUrl,
  internalLink,
}: {
  name: string;
  matricula: string;
  linkedinUrl: string;
  githubUrl: string;
  internalLink: string;
}) => {
  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => {
      console.error("Couldn't load page", err);
      Alert.alert("Erro", "Não foi possível abrir o link.");
    });
  };

  return (
    <View style={styles.developerContainer}>
      <Text style={styles.developerName}>{name}</Text>
      <Text style={styles.developerMatricula}>Matrícula: {matricula}</Text>

      <View style={styles.socialLinksContainer}>
        <TouchableOpacity style={styles.socialButton} onPress={() => openLink(linkedinUrl)}>
          <FontAwesome name="linkedin-square" size={22} color="#fff" />
          <Text style={styles.socialButtonText}>LinkedIn</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={() => openLink(githubUrl)}>
          <FontAwesome name="github-square" size={22} color="#fff" />
          <Text style={styles.socialButtonText}>GitHub</Text>
        </TouchableOpacity>
      </View>

      <Link href={internalLink as any} asChild>
        <TouchableOpacity style={styles.profileButton}>
          <Text style={styles.profileButtonText}>Ver Perfil no App</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default function SobreScreen() {
  // Hooks para o logout
  const logout = useAuthStore((state) => state.logout);
  const isLoadingAuth = useAuthStore((state) => state.isLoading); // Para desabilitar o botão durante o logout
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    // O useEffect no app/_layout.tsx deve cuidar do redirecionamento para /login
    // Mas podemos forçar se necessário, embora geralmente não seja preciso:
    // router.replace('/(auth)/login');
    console.log("Usuário deslogado, _layout.tsx deve redirecionar.");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <FontAwesome name="info-circle" size={30} color="#007bff" style={styles.headerIcon} />
        <Text style={styles.title}>Sobre o Meu To-Do App</Text>
      </View>
      <Text style={styles.descriptionText}>
        Este é um aplicativo de lista de tarefas desenvolvido como projeto para a
        disciplina de Programação Web e Mobile.
      </Text>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Tecnologias Utilizadas</Text>
        <View style={styles.listItemContainer}>
          <Text style={styles.listItem}><FontAwesome name="check-circle" size={16} color="#28a745" /> React Native</Text>
          <Text style={styles.listItem}><FontAwesome name="check-circle" size={16} color="#28a745" /> Expo & Expo Router</Text>
          <Text style={styles.listItem}><FontAwesome name="check-circle" size={16} color="#28a745" /> Zustand (Gerenciamento de Estado)</Text>
          <Text style={styles.listItem}><FontAwesome name="check-circle" size={16} color="#28a745" /> TypeScript</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Desenvolvedores</Text>
        <DeveloperInfo
          name="Lucas Dias"
          matricula="845330"
          linkedinUrl="https://www.linkedin.com/in/lucas-dias-23b75a232/"
          githubUrl="https://github.com/chamanodias"
          internalLink="/equipe/lucasdias" // Esta rota pode não existir mais se a seção equipe foi removida pelo seu parceiro
        />
        <DeveloperInfo
          name="Lucas Vinícius"
          matricula="850855"
          linkedinUrl="https://www.linkedin.com/in/lucasvinini/"
          githubUrl="https://github.com/Lucavinini"
          internalLink="/equipe/lucasvinicius" // Esta rota pode não existir mais
        />
      </View>

      {/* Botão de Logout */}
      <View style={[styles.section, styles.logoutSection]}>
        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={handleLogout}
          disabled={isLoadingAuth} // Desabilita enquanto o logout está em progresso
        >
          {isLoadingAuth ? (
            <Text style={styles.buttonText}>Saindo...</Text>
          ) : (
            <Text style={styles.buttonText}>Sair (Logout)</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: Platform.OS === 'ios' ? 20 : 30,
    paddingHorizontal: 15,
    backgroundColor: '#f0f2f5',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  headerIcon: {
    marginRight: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  descriptionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 24,
    color: '#555',
    paddingHorizontal: 10,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 18,
    textAlign: 'center',
    color: '#007bff',
  },
  listItemContainer: {
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 10,
    color: '#444',
    flexDirection: 'row',
    alignItems: 'center',
  },
  developerContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e7e7e7',
  },
  developerName: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  developerMatricula: {
    fontSize: 15,
    color: '#666',
    marginBottom: 12,
    textAlign: 'center',
  },
  socialLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    minWidth: 110,
    justifyContent: 'center',
  },
  socialButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  profileButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  profileButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  // Estilos para o botão de logout
  logoutSection: { // Para dar um espaçamento e fundo consistentes
    paddingBottom: Platform.OS === 'ios' ? 30 : 20, // Espaço extra no final
  },
  button: { // Estilo base para botões (reutilizado do DeveloperInfo, mas pode ser mais genérico)
    backgroundColor: '#007bff',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  logoutButton: {
    backgroundColor: '#dc3545', // Vermelho para logout/destrutivo
    marginTop: 10, // Espaçamento se houver conteúdo acima na mesma seção
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
});