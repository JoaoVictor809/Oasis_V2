import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Calendar, LocaleConfig, CalendarProps } from 'react-native-calendars';

// Configure locale for Brazilian Portuguese (optional, but good for UX)
LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ],
  monthNamesShort: ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'],
  today: "Hoje"
};
LocaleConfig.defaultLocale = 'pt-br';

export interface MarkedDateCustomStyles {
  customStyles: {
    container: object;
    text: object;
  };
}

export interface ActivityCalendarProps {
  markedDates: { [date: string]: MarkedDateCustomStyles }; // Dates marked with custom styles
  onDayPress?: (dateString: string) => void; // Callback for when a day is pressed
  initialMonth?: string; // Optional: YYYY-MM format
  onMonthChange?: (month: string) => void; // Alterado para string YYYY-MM
}

const ActivityCalendar: React.FC<ActivityCalendarProps> = ({
  markedDates,
  onDayPress,
  initialMonth,
  onMonthChange, // Added onMonthChange to destructuring
}) => {
  const [currentMonth, setCurrentMonth] = useState(initialMonth || new Date().toISOString().substring(0, 7));

  const handleDayPress = (day: any) => {
    console.log('Selected day', day.dateString);
    if (onDayPress) {
      onDayPress(day.dateString);
    }
  };

  const handleMonthChange = (monthInfo: any) => { // monthInfo é o objeto da lib react-native-calendars
    const newMonthString = monthInfo.dateString.substring(0, 7); // Formato YYYY-MM
    console.log('Month changed to (ActivityCalendar)', newMonthString);
    setCurrentMonth(newMonthString); // Atualiza o estado interno do ActivityCalendar
    if (onMonthChange) {
      onMonthChange(newMonthString); // Propaga para o componente pai
    }
  };

  return (
    <View style={styles.container}>
      <Calendar
        current={currentMonth}
        markedDates={markedDates}
        onDayPress={handleDayPress}
        onMonthChange={handleMonthChange}
        monthFormat={'MMMM yyyy'}
        hideExtraDays={true}
        firstDay={1} // Monday as the first day of the week
        enableSwipeMonths={true}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#1261D7', // Cor dos nomes dos dias da semana (SEG, TER...)
          selectedDayBackgroundColor: '#1261D7',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#1261D7',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#1261D7',
          selectedDotColor: '#ffffff',
          arrowColor: '#1261D7', // Cor das setas de navegação de mês
          disabledArrowColor: '#d9e1e8',
          monthTextColor: '#1261D7', // Cor do nome do mês e ano
          indicatorColor: 'blue',
          textDayFontFamily: 'Poppins_Regular',
          textMonthFontFamily: 'Poppins_Bold',
          textDayHeaderFontFamily: 'Poppins_Bold',
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14,
        }}
        style={styles.calendarStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingBottom: 10,
    elevation: 3, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  calendarStyle: {
    borderRadius: 10,
  },
});

export default ActivityCalendar;
