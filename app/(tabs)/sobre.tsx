import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router'; // Para navegação interna para as telas da equipe

export default function SobreScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sobre o Meu To-Do App 📝</Text>
      <Text style={styles.text}>
        Este é um aplicativo de lista de tarefas desenvolvido como projeto para a
        disciplina de Programação Web e Mobile.
      </Text>

      <Text style={styles.subtitle}>Tecnologias Utilizadas:</Text>
      <View style={styles.listItemContainer}>
        <Text style={styles.listItem}>✓ React Native</Text>
        <Text style={styles.listItem}>✓ Expo & Expo Router</Text>
        <Text style={styles.listItem}>✓ Zustand (Gerenciamento de Estado)</Text>
        <Text style={styles.listItem}>✓ TypeScript</Text>
      </View>

      <Text style={styles.subtitle}>Desenvolvido por:</Text>
      <Text style={styles.textBold}>Lucas Dias e Lucas Vinícius</Text>
      {/*
        Você pode adicionar mais informações aqui, como e-mails ou links para GitHub, se desejar.
        Exemplo de link externo para GitHub (para cada um):
        <TouchableOpacity onPress={() => Linking.openURL('https://github.com/lucasdias')}>
          <Text style={styles.link}>GitHub de Lucas Dias</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://github.com/lucasvinicius')}>
          <Text style={styles.link}>GitHub de Lucas Vinícius</Text>
        </TouchableOpacity>
      */}

      <Text style={styles.subtitle}>Equipe:</Text>
      {/*
        Os Links do Expo Router levarão para as telas dos membros da equipe.
        Ainda vamos criar a rota /equipe/[nomeMembro].tsx.
        Por enquanto, estes links podem não funcionar até criarmos essa estrutura.
      */}
      <Link href="/equipe/lucasdias" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Conheça Lucas Dias</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/equipe/lucasvinicius" asChild>
        <TouchableOpacity style={[styles.button, styles.secondButton]}>
          <Text style={styles.buttonText}>Conheça Lucas Vinícius</Text>
        </TouchableOpacity>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 30, // Mais espaço vertical
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa', // Um cinza bem claro
    alignItems: 'center',
  },
  title: {
    fontSize: 28, // Aumentado
    fontWeight: 'bold',
    marginBottom: 25, // Aumentado
    textAlign: 'center',
    color: '#343a40', // Um cinza escuro
  },
  subtitle: {
    fontSize: 22, // Aumentado
    fontWeight: '600', // semibold
    marginTop: 30, // Aumentado
    marginBottom: 15, // Aumentado
    textAlign: 'center',
    color: '#495057', // Um cinza um pouco mais claro
  },
  text: {
    fontSize: 17, // Aumentado
    textAlign: 'center',
    marginBottom: 15, // Aumentado
    lineHeight: 26, // Aumentado para melhor leitura
    color: '#6c757d', // Cinza para texto normal
    paddingHorizontal: 15, // Pequeno padding lateral para blocos de texto
  },
  textBold: { // Estilo para os nomes dos desenvolvedores
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 26,
    color: '#495057',
    paddingHorizontal: 15,
  },
  listItemContainer: {
    alignItems: 'flex-start',
    marginBottom: 20, // Aumentado
    paddingHorizontal: 10, // Adicionado para centralizar um pouco mais o bloco
    alignSelf: 'stretch', // Para ocupar a largura e respeitar o alignItems do container
    marginHorizontal: 'auto', // Tenta centralizar o bloco de itens
    maxWidth: 300, // Largura máxima para o bloco de itens
  },
  listItem: {
    fontSize: 17, // Aumentado
    marginBottom: 10, // Aumentado
    color: '#28a745', // Verde para itens de lista (tecnologias)
    textAlign: 'left',
  },
  link: {
    fontSize: 16,
    color: '#007bff', // Azul padrão para links
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: 5, // Espaço menor
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 14, // Aumentado
    paddingHorizontal: 30, // Aumentado
    borderRadius: 8,
    marginTop: 15, // Aumentado
    minWidth: 280, // Aumentado
    alignItems: 'center',
    shadowColor: "#000", // Sombra
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  secondButton: { // Estilo para dar um espaço caso tenha mais botões
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 17, // Aumentado
    fontWeight: 'bold',
  },
});