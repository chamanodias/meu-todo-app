import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome'; // Importa o FontAwesome
import { Tabs } from 'expo-router';

// Não precisamos mais da função TabBarIcon separada se usarmos FontAwesome diretamente
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>['name'];
//   color: string;
// }) {
//   return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
// }

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index" // Este é o seu app/(tabs)/index.tsx (Home/Tarefas)
        options={{
          title: 'Tarefas', // Nome que aparece na aba
          tabBarIcon: ({ color }) => <FontAwesome name="list-alt" size={24} color={color} />, // Ícone para Tarefas
        }}
      />
      <Tabs.Screen
        name="sobre" // Este deve ser o nome do seu arquivo app/(tabs)/sobre.tsx
        options={{
          title: 'Sobre', // Nome que aparece na aba
          tabBarIcon: ({ color }) => <FontAwesome name="info-circle" size={24} color={color} />, // Ícone para Sobre
        }}
      />
      {/* Futuramente, a aba da equipe será adicionada aqui
      <Tabs.Screen
        name="equipe" // Nome da futura pasta/arquivo da equipe
        options={{
          title: 'Equipe',
          tabBarIcon: ({ color }) => <FontAwesome name="users" size={24} color={color} />,
        }}
      />
      */}
    </Tabs>
  );
}