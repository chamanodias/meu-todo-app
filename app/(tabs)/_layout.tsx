import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { Image } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="tarefas"
        options={{
          title: "Tarefas", // Nome que aparece na aba
          tabBarIcon: ({ color }) => (
            <FontAwesome name="list-alt" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="sobre"
        options={{
          title: "Sobre", // Nome que aparece na aba
          tabBarIcon: ({ color }) => (
            <FontAwesome name="info-circle" size={24} color={color} />
          ), // Ícone para Sobre
        }}
      />

      <Tabs.Screen
        name="desenvolvedores"
        options={{
          title: "Devs",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="laptop" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
