import {ScrollView as DefaultScrollView, Text, View} from "react-native";

import {textStyles, typography, viewStyles} from "@/styles/globalStyles";
import React, { JSX } from "react";
import { bgImg } from "@/assets";
import {distortionsThoughtsArray} from "@/models/consts/DistortionsThoughtsConst";
import {counterConditioningThoughtsArray} from "@/models/consts/CounterConditioningThoughtsConst";
import ThoughtMiniCard from "@/componants/cards/thoughtMiniCard";
import {DistortionThought} from "@/models/DistortionThought";
import {CounterThought} from "@/models/CounterThought";

interface ThoughtsProps {
    diary: number;
    distortions: DistortionThought[];
    counterThoughts: CounterThought[];
}

export default function ThoughtsCard({ diary, distortions, counterThoughts }: ThoughtsProps): JSX.Element {
    const distortionIds = distortions.map(d => d.distortionThoughtId);
    const selectedDistortions = distortionsThoughtsArray.filter(d => distortionIds.includes(d.id));
    const counterThoughtsIds = counterThoughts.map(c => c.distortionThoughtId);
    const selectedCounterThoughts = counterConditioningThoughtsArray.filter(c => counterThoughtsIds.includes(c.id));

    return (
        <DefaultScrollView style = {[viewStyles.scrollView]}>
            <View style={[viewStyles.container]}>
                {selectedDistortions.length === 0 && selectedCounterThoughts.length === 0 ? (
                    <View >
                        <Text style={textStyles.text}>לא נשמרו מחשבות הגדר מחשבות במסך עריכה</Text>
                    </View>
                ) : (
                    <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>

                        {selectedDistortions.length > 0 && (
                            <View style={[{ flex: 1, marginLeft: 5}]}>
                                <Text style={[textStyles.heading,{fontSize: 13}]}>עיוותי חשיבה:</Text>
                                {selectedDistortions.map(d => (
                                    <View key={d.id} style={{ alignSelf: 'flex-end' }}>
                                        <ThoughtMiniCard diary={diary} key={d.id} displayName={d.displayName} description={d.description} />
                                    </View>
                                ))}
                            </View>
                        )}

                        {selectedCounterThoughts.length > 0 && (
                            <View style={[{ flex: 1, marginRight: 5 }]}>
                                <Text style={[textStyles.heading,{fontSize: 13}]}>מחשבות מאזנות:</Text>
                                {selectedCounterThoughts.map(c => (
                                    <View key={c.id} style={{ alignSelf: 'flex-start' }}>
                                        <ThoughtMiniCard diary={diary} key={c.id} displayName={c.displayName} description={c.description} />
                                    </View>
                                ))}
                            </View>
                        )}

                    </View>
                )}
            </View>
        </DefaultScrollView>
    );
}
