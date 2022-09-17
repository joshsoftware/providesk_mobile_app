import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import {scaleFonts} from '@utils/helper';
import ChipCard from '@components/ChipCard';
import Button from '@components/Button';
import * as Colors from '@res/colors';

const DEPARTMENTS = [
  'Admin',
  'HR',
  'Management',
  'Finance',
  'Client',
  'Employees',
];

const CATEGORIES = ['Payroll', 'Reimbursement', 'Taxation'];

const create = () => {
  const [createComplaintFormData, setCreateComplaintFormData] = useState({
    title: '',
    description: '',
    department: '',
    category: '',
  });

  const handleInputChange = (name: any, value: any) => {
    setCreateComplaintFormData(p => ({
      ...p,
      [name]: value,
    }));
  };

  const onSelectDepartment = (value: any) => {
    setCreateComplaintFormData(p => ({
      ...p,
      department: value,
    }));
  };

  const onSelectCategory = (value: any) => {
    setCreateComplaintFormData(p => ({
      ...p,
      category: value,
    }));
  };

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView style={styles.root}>
        <View style={styles.container}>
          <TextInput
            placeholder="Title"
            style={styles.title}
            value={createComplaintFormData.title}
            onChangeText={text => handleInputChange('title', text)}
          />
          <TextInput
            placeholder="Describe your issue here..."
            style={styles.description}
            value={createComplaintFormData.description}
            onChangeText={text => handleInputChange('description', text)}
            multiline
            numberOfLines={4}
          />

          <View>
            <Text style={styles.selectHeading}>Department:</Text>
            <View style={styles.chipContainer}>
              {DEPARTMENTS.map((item, index) => {
                return (
                  <ChipCard
                    key={index}
                    item={item}
                    isSelected={createComplaintFormData.department === item}
                    onPress={onSelectDepartment}
                  />
                );
              })}
            </View>
          </View>

          <View>
            <Text style={styles.selectHeading}>Category:</Text>
            {createComplaintFormData.department.length === 0 ? (
              <Text>Please select department first.</Text>
            ) : (
              <View style={styles.chipContainer}>
                {CATEGORIES.map((item, index) => {
                  return (
                    <ChipCard
                      key={index}
                      item={item}
                      isSelected={createComplaintFormData.category === item}
                      onPress={onSelectCategory}
                    />
                  );
                })}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomNavigation}>
        <Button
          label={'Submit'}
          style={styles.button}
          buttonLabelStyle={styles.buttonLabelStyle}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: scaleFonts(26),
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  description: {
    fontSize: scaleFonts(16),
    textAlignVertical: 'top',
    fontWeight: '400',
    fontFamily: 'Montserrat',
    minHeight: scaleFonts(350),
  },
  chipContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selectHeading: {
    fontSize: scaleFonts(16),
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    paddingVertical: 8,
  },
  button: {
    backgroundColor: Colors.BG_DARK,
  },
  buttonLabelStyle: {
    fontSize: scaleFonts(16),
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    color: Colors.PRIMARY,
  },
  bottomNavigation: {
    minHeight: 56,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    padding: 16,
    backgroundColor: Colors.BG_DARK,
    bottom: 0,
  },
});

export default create;
