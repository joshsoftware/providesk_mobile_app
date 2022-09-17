/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Colors from '@res/colors';
import {getDisplayDate, getDisplayTime, scaleFonts} from '@utils/helper';
import {RefreshControl} from 'react-native-gesture-handler';
import * as Navigator from 'src/routes/root-navigator';

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
      ListHeaderComponent={
        <Text style={styles.listHeader}>
          {props.status === 'resolved' ? 'Resolved' : 'Pending'}
        </Text>
      }
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refreshCall} />
      }
      style={styles.root}
      contentContainerStyle={styles.flatListPadding}
      data={response.error?.message != null ? [] : response.data ?? []}
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

const ListItem: React.FunctionComponent<{
  ticket_id: string;
  title: string;
  department: string;
  category: string;
  updated: string;
  created: string;
}> = props => {
  const onListItemPressed = () => {
    Navigator.navigate('details', {ticket_id: props.ticket_id});
  };

  return (
    <View style={styles.itemRoot}>
      <Pressable
        onPress={onListItemPressed}
        android_ripple={{
          color: Colors.BG_EXTRA_LIGHT,
          borderless: false,
        }}
        style={({pressed}) => [
          styles.itemPressableRoot,
          pressed ? styles.itemPressedRoot : {},
        ]}>
        <View>
          <Text
            style={styles.itemHeader}
            ellipsizeMode="tail"
            numberOfLines={1}>
            {props.department ?? ''}
          </Text>
          <Text style={styles.dateText}>
            {getDisplayDate(props.updated ?? props.created ?? '') +
              '\n' +
              getDisplayTime(props.updated ?? props.created ?? '')}
          </Text>
          <Text
            style={styles.itemCategory}
            ellipsizeMode="tail"
            numberOfLines={2}>
            {props.category}
          </Text>
          <Text
            style={styles.itemSubHeader}
            ellipsizeMode="tail"
            numberOfLines={1}>
            {props.title}
          </Text>
        </View>
      </Pressable>
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
  itemRoot: {
    width: '100%',
    borderRadius: 16,
    marginStart: 8,
  },
  itemPressableRoot: {
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: Colors.BG_EXTRA_LIGHT,
  },
  itemPressedRoot: {
    backgroundColor: Colors.BG_EXTRA_LIGHT,
  },
  itemHeader: {
    fontFamily: 'Montserrat',
    fontSize: scaleFonts(14),
    fontWeight: 'bold',
    color: Colors.BLACK,
    flex: 1,
  },
  itemSubHeader: {
    fontFamily: 'MontSerrat',
    fontSize: scaleFonts(18),
    fontWeight: 'bold',
    color: Colors.BLACK,
    flex: 1,
  },
  dateText: {
    position: 'absolute',
    top: -5,
    right: 8,
    alignItems: 'flex-end',
    textAlign: 'right',
    fontFamily: 'Montserrat',
    fontSize: scaleFonts(12),
  },
  itemCategory: {
    fontFamily: 'MontSerrat-SemiBold',
    fontSize: scaleFonts(12),
    color: Colors.BLACK,
    paddingBottom: 3,
  },
  flatListPadding: {paddingBottom: 96},
  listHeader: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    marginStart: 8,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    fontSize: scaleFonts(16),
    color: Colors.PRIMARY,
  },
});

export default IndexList;
