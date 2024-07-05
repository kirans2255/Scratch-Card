/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// import { useState } from 'react';
// import { Box, Image, Text, Button } from '@chakra-ui/react';
// import ScratchCard from 'react-scratchcard';
// import ScratchImage from 'https://res-console.cloudinary.com/dewwgy7px/thumbnails/v1/image/upload/v1716198297/amJsZnZhY2txamZva3hxbTRqMWM=/drilldown'

// const ScratchCardComponent = ({ reward }) => {
//   const [scratched, setScratched] = useState(false);

//   const settings = {
//     width: 350,
//     height: 300,
//     image: ScratchImage,  
//     finishPercent: 50,
//     onComplete: () => setScratched(true)
//   };

//   return (
//     <Box
//       w="350px" 
//       h="300px"  
//       p={4}
//       borderWidth={1}
//       borderRadius="lg"
//       boxShadow="lg"
//       bg={scratched ? 'gray.200' : 'green.400'}
//       display="flex"
//       alignItems="center"
//       justifyContent="center"
//       textAlign="center"
//       m={4}
//     >
//       {scratched ? (
//         <>
//           <Image src={reward.image} boxSize="180px" objectFit="fill" />
//           <Text mt={4} fontSize="xl">{reward.description}</Text>
//         </>
//       ) : (
//         <ScratchCard {...settings}>
//           <Button size="lg">
//             Scratch
//           </Button>
//         </ScratchCard>
//       )}
//     </Box>
//   );
// };

// export default ScratchCardComponent;


/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Box, Text, Image } from '@chakra-ui/react';
import { useSwipeable } from 'react-swipeable';

const ScratchCard = ({ reward, onRewardRevealed }) => {
  const [revealed, setRevealed] = useState(false);

  const handleSwipe = () => {
    setRevealed(true);
    onRewardRevealed(reward); 
  };

  const handlers = useSwipeable({
    onSwiped: handleSwipe,
    delta: 10,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <Box
      {...handlers}
      w="300px"
      h="300px"  
      p={4}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
      bg={revealed ? 'gray.300' : 'yellow.200'}
      display="flex"
      flexDirection="column"  
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      m={4}
      cursor={revealed ? 'default' : 'grab'}
      transition="background-color 0.3s ease-in-out"
      _hover={{ bg: revealed ? 'gray.300' : 'yellow.300', cursor: 'pointer' }}
    >
      {revealed ? (
        <Box textAlign="center">
          <Text fontSize="xl" mb={2}>{reward.description}</Text>
          {reward.image && <Image src={reward.image} alt={reward.description} boxSize="150px" />}  
        </Box>
      ) : (
        <Text fontSize="xl">Swipe to reveal</Text>
      )}
    </Box>
  );
};

export default ScratchCard;


