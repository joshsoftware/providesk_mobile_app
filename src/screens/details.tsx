import {
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Colors from '@res/colors';
import {getDisplayDateTime, scaleFonts} from '@utils/helper';
import ChipCard from '@components/ChipCard';

const Details: (props: any) => void = props => {
  const ticketId = props.route?.params?.ticket_id ?? '';

  console.log('Ticket Id:' + ticketId);

  const response = {
    data: {
      ticket: {
        status: 'open',
        title: 'Complaint',
        description:
          'Aliquid omnis optio est quasi asperiores aspernatur corporis.',
        ticket_number: 1001,
        ticket_type: 'Complaint',
        priority: 'High',
        category_name: 'Thalia Botsford19',
        department_name: 'HR',
        activities: [
          {
            created_at: '2022-06-24T19:09:52.782+05:30',
            asset_url: '',
            description: 'Complaint created successfully.',
            id: '1',
          },
          {
            created_at: '2022-06-24T19:09:52.782+05:30',
            asset_url:
              'https://www.amazon.in/Aceearth-Water-Sticker-Poster-Environment/dp/B07YKX4VZB',
            description: 'Complaint created successfully.',
            id: '2',
          },
        ],
        resolver: {
          id: '1',
          name: 'Thala',
        },
        created_at: '24-Jun-2022 19:09 PM',
        resolved_at: null,
        id: '1',
      },
    },
  };

  const data = response.data;

  const resolveTicket = () => {};

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.BG_LIGHT} />
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={() => <DetailsHeader {...data.ticket} />}
          data={data.ticket?.activities}
          renderItem={({item}) => <TimelineItem {...item} />}
        />
      </View>
      {data.ticket?.status !== 'resolved' ? (
        <View style={styles.bottomNavigation}>
          <TouchableOpacity
            onPress={resolveTicket}
            style={[styles.bottomTabButton, styles.bottomTabSelectedButton]}>
            <Image
              source={require('src/assets/images/checked.png')}
              style={styles.fabIconSmall}
              resizeMode="contain"
            />
            <Text style={styles.bottomNavigationText}>Resolve</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

const TimelineItem = props => {
  return (
    <View style={styles.timelineRootLeft}>
      <View style={styles.timelineLeft}>
        <Text style={[styles.timeText]}>
          {getDisplayDateTime(props.created_at)}
        </Text>
        <Text style={[styles.margin_top_8, styles.description]}>
          {props.description ?? ''}
        </Text>
      </View>
    </View>
  );
};

const DetailsHeader = props => {
  console.log(props.created_at);
  return (
    <View>
      <View style={styles.headerRoot}>
        <Text style={styles.description}>#{props.ticket_number}</Text>
        <Text style={styles.title}>{props.title ?? ''}</Text>
        <Text style={styles.description}>{props.description ?? ''}</Text>
        <View style={styles.extraDetailsParent}>
          <ChipCard
            item={props.department_name}
            isSelected={true}
            hideImage={true}
          />
          <ChipCard
            item={props.category_name}
            isSelected={true}
            hideImage={true}
          />
        </View>
        <Text style={styles.description}>{props.created_at}</Text>
      </View>
      <Text style={styles.h1Primary}>Timeline:</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  h1Primary: {
    fontSize: scaleFonts(18),
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    color: Colors.PRIMARY,
  },
  headerRoot: {
    width: '100%',
    padding: 16,
    backgroundColor: Colors.WHITE,
  },
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    backgroundColor: Colors.PRIMARY_LIGHT,
  },
  fabParent: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: Colors.WHITE,
    borderRadius: 16,
  },
  floatingActionButton: {
    width: 56,
    height: 56,
    padding: 16,
    alignItems: 'center',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    zIndex: 100,
    backgroundColor: Colors.BG_DARK,
  },
  bottomNavigation: {
    minHeight: 56,
    width: '100%',
    backgroundColor: Colors.BG_DARK,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  fabIcon: {
    tintColor: Colors.PRIMARY,
    height: 24,
    width: 24,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  fabIconSmall: {
    tintColor: Colors.PRIMARY,
    height: 16,
    width: 16,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottomTabButton: {
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 24,
    marginVertical: 10,
    marginHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 40,
    alignSelf: 'flex-end',
    marginEnd: 16,
  },
  bottomTabSelectedButton: {
    backgroundColor: Colors.BG_DARK,
  },
  bottomNavigationText: {
    fontFamily: 'Montserrat',
    color: Colors.PRIMARY,
    fontSize: scaleFonts(16),
    fontWeight: 'bold',
    marginStart: 8,
  },
  title: {
    fontSize: scaleFonts(26),
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    marginBottom: 16,
  },
  description: {
    fontSize: scaleFonts(16),
    textAlignVertical: 'top',
    fontWeight: '400',
    fontFamily: 'Montserrat-SemiBold',
  },
  timeText: {
    fontSize: scaleFonts(12),
    textAlignVertical: 'top',
    fontWeight: '400',
    fontFamily: 'Montserrat-SemiBold',
  },
  extraDetailsParent: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 16,
  },
  timelineRootLeft: {
    marginVertical: 4,
    marginStart: 8,
    marginEnd: 24,
  },
  timelineLeft: {
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.PRIMARY_LIGHT_LINE,
    padding: 16,
  },
  margin_top_8: {
    marginTop: 8,
  },
  assetImage: {
    height: scaleFonts(100),
    width: scaleFonts(100),
    marginTop: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.PRIMARY_LIGHT_LINE,
  },
});

export default Details;
