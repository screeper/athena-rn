import { useMutation } from '@apollo/client';
import { Octicons } from '@expo/vector-icons';
import { RouteProp, useRoute } from '@react-navigation/native';
import i18n from '../helpers/i18n';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import { DO_CONSUME } from '../apollo/mutations';
import {
  DoConsumeMutation,
  DoConsumeMutationVariables,
  StockEntryStatus,
} from '../apollo/schema';
import { useAllStockQuery } from '../apolloActions/useQueries';
import NativeNumberConsumptionInput from '../components/native/NativeNumberConsumptionInput';
import NativeScreen from '../components/native/NativeScreen';
import NativeText from '../components/native/NativeText';
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import { RootState } from '../store';
import { RootParamsList } from '../components/Navigation';

const StockItemDetails = () => {
  const route = useRoute<RouteProp<RootParamsList, 'Stock Item Details'>>();
  const item = route.params?.stockItem;
  if (!item) {
    return null;
  }

  const getStatusIcon = (): { iconColor: string } => {
    switch (item.status as StockEntryStatus) {
      case StockEntryStatus.Normal:
        return { iconColor: colors.green };
      case StockEntryStatus.Important:
        return { iconColor: colors.red };
      case StockEntryStatus.Warning:
      default:
        return { iconColor: colors.orange };
    }
  };

  const eventIdFromParams: string | undefined = route.params?.eventId;
  let eventId: string;
  if (eventIdFromParams) {
    eventId = eventIdFromParams;
  } else {
    eventId = useSelector((state: RootState) => state.global.eventId);
  }

  const { iconColor } = getStatusIcon();
  const [fetchStock, { loading: loadingStock }] = useAllStockQuery(eventId);

  const [createConsumeMutation] = useMutation<
    DoConsumeMutation,
    DoConsumeMutationVariables
  >(DO_CONSUME, {
    onError: (error) => {
      console.log('error', error);
    },
    onCompleted: (data) => {
      if (
        data.consume &&
        data.consume.messages &&
        data.consume.messages.length > 0
      ) {
        data.consume.messages.forEach((message) => {
          if (!message) return;
          if (message.__typename === 'ValidationMessage') {
            console.log('error', message.field + ' ' + message.message);
            Toast.show({
              type: 'error',
              text1: 'error',
              text2: message.field + ' ' + message.message,
            });
          }
        });
        // refetch after an error
        fetchStock();
      }
    },
  });
  const consume = async (newValue?: string, change?: number) => {
    const amount = change ? -change : Number(item.stock) - Number(newValue);
    const locationId = item.locationId;
    const itemId = item.id;
    if (!Number.isNaN(amount) && locationId && itemId) {
      const variables: DoConsumeMutationVariables = {
        amount,
        locationId,
        itemId,
      };
      await createConsumeMutation({ variables });
    }
  };

  return (
    <NativeScreen style={styles.screen}>
      <View style={styles.item}>
        <View style={styles.title}>
          <View style={styles.status}>
            <Octicons name="dot-fill" size={30} color={iconColor} />
          </View>
          <View>
            <NativeText style={styles.titleText}>
              {item.locationName}
            </NativeText>
            <NativeText>{item.name}</NativeText>
          </View>
        </View>
        <View style={styles.leftContainer}>
          <View style={styles.numberContainer}>
            <NativeText style={styles.number}>{item.itemGroupName}</NativeText>
            <NativeText style={styles.numberText}>
              {i18n.t('itemGroup')}
            </NativeText>
          </View>
          <View style={styles.numberContainer}>
            <NativeText style={styles.number}>{item.unit}</NativeText>
            <NativeText style={styles.numberText}>{i18n.t('unit')}</NativeText>
          </View>
          <View style={styles.numberContainer}>
            <NativeText style={styles.number}>{item.stock}</NativeText>
            <NativeText style={styles.numberText}>
              {i18n.t('inStock')}
            </NativeText>
          </View>
          <View style={styles.numberContainer}>
            <NativeText style={styles.number}>{item.consumption}</NativeText>
            <NativeText style={styles.numberText}>
              {i18n.t('consumption')}
            </NativeText>
          </View>
          <View style={styles.numberContainer}>
            <NativeText style={styles.number}>{item.movementIn}</NativeText>
            <NativeText style={styles.numberText}>
              {i18n.t('movementIn')}
            </NativeText>
          </View>
          <View style={styles.numberContainer}>
            <NativeText style={styles.number}>{item.movementOut}</NativeText>
            <NativeText style={styles.numberText}>
              {i18n.t('movementOut')}
            </NativeText>
          </View>
          <View style={styles.numberContainer}>
            <NativeText style={styles.number}>{item.supply}</NativeText>
            <NativeText style={styles.numberText}>
              {i18n.t('supply')}
            </NativeText>
          </View>
          <View style={styles.numberContainer}>
            <NativeText style={styles.number}>{item.missingCount}</NativeText>
            <NativeText style={styles.numberText}>
              {i18n.t('missing')}
            </NativeText>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <NativeNumberConsumptionInput
            value={item.stock + ''}
            max={item.inverse ? 0 : item.stock + item.missingCount}
            onChangeText={consume}
            loading={loadingStock}
            editable={true}
            style={styles.numberInputStyle}
          />
        </View>
      </View>
    </NativeScreen>
  );
};

const styles = StyleSheet.create({
  screen: { alignItems: 'stretch', justifyContent: 'flex-start' },
  item: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  leftContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: { flexDirection: 'row', marginBottom: 20, alignItems: 'center' },
  status: { marginRight: 10 },
  titleText: {
    fontSize: 20,
    fontFamily: fonts.defaultFontFamilyBold,
  },
  subtitleText: {
    fontSize: 12,
  },
  numberContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 5,
  },
  numberText: {
    fontSize: 12,
    textTransform: 'uppercase',
    paddingLeft: 5,
  },
  number: {
    fontSize: 20,
    fontFamily: fonts.defaultFontFamilyBold,
    flexBasis: '50%',
    textAlign: 'right',
    paddingRight: 5,
  },
  bottomContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  numberInputStyle: {
    fontSize: 36,
    color: colors.primary,
    fontFamily: fonts.defaultFontFamily,
  },
});

export default StockItemDetails;
