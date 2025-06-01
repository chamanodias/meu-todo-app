import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index" // app/(tabs)/index.tsx (Home/Tarefas)
        options={{
          title: 'Tarefas',
          tabBarIcon: ({ color }) => <FontAwesome name="list-alt" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="sobre" // app/(tabs)/sobre.tsx
        options={{
          title: 'Sobre',
          tabBarIcon: ({ color }) => <FontAwesome name="info-circle" size={24} color={color} />,
        }}
      />
      {/* NOVA ABA PARA EQUIPE ABAIXO */}
      <Tabs.Screen
        name="equipe/index" // Aponta para app/(tabs)/equipe/index.tsx
        options={{
          title: 'Equipe', // Nome que aparece na aba
          headerTitle: 'Nossa Equipe', // Título no cabeçalho da tela de equipe
          tabBarIcon: ({ color }) => <FontAwesome name="users" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}