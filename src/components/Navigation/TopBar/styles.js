import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 10
  },
  title: {
    flex: 1
  },
  timeAndDayContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginRight: 20
  },
  dayOfWeek: {
    marginLeft: 5,
    marginBottom: 3
  },
  wakeUpAlarmButton: {
    marginRight: 20
  },
  weatherIcon: {
    marginRight: 5
  }
})