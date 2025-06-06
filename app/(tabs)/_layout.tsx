import { Tabs } from 'expo-router';
import {Ionicons} from "@expo/vector-icons";

export default function TabLayout() {
    return (
        <Tabs initialRouteName="firstDiary"
              screenOptions={{
                  headerShown: false,
              }}
        >
            <Tabs.Screen
                name="firstDiary"
                options={{
                    title: "יומן 1",
                    headerStyle: {
                        backgroundColor: 'rgba(255,0,0,0.74)',
                    },
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <Ionicons
                                name={focused ? 'journal' : 'journal-outline'}
                                size={size}
                                color={color}
                            />
                        );
                    },
                }}
            />
            <Tabs.Screen
                name="secondDiary"
                options={{
                    title: "יומן 2",
                    headerStyle: {
                        backgroundColor: 'rgba(239,244,4,0.76)',
                    },
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <Ionicons
                                name={focused ? 'journal' :  'journal-sharp'}
                                size={size}
                                color={color}
                            />
                        );
                    },
                }}
            />
            <Tabs.Screen
                name="thirdDiary"
                options={{
                    title: "יומן 3",
                    headerStyle: {
                        backgroundColor: 'rgba(88,247,2,0.99)',
                    },
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <Ionicons
                                name={focused ? 'journal' : 'journal-outline'}
                                size={size}
                                color={color}
                            />
                        );
                    },
                }}
            />
            <Tabs.Screen
                name="about"
                options={{
                    title: "אודות",
                    headerStyle: {
                        backgroundColor: 'rgba(54,43,242,0.16)',
                    },
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <Ionicons
                                name={focused ? 'information' : 'information-outline'}
                                size={size}
                                color={color}
                            />
                        );
                    },
                }}
            />
        </Tabs>
    );
}
