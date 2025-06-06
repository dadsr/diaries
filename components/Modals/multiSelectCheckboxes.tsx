import React, {JSX, useState} from 'react';
import {SectionList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Checkbox from 'expo-checkbox';
import {ThoughtItem} from "@/models/Types";
import SaveButton from "@/components/Modals/components/saveButton";

interface CheckboxesProps {
    diary: number;
    options: ThoughtItem[];
    headerText: string;
    onClose: () => void;
    onSave: (selected: string[]) => void;
    selectedIds: string[];
}

export default function MultiSelectCheckboxes(props: CheckboxesProps): JSX.Element {
    const { diary, options,  onSave, headerText } = props
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(props.selectedIds));

    console.log("MultiSelectCheckboxes() diary ",diary);


    const toggleSelect = (id: string) => {
        setSelectedIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const handleSave = () => {
        onSave(Array.from(selectedIds));
    };

    const renderItem = ({ item }: { item: ThoughtItem }) => (
        <TouchableOpacity onPress={() => toggleSelect(item.id)} style={styles.row}>
            <Checkbox
                value={selectedIds.has(item.id)}
                onValueChange={() => toggleSelect(item.id)}
                style={styles.checkbox}
            />
            <View style={styles.cell}>
                <Text style={styles.displayName}>{item.displayName}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SectionList
            sections={[
                {
                    title: headerText,
                    data: options,
                }
            ]}
            renderSectionHeader={({ section }) => (
                <View style={[styles.row, styles.header]}>
                    <Text style={styles.headerText}>בחר</Text>
                    <Text style={[styles.headerText, { flex: 1 }]}>{section.title}</Text>
                    <SaveButton onPress={handleSave} />
                </View>
            )}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={selectedIds}
        />
    );
}

const styles = StyleSheet.create({
    container: { padding: 16, backgroundColor: '#fff', flex: 1 },
    row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderColor: '#eee' },
    header: { backgroundColor: '#f0f0f0', borderBottomWidth: 2 },
    headerText: { fontWeight: 'bold', width: 80 },
    checkbox: { marginRight: 16 },
    cell: { flex: 1 },
    displayName: { fontWeight: 'bold', fontSize: 16 },
    description: { color: '#666', fontSize: 14 },
});
