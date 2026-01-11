import { Menu, Search } from 'lucide-react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Image } from '@/components/ui/image';
import { Pressable } from '@/components/ui/pressable';

export default function NavBar() {
  return (
    <SafeAreaView 
      edges={['top']} 
      style={{ 
        backgroundColor: '#051C2C', 
        zIndex: 99,
      }}
    >
      <Box 
        className="w-full px-4 py-3"
        style={{ backgroundColor: '#051C2C' }} 
      > 
        <HStack className="items-center justify-between w-full">
          
          <HStack space="md" className="items-center">
            <Pressable onPress={() => console.log('Menu')}>
               <Icon as={Menu} size="xl" className="text-white" />
            </Pressable>
            
            <Image
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' }}
              alt="Logo"
              className="h-8 w-24 object-contain"
            />
          </HStack>

          <HStack space="lg" className="items-center">
            <Pressable onPress={() => console.log('Busca')}>
              <Icon as={Search} size="xl" className="text-white" />
            </Pressable>
          </HStack>

        </HStack>
      </Box>
    </SafeAreaView>
  );
}