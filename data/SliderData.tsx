import { ImageSourcePropType } from "react-native"

export type ImageSliderType = {
    title: string;
    image: ImageSourcePropType;
    description: string;
};

export const ImageSlider = [
    {
        title: 'AWS',
        image: require('@/assets/images/curso/imgCurso001.jpeg'),
        description: 'Aprenda a dominar os serviços de AWS com este curso prático, ideal para profissionais que desejam se destacar em cloud computing. Descubra como gerenciar e otimizar recursos na nuvem para maximizar resultados!'
    },
    {
        title: 'Cyber Security',
        image: require('@/assets/images/curso/imgCurso002.jpg'),
        description: 'Adquira conhecimentos essenciais em Cyber Security e proteja sistemas e dados contra ameaças digitais. Prepare-se para enfrentar desafios reais com práticas e técnicas de segurança avançadas.'
    },
    {
        title: 'programming logic',
        image: require('@/assets/images/curso/imgCurso003.png'),
        description: 'Entenda os fundamentos da lógica de programação e desenvolva habilidades para resolver problemas de forma eficiente. Aprenda a criar algoritmos e estruturas de controle essenciais para qualquer linguagem de programação.'
    },
    {
        title: 'IA',
        image: require('@/assets/images/curso/imgCurso004.jpeg'),
        description: 'Explore o universo da Inteligência Artificial e aprenda a desenvolver soluções inteligentes com aprendizado de máquina e algoritmos avançados. Prepare-se para criar sistemas autônomos e inovadores com IA!'
    },
]