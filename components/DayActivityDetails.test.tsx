import React from 'react';
import { render } from '@testing-library/react-native';
import DayActivityDetails, { DetailedActivity } from '../DayActivityDetails'; // Ajuste o caminho

// Mock para expo-font se não estiver globalmente mockado
jest.mock('expo-font', () => ({
  useFonts: () => [true], // Simula que as fontes foram carregadas
}));

// Mock para @expo/vector-icons (Ionicons)
jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  return {
    Ionicons: React.forwardRef(({ name, size, color, style }: any, ref: any) => (
      <div ref={ref} data-testid="icon" data-icon-name={name} style={style}>
        Icon({name}, {size}, {color})
      </div>
    )),
  };
});


describe('DayActivityDetails', () => {
  const mockDate = '2024-07-29';
  const mockActivities: DetailedActivity[] = [
    {
      id: '1',
      type: 'lição',
      title: 'Introdução à Programação',
      description: 'Conceitos básicos.',
      status: 'Concluída',
      courseName: 'Ciência da Computação 101',
    },
    {
      id: '2',
      type: 'vídeo',
      title: 'Como usar o Git',
      durationMinutes: 30,
    },
    {
      id: '3',
      type: 'exercício',
      title: 'Problemas de Lógica',
      score: 8,
      totalScore: 10,
    },
    {
      id: '4',
      type: 'customType', // Testar tipo não mapeado
      title: 'Atividade Customizada',
    }
  ];

  it('renders correctly with a list of activities', () => {
    const { getByText, getAllByTestId } = render(
      <DayActivityDetails activities={mockActivities} selectedDate={mockDate} />
    );

    // Verifica o título com a data formatada
    expect(getByText('Atividades de 29/07/2024')).toBeTruthy();

    // Verifica se os itens de atividade são renderizados
    expect(getByText('Introdução à Programação')).toBeTruthy();
    expect(getByText('Conceitos básicos.')).toBeTruthy();
    expect(getByText('Status: Concluída')).toBeTruthy();
    expect(getByText('Curso: Ciência da Computação 101')).toBeTruthy();

    expect(getByText('Como usar o Git')).toBeTruthy();
    expect(getByText('Duração: 30 min')).toBeTruthy();

    expect(getByText('Problemas de Lógica')).toBeTruthy();
    expect(getByText('Pontuação: 8/10')).toBeTruthy();

    expect(getByText('Atividade Customizada')).toBeTruthy();

    // Verifica se os ícones são renderizados (um para cada atividade)
    const icons = getAllByTestId('icon');
    expect(icons.length).toBe(mockActivities.length);
    expect(icons[0].props['data-icon-name']).toBe('book-outline'); // lição
    expect(icons[1].props['data-icon-name']).toBe('videocam-outline'); // vídeo
    expect(icons[2].props['data-icon-name']).toBe('pencil-outline'); // exercício
    expect(icons[3].props['data-icon-name']).toBe('help-circle-outline'); // default
  });

  it('renders "no activity" message when activities array is empty', () => {
    const { getByText } = render(
      <DayActivityDetails activities={[]} selectedDate={mockDate} />
    );
    expect(getByText('Atividades de 29/07/2024')).toBeTruthy();
    expect(getByText('Nenhuma atividade registrada para este dia.')).toBeTruthy();
  });

  it('renders "no activity" message when activities prop is undefined', () => {
    // @ts-ignore para testar o caso de prop indefinida, embora TS previna
    const { getByText } = render(<DayActivityDetails activities={undefined} selectedDate={mockDate} />);
    expect(getByText('Atividades de 29/07/2024')).toBeTruthy();
    expect(getByText('Nenhuma atividade registrada para este dia.')).toBeTruthy();
  });

  it('displays all provided fields for an activity', () => {
    const fullActivity: DetailedActivity[] = [{
      id: 'full1',
      type: 'simulado',
      title: 'Simulado Completo',
      description: 'Todas as matérias.',
      status: 'Em progresso',
      courseName: 'Preparatório ENEM',
      durationMinutes: 180,
      score: 75,
      totalScore: 100,
      timestamp: '14:30' // timestamp não é renderizado atualmente, mas pode ser no futuro
    }];
    const { getByText, getByTestId } = render(
      <DayActivityDetails activities={fullActivity} selectedDate={mockDate} />
    );

    expect(getByText('Simulado Completo')).toBeTruthy();
    expect(getByText('Todas as matérias.')).toBeTruthy();
    expect(getByText('Status: Em progresso')).toBeTruthy();
    expect(getByText('Curso: Preparatório ENEM')).toBeTruthy();
    expect(getByText('Duração: 180 min')).toBeTruthy();
    expect(getByText('Pontuação: 75/100')).toBeTruthy();
    expect(getByTestId('icon').props['data-icon-name']).toBe('document-text-outline');
  });
});
