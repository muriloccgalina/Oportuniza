import * as React from 'react';
import {View, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import InputMask from 'react-input-mask'

const CustomRadioButton = (onChange) => {
  const [value, setValue] = React.useState(true);
  return (
    <View style={styles.container}>
        <RadioButton.Group style={styles.input} onValueChange={value => setValue(value)} value={value}>
          <RadioButton.Item style={styles.input} label="CPF" value={true}/>
          <RadioButton.Item style={styles.input} label="CNPJ" value={false}/>
        </RadioButton.Group>

        { value ? (
          <InputMask style={styles.input} placeholder="000.000.000-00" mask="999.999.999-99" onChange={ onChange }/>
        ) : (
          <InputMask style={styles.input} placeholder="00.000.000/0000-00" mask="99.999.999/9999-99" onChange={ onChange }/>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightgray',
        width: '100%',
        marginVertical: 5,
        borderWidth: 1,
        borderColor: 'lightgray',//'#e8e8e8',
        borderRadius: 5,
    },
    input: {
        padding: 15,
        backgroundColor: 'lightgray',
        fontWeight: 'bold',
    }
  })

export default CustomRadioButton;