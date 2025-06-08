import React, {JSX} from "react";
import {CaseFormValues, ThoughtItem} from "@/models/Types";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Control, Controller} from "react-hook-form";
import {Checkbox} from "expo-checkbox";
import {globalStyles} from "@/styles/globalStyles";

interface CheckboxesProps {
    diary:number;
    options: ThoughtItem[];
    control: Control<CaseFormValues>;
    headerText: string;
    name: 'distortionIds' | 'counterThoughtIds';
}


export default function MultiChackBoxes(props: CheckboxesProps): JSX.Element {
    const {diary, options, control, headerText, name } = props;
    console.log("MultiChackBoxes() diary ",diary);


    return (
        <View style={[globalStyles.container]}>
            <Text style={styles.headerText}>{headerText}</Text>
            <Controller
                control={control}
                name={name}
                defaultValue={[]}
                render={({ field: { value, onChange } }) => {
                const selectedIds: string[] = Array.isArray(value) ? value : [];

                    const toggleCheckbox = (id: string) => {
                        if (selectedIds.includes(id)) {
                            onChange(selectedIds.filter(itemId => itemId !== id));
                        } else {
                            onChange([...selectedIds, id]);
                        }
                    };

                    return (
                        <View>
                            {options.map(option => (
                                <TouchableOpacity
                                    key={option.id}
                                    style={styles.row}
                                    onPress={() => toggleCheckbox(option.id)}
                                >
                                    <Checkbox
                                        style={styles.checkbox}
                                        value={selectedIds.includes(option.id)}
                                        onValueChange={() => toggleCheckbox(option.id)}
                                    />
                                    <View style={styles.cell}>
                                        <Text style={styles.displayName}>{option.displayName}</Text>
                                        <Text style={styles.description}>{option.description}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16, backgroundColor: '#fff', flex: 1 },
    row: { flexDirection: 'row-reverse', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderColor: '#eee' },
    headerText: { fontWeight: 'bold', fontSize: 18, marginBottom: 8, textAlign: 'right', writingDirection: 'rtl' },
    checkbox: { marginLeft: 16 },
    cell: { flex: 1 },
    displayName: { fontWeight: 'bold', fontSize: 16, textAlign: 'right', writingDirection: 'rtl'},
    description: { color: '#666', fontSize: 14, textAlign: 'right', writingDirection: 'rtl'},
});
