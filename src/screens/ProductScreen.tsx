/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  ActivityIndicator,
  Image,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';

import { ProductsStackParams } from '../navigators/ProductsNavigator';
import { useCategories } from '../hooks/useCategories';
import { useForm } from '../hooks/useForm';
import { ProductsContext } from '../context/ProductsContext';

interface Props
  extends StackScreenProps<ProductsStackParams, 'ProductScreen'> {}

export const ProductScreen = ({ route, navigation }: Props) => {
  const { id = '', name = '' } = route.params;

  const { loadProductById, updateProduct, addProduct } =
    useContext(ProductsContext);

  const { isLoading, categories } = useCategories();
  const { _id, categoriaId, nombre, img, onChange, setFormValue } = useForm({
    _id: id,
    categoriaId: '',
    nombre: name,
    img: '',
  });

  useEffect(() => {
    navigation.setOptions({ title: nombre ? nombre : 'Without product name' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nombre]);

  useEffect(() => {
    loadProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadProduct = async () => {
    if (!id.length) return;
    const product = await loadProductById(id);
    setFormValue({
      _id: id,
      categoriaId: product.categoria._id,
      img: product.img || '',
      nombre,
    });
  };

  const saveOrUpdate = async () => {
    if (id.length) {
      updateProduct(categoriaId, nombre, id);
    } else {
      const tempCategoryId = categoriaId || categories[0]._id;
      const newProduct = await addProduct(tempCategoryId, nombre);
      onChange(newProduct._id, '_id');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Product name:</Text>
        <TextInput
          placeholder="Enter product name"
          style={styles.textInput}
          value={nombre}
          onChangeText={value => onChange(value, 'nombre')}
        />
        <Text style={styles.label}>Select category:</Text>
        {isLoading ? (
          <ActivityIndicator size={20} color="black" />
        ) : (
          <Picker
            selectedValue={categoriaId}
            onValueChange={value => onChange(value, 'categoriaId')}>
            {categories.map(c => (
              <Picker.Item label={c.nombre} value={c._id} key={c._id} />
            ))}
          </Picker>
        )}
        <Button title="Save" onPress={saveOrUpdate} color="#5856d6" />
        {_id.length > 0 && (
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
        )}
        {img.length > 0 && (
          <Image
            source={{ uri: img }}
            style={{ width: '100%', height: 300, marginTop: 20 }}
          />
        )}
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
