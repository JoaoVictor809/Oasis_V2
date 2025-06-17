import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ActivityCalendar, { ActivityCalendarProps } from './ActivityCalendar'; // Ajuste o caminho se necessário

// Mock para react-native-calendars, já que não queremos testar a biblioteca em si,
// mas sim a integração do nosso componente com ela.
jest.mock('react-native-calendars', () => {
  // Mock do LocaleConfig para evitar erros de inicialização
  const actualNav = jest.requireActual('react-native-calendars');
  actualNav.LocaleConfig.locales['pt-br'] = {
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.'],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'],
    today: "Hoje"
  };
  actualNav.LocaleConfig.defaultLocale = 'pt-br';

  return {
    ...actualNav, // Mantém outras exportações da lib se necessário
    Calendar: jest.fn(({ current, markedDates, onDayPress, onMonthChange, theme, ...rest }) => {
      // Simula a renderização de algo básico ou apenas aceita as props
      // Para testar onDayPress e onMonthChange, podemos chamá-los diretamente em testes específicos
      // ou simular eventos que os disparem se o mock for mais complexo.
      return (
        <div data-testid="mocked-calendar">
          <button data-testid="day" onClick={() => onDayPress({ dateString: '2024-07-15', day: 15, month: 7, year: 2024, timestamp: 0 })} />
          <button data-testid="month-change" onClick={() => onMonthChange({ dateString: '2024-08-01', day: 1, month: 8, year: 2024, timestamp: 0 })} />
          <span data-testid="current-month">{current}</span>
          <span data-testid="marked-dates">{JSON.stringify(markedDates)}</span>
          <span data-testid="theme-month-text-color">{theme.monthTextColor}</span>
        </div>
      );
    }),
  };
});

// Mock para as fontes Poppins, se não estiverem globalmente mockadas/carregadas nos testes
jest.mock('expo-font', () => ({
  useFonts: () => [true], // Simula que as fontes foram carregadas
}));


describe('ActivityCalendar', () => {
  const mockMarkedDates = {
    '2024-07-20': {
      customStyles: {
        container: { backgroundColor: '#1261D7' },
        text: { color: 'white' },
      },
    },
    '2024-07-25': {
      customStyles: {
        container: { backgroundColor: 'lightgreen' },
        text: { color: 'white' },
      },
    },
  };

  const defaultProps: ActivityCalendarProps = {
    markedDates: mockMarkedDates,
    initialMonth: '2024-07',
    onDayPress: jest.fn(),
    onMonthChange: jest.fn(),
  };

  beforeEach(() => {
    // Limpar mocks antes de cada teste
    jest.clearAllMocks();
    // Recarregar o mock do Calendar para resetar o estado interno se necessário
    // (Calendar do react-native-calendars é mockado acima)
    const { Calendar } = require('react-native-calendars');
    (Calendar as jest.Mock).mockClear();

     // Copiar a configuração de locale aqui para garantir que está definida para cada teste
    const { LocaleConfig } = require('react-native-calendars');
    LocaleConfig.locales['pt-br'] = {
        monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.'],
        dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        dayNamesShort: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'],
        today: "Hoje"
    };
    LocaleConfig.defaultLocale = 'pt-br';
  });

  it('renders correctly with initial props', () => {
    const { getByTestId } = render(<ActivityCalendar {...defaultProps} />);
    // Verifica se o mock do calendário foi renderizado
    expect(getByTestId('mocked-calendar')).toBeTruthy();
    // Verifica se o mês inicial foi passado
    expect(getByTestId('current-month').props.children).toBe('2024-07');
    // Verifica se as datas marcadas foram passadas
    expect(getByTestId('marked-dates').props.children).toBe(JSON.stringify(mockMarkedDates));
    // Verifica se uma propriedade do tema foi passada
    expect(getByTestId('theme-month-text-color').props.children).toBe('#1261D7');
  });

  it('calls onDayPress when a day is pressed', () => {
    const { getByTestId } = render(<ActivityCalendar {...defaultProps} />);
    fireEvent.press(getByTestId('day')); // Simula o clique no botão 'day' do nosso mock
    expect(defaultProps.onDayPress).toHaveBeenCalledTimes(1);
    expect(defaultProps.onDayPress).toHaveBeenCalledWith('2024-07-15'); // Conforme definido no mock
  });

  it('calls onMonthChange and updates current month when month changes', () => {
    const { getByTestId, rerender } = render(<ActivityCalendar {...defaultProps} />);
    const { Calendar } = require('react-native-calendars');

    // Simulando a chamada de onMonthChange pelo componente Calendar mockado
    // Este é um pouco mais complexo porque o estado 'currentMonth' está dentro de ActivityCalendar
    // e o onMonthChange da lib é chamado internamente.
    // No nosso mock, o botão 'month-change' chama o onMonthChange passado como prop.
    fireEvent.press(getByTestId('month-change'));

    // Verifica se o onMonthChange do ActivityCalendar (que é o handleMonthChange interno)
    // chamou o onMonthChange passado como prop para o ActivityCalendar
    expect(defaultProps.onMonthChange).toHaveBeenCalledTimes(1);
    expect(defaultProps.onMonthChange).toHaveBeenCalledWith('2024-08'); // Conforme definido no mock

    // Para verificar a atualização do 'current' no ActivityCalendar,
    // precisaríamos que o mock do Calendar refletisse a prop 'current' que lhe é passada.
    // E então, após o onMonthChange ser chamado, o ActivityCalendar atualizaria seu estado interno
    // e passaria o novo 'current' para o Calendar mockado.
    // Re-render com o novo mês para simular a atualização do estado pai que controlaria initialMonth/current
    // Isso testa mais a capacidade do componente de refletir uma mudança de prop 'initialMonth'
    // do que o onMonthChange interno diretamente atualizando o 'current' do Calendar mockado.
    const newProps = { ...defaultProps, initialMonth: '2024-08' };
    rerender(<ActivityCalendar {...newProps} />);
    expect(getByTestId('current-month').props.children).toBe('2024-08');

  });

  it('renders with different marked dates', () => {
    const newMarkedDates = {
      '2024-08-01': { customStyles: { container: { backgroundColor: 'blue' }, text: { color: 'yellow' } } },
    };
    const propsWithNewMarks = { ...defaultProps, markedDates: newMarkedDates, initialMonth: '2024-08' };
    const { getByTestId, rerender } = render(<ActivityCalendar {...propsWithNewMarks} />);
    rerender(<ActivityCalendar {...propsWithNewMarks} />); // Rerender para pegar o estado atualizado
    expect(getByTestId('marked-dates').props.children).toBe(JSON.stringify(newMarkedDates));
  });
});
