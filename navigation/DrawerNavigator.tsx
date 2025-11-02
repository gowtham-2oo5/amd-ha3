import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import EventsStackNavigator from "./EventsStackNavigator";
import HomeTabNavigator from "./HomeTabNavigator";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#6366f1",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        drawerStyle: {
          backgroundColor: "#f8fafc",
        },
        drawerActiveTintColor: "#6366f1",
        drawerInactiveTintColor: "#64748b",
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeTabNavigator}
        options={{
          title: "Campus Companion",
          drawerLabel: "Home",
        }}
      />
      <Drawer.Screen
        name="Events"
        component={EventsStackNavigator}
        options={{
          drawerLabel: "Events",
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerLabel: "Profile",
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerLabel: "Settings",
        }}
      />
    </Drawer.Navigator>
  );
}
