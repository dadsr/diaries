import { ImageBackground, Text, View } from "react-native";
import {textStyles, viewStyles} from "@/styles/globalStyles";
import React, { JSX } from "react";
import { bgImg } from "@/assets";
import {distortionsThoughtsArray} from "@/models/consts/DistortionsThoughtsConst";
import {counterConditioningThoughtsArray} from "@/models/consts/CounterConditioningThoughtsConst";

interface ThoughtsProps {
    diary: number;
    distortions: string[]; // array of IDs
    counterThoughts: string[]; // array of IDs
}

export default function ThoughtsCard({ diary, distortions, counterThoughts }: ThoughtsProps): JSX.Element {
    const selectedDistortions = distortionsThoughtsArray.filter(d => distortions.includes(d.id));
    const selectedCounterThoughts = counterConditioningThoughtsArray.filter(c => counterThoughts.includes(c.id));

    return (
            <View style={viewStyles.container}>
                {selectedDistortions.length === 0 && selectedCounterThoughts.length === 0 ? (
                    <View style={viewStyles.card}>
                        <Text style={textStyles.text}>לא נשמרו מחשבות הגדר מחשבות במסך עריכה</Text>
                    </View>
                ) : (
                    <View style={{ marginVertical: 10 }}>
                        {selectedDistortions.length > 0 && (
                            <View style={viewStyles.card}>
                                <Text style={textStyles.text}>עיוותי חשיבה:</Text>
                                {selectedDistortions.map(d => (
                                    <View key={d.id} style={{ marginVertical: 4 }}>
                                        <Text style={textStyles.text}>{d.displayName}</Text>
                                        <Text style={textStyles.text}>{d.description}</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                        {selectedCounterThoughts.length > 0 && (
                            <View style={viewStyles.card}>
                                <Text style={textStyles.text}>מחשבות מאזנות:</Text>
                                {selectedCounterThoughts.map(c => (
                                    <View key={c.id} style={{ marginVertical: 4 }}>
                                        <Text style={textStyles.text}>{c.displayName}</Text>
                                        <Text style={textStyles.text}>{c.description}</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                )}
            </View>
    );
}
