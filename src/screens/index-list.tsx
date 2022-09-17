/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Colors from '@res/colors';
import {scaleFonts} from '@utils/helper';
import {RefreshControl} from 'react-native-gesture-handler';

const IndexList: React.FunctionComponent<{
  status: 'pending' | 'resolved';
}> = props => {
  const [response, setResponse] = useState({
    data: [
      {
        ticket_id: '  23ajdfajhdfa1123adsfv',
        title: 'PAY SLIP Correction',
        department: 'Finance',
        category: 'salary',
        created: 'Apr-13 2022 10:22 pm',
        updated: 'Jun-06 2022 12:00 pm',
      },
      {
        ticket_id: '  23ajdfadfafajhdfa1123adsfv',
        title: 'PAY SLIP Correction',
        department: 'Finance',
        category: 'salary',
        created: 'Apr-13 2022 10:22 pm',
        updated: 'Jun-06 2022 12:00 pm',
      },
      {
        ticket_id: '  23ajdfaadfajhdfa1123adsfv',
        title: 'PAY SLIP Correction',
        department: 'Finance',
        category: 'salary',
        created: 'Apr-13 2022 10:22 pm',
        updated: 'Jun-06 2022 12:00 pm',
      },
      {
        ticket_id: '  23ajdfaadfafjhdfa1123adsfv',
        title: 'PAY SLIP Correction',
        department: 'Finance',
        category: 'salary',
        created: 'Apr-13 2022 10:22 pm',
        updated: 'Jun-06 2022 12:00 pm',
      },
      {
        ticket_id: '  23ajdfaadfadsfjhdfa1123adsfv',
        title: 'PAY SLIP Correction',
        department: 'Finance',
        category: 'salary',
        created: 'Apr-13 2022 10:22 pm',
        updated: 'Jun-06 2022 12:00 pm',
      },
      {
        ticket_id: '  23ajdfajhadfasdfdfa1123adsfv',
        title: 'PAY SLIP Correction',
        department: 'Finance',
        category: 'salary',
        created: 'Apr-13 2022 10:22 pm',
        updated: 'Jun-06 2022 12:00 pm',
      },
      {
        ticket_id: '  23ajdfajhdfa1adfasdf123adsfv',
        title: 'PAY SLIP Correction',
        department: 'Finance',
        category: 'salary',
        created: 'Apr-13 2022 10:22 pm',
        updated: 'Jun-06 2022 12:00 pm',
      },
      {
        ticket_id: '  23ajdfajhdasdasadfdfa1123adsfv',
        title: 'PAY SLIP Correction',
        department: 'Finance',
        category: 'salary',
        created: 'Apr-13 2022 10:22 pm',
        updated: 'Jun-06 2022 12:00 pm',
      },
      {
        ticket_id: '  23ajdfajhaasasasadfa1123adsfv',
        title: 'PAY SLIP Correction',
        department: 'Finance',
        category: 'salary',
        created: 'Apr-13 2022 10:22 pm',
        updated: 'Jun-06 2022 12:00 pm',
      },
      {
        ticket_id: '  23ajdfajasdfqweq123hdfa1123adsfv',
        title: 'PAY SLIP Correction',
        department: 'Finance',
        category: 'salary',
        created: 'Apr-13 2022 10:22 pm',
        updated: 'Jun-06 2022 12:00 pm',
      },
      {
        ticket_id: '  23ajdfaj09jiadfadsfhdfa1123adsfv',
        title: 'PAY SLIP Correction',
        department: 'Finance',
        category: 'salary',
        created: 'Apr-13 2022 10:22 pm',
        updated: 'Jun-06 2022 12:00 pm',
      },
      {
        ticket_id: '  23ajdfajasdfajakfhdfa1123adsfv',
        title: 'PAY SLIP Correction',
        department: 'Finance',
        category: 'salary',
        created: 'Apr-13 2022 10:22 pm',
        updated: 'Jun-06 2022 12:00 pm',
      },
    ],
    loading: false,
    error:
      props.status === 'resolved'
        ? {
            message: 'Oops!! no data found, please try again after some time',
          }
        : null,
  });

  const refreshCall = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const [refreshing, setRefreshing] = useState(false);

  return response.error?.message == null || refreshing ? (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refreshCall} />
      }
      style={styles.root}
      data={response?.data ?? []}
      renderItem={renderProps => <ListItem {...renderProps.item} />}
      keyExtractor={item => item.ticket_id}
    />
  ) : (
    <ErrorLayout
      message={response.error?.message ?? ''}
      onRefresh={refreshCall}
    />
  );
};

const ListItem: React.FunctionComponent<{
  ticket_id: string;
  title: string;
  department: string;
  category: string;
  updated: string;
  created: string;
}> = props => {
  return <View />;
};

const ErrorLayout: React.FunctionComponent<{
  message: string;
  onRefresh: () => void;
}> = props => {
  return (
    <View style={[styles.root, styles.flexCenter]}>
      <Image
        source={require('src/assets/images/broken_robot.png')}
        style={styles.errorImage}
        resizeMode="cover"
      />
      <Text style={styles.errorTextStyle}>{props.message}</Text>
      <TouchableOpacity style={styles.refreshButton} onPress={props.onRefresh}>
        <Text style={styles.refreshText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  errorImage: {
    width: 96,
    height: 96,
  },
  errorTextStyle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: scaleFonts(16),
    padding: 16,
    width: '62%',
    alignItems: 'center',
    textAlign: 'center',
  },
  refreshButton: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 8,
    justifyContent: 'center',
    minHeight: 40,
  },
  refreshText: {
    color: Colors.WHITE,
    fontFamily: 'Montserrat',
    fontSize: scaleFonts(16),
    fontWeight: 'bold',
  },
});

export default IndexList;
