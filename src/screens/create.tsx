import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {scaleFonts} from '@utils/helper';
import ChipCard from '@components/ChipCard';
import Button from '@components/Button';
import * as Colors from '@res/colors';
// import ChipCardSkeleton from '@components/ChipCardSkeleton';

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
  const [isDepartmentLoading, setIsDepartmentLoading] = useState(true);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
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

  useEffect(() => {
    setTimeout(() => {
      setIsDepartmentLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    setIsCategoriesLoading(true);
    setTimeout(() => {
      setIsCategoriesLoading(false);
    }, 2000);
  }, [createComplaintFormData.department]);

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
              {isDepartmentLoading ? (
                <ActivityIndicator color={Colors.PRIMARY} />
              ) : (
                DEPARTMENTS.map((item, index) => {
                  return (
                    <ChipCard
                      key={index}
                      item={item}
                      isSelected={createComplaintFormData.department === item}
                      onPress={onSelectDepartment}
                    />
                  );
                })
              )}
            </View>
          </View>

          <View>
            <Text style={styles.selectHeading}>Category:</Text>
            {createComplaintFormData.department.length === 0 ? (
              <Text>Please select department first.</Text>
            ) : (
              <View style={styles.chipContainer}>
                {isCategoriesLoading ? (
                  <ActivityIndicator color={Colors.PRIMARY} />
                ) : (
                  CATEGORIES.map((item, index) => {
                    return (
                      <ChipCard
                        key={index}
                        item={item}
                        isSelected={createComplaintFormData.category === item}
                        onPress={onSelectCategory}
                      />
                    );
                  })
                )}
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
