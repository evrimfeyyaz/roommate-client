import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30
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
    marginLeft: 5
  },
  wakeUpAlarmButton: {
    marginRight: 20
  },
  weatherIcon: {
    marginRight: 5
  }
})

export default styles