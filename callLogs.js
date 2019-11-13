import { NativeModules } from 'react-native';

const {CallLogs: NativeCallLogs} = NativeModules

class CallLogs {
  static async load(limit, filter) {
    if (!filter) return NativeCallLogs.load(limit)
    const {minTimestamp, maxTimestamp, phoneNumbers, rawTypes} = filter
    const phoneNumbersArray = Array.isArray(phoneNumbers) ? phoneNumbers : typeof phoneNumbers === 'string' ? [phoneNumbers] : []
    const rawTypesArray = Array.isArray(rawTypes) ? rawTypes : typeof rawTypes === 'number' ? [rawTypes] : []

    return NativeCallLogs.loadWithFilter(
      limit,
      {
        ...filter,
        minTimestamp: minTimestamp ? minTimestamp.toString() : undefined,
        maxTimestamp: maxTimestamp ? maxTimestamp.toString() : undefined,
        phoneNumbers: JSON.stringify(phoneNumbersArray),
        rawTypes: JSON.stringify(rawTypesArray)
      }
    )
  }

  static async loadAll() {
    return NativeCallLogs.loadAll()
  }
}

module.exports = CallLogs;
