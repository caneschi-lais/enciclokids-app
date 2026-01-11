import { Box } from '@/components/ui/box';
import { Divider } from '@/components/ui/divider';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react-native';
import React from 'react';
import { Linking } from 'react-native';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Lista de redes sociais para facilitar a renderização
  const socialLinks = [
    { icon: Instagram, url: 'https://instagram.com', name: 'Instagram' },
    { icon: Facebook, url: 'https://facebook.com', name: 'Facebook' },
    { icon: Linkedin, url: 'https://linkedin.com', name: 'LinkedIn' },
    { icon: Youtube, url: 'https://youtube.com', name: 'YouTube' },
  ];

  const handleLinkPress = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("Erro ao abrir link", err));
  };

  return (
    <Box 
      className="bg-[#051C2C] py-8 px-4 mt-10 w-full"
    >
      <VStack space="xl" className="items-center">
        
        {/* Seção 1: Ícones de Redes Sociais (Atualizado) */}
        <HStack space="2xl" className="justify-center items-center flex-wrap">
          {socialLinks.map((social, index) => (
             <Pressable 
                key={index} 
                onPress={() => handleLinkPress(social.url)}
                // Adiciona um efeito de opacidade ao pressionar/passar o mouse
                className="active:opacity-50 hover:opacity-70"
             >
               {/* Componente Icon do gluestack usando o ícone do lucide */}
               <Icon 
                  as={social.icon} 
                  size="xl" // Tamanho do ícone
                  className="text-white" // Cor branca
               />
             </Pressable>
          ))}
        </HStack>

        <Divider className="bg-slate-600 w-4/5" />

        {/* Seção 2: Links Institucionais */}
        <HStack space="md" className="flex-wrap justify-center">
          <Pressable onPress={() => handleLinkPress('https://google.com')}>
            <Text size="xs" className="text-gray-300 underline">Termos de Uso</Text>
          </Pressable>
          <Text size="xs" className="text-gray-500">|</Text>
          <Pressable onPress={() => handleLinkPress('https://google.com')}>
            <Text size="xs" className="text-gray-300 underline">Privacidade</Text>
          </Pressable>
          <Text size="xs" className="text-gray-500">|</Text>
          <Pressable onPress={() => handleLinkPress('https://google.com')}>
            <Text size="xs" className="text-gray-300 underline">Ajuda</Text>
          </Pressable>
        </HStack>

        {/* Seção 3: Copyright */}
        <VStack className="items-center" space="xs">
          <Text size="xs" className="text-gray-400 text-center">
            © {currentYear} Pokeflix. Todos os direitos reservados.
          </Text>
          <Text size="2xs" className="text-gray-600 text-center">
            Desenvolvido por Laís Caneschi
          </Text>
        </VStack>

      </VStack>
    </Box>
  );
}