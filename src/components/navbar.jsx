import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

// create navbar with postion sticky
const Navbar = () => {

return (    
    <Flex position="sticky" top="0" zIndex="1" bg="black" color='white' p={4}>
        <Flex flexGrow={1} justifyContent="space-between" alignItems="center">
            <Flex alignItems="center">
                <Link href="/" color="white" fontWeight="bold" fontSize="lg">
                    <Box as="span" color="white" fontWeight="bold" fontSize="lg">
                        Home
                    </Box>
                </Link> 
                <Link href="add-city" color="white" fontWeight="bold" fontSize="lg">
                    <Box as="span" color="white" fontWeight="bold" ml='30px' fontSize="lg">
                        Add City
                    </Box>
                </Link> 
            </Flex>
            
            </Flex>
            </Flex>
)
}


export default Navbar;