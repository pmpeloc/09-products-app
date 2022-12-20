/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';

import { ProductsStackParams } from '../navigators/ProductsNavigator';
import { useCategories } from '../hooks/useCategories';

interface Props
  extends StackScreenProps<ProductsStackParams, 'ProductScreen'> {}

export const ProductScreen = ({ route, navigation }: Props) => {
  const { name = '' } = route.params;

  const { isLoading, categories } = useCategories();

  const [selectedLanguage, setSelectedLanguage] = useState();

  useEffect(() => {
    navigation.setOptions({ title: name ? name : 'New Product' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Product name:</Text>
        <TextInput placeholder="Enter product name" style={styles.textInput} />
        <Text style={styles.label}>Select category:</Text>
        {isLoading ? (
          <ActivityIndicator size={20} color="black" />
        ) : (
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={itemValue => setSelectedLanguage(itemValue)}>
            {categories.map(c => (
              <Picker.Item label={c.nombre} value={c._id} key={c._id} />
            ))}
          </Picker>
        )}
        <Button title="Save" onPress={() => {}} color="#5856d6" />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <Button title="Camera" onPress={() => {}} color="#5856d6" />
          <View style={{ width: 10 }} />
          <Button title="Galery" onPress={() => {}} color="#5856d6" />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,0.2)',
    height: 45,
    marginBottom: 10,
  },
});
