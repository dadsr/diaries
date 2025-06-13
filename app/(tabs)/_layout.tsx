import { Tabs } from 'expo-router';
import {Ionicons} from "@expo/vector-icons";
import TabBarBackground from "@/componants/background/TabBarBackground";

export default function TabLayout() {
    return (

            <Tabs initialRouteName="firstDiary"
                  screenOptions={{
                      tabBarBackground: () => <TabBarBackground />,
                      headerShown: false,
                  }}
            >
                <Tabs.Screen
                    name="firstDiary"
                    options={{
                        title: "יומן 1",

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
