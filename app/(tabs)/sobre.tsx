import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity, Platform } from 'react-native';
import { Link } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome'; // Para ícones

// Componente para exibir informações de um desenvolvedor
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
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
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

      {/* Link interno para a página de equipe do Expo Router */}
      <Link href={internalLink as any} asChild>
        <TouchableOpacity style={styles.profileButton}>
          <Text style={styles.profileButtonText}>Ver Perfil no App</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default function SobreScreen() {
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
          internalLink="/equipe/lucasdias"
        />
        <DeveloperInfo
          name="Lucas Vinícius"
          matricula="850855"
          linkedinUrl="https://www.linkedin.com/in/lucasvinini/"
          githubUrl="https://github.com/Lucavinini"
          internalLink="/equipe/lucasvinicius"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: Platform.OS === 'ios' ? 20 : 30,
    paddingHorizontal: 15,
    backgroundColor: '#f0f2f5', // Um tom de cinza mais suave
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
    color: '#007bff', // Azul para subtítulos
  },
  listItemContainer: {
    alignItems: 'flex-start', // Mantém à esquerda
    paddingLeft: 10, // Leve recuo para os itens
  },
  listItem: {
    fontSize: 16,
    marginBottom: 10,
    color: '#444',
    flexDirection: 'row',
    alignItems: 'center',
  },
  developerContainer: {
    backgroundColor: '#f9f9f9', // Fundo levemente diferente para cada dev
    borderRadius: 10,
    padding: 18,
    marginBottom: 20, // Espaço entre os cards de desenvolvedor
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
    justifyContent: 'space-around', // Ou 'space-evenly'
    marginBottom: 15,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff', // Azul primário
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20, // Mais arredondado
    minWidth: 110, // Largura mínima
    justifyContent: 'center',
  },
  socialButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  profileButton: {
    backgroundColor: '#6c757d', // Cinza secundário
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
});